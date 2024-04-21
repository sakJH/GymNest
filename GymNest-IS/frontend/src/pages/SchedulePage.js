import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { AuthContext } from '../components/AuthContext';
import WeekNavigator from '../components/./schedule/WeekNavigator';
import ScheduleList from '../components/./schedule/ScheduleList';
import ScheduleDetail from '../components/./schedule/ScheduleDetail';
import { startOfWeek, endOfWeek, addWeeks, format, addMonths } from 'date-fns';

const SchedulePage = () => {
  const { user, token } = useContext(AuthContext);
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState('week'); // Přidání stavu pro režim zobrazení

  useEffect(() => {
    fetchSchedules(currentWeek, viewMode);
  }, [currentWeek, viewMode]);

  const fetchSchedules = async (week, mode) => {
    setLoading(true);
    let startDate, endDate;

    if (mode === 'week') {
      startDate = format(startOfWeek(week), 'yyyy-MM-dd');
      endDate = format(endOfWeek(week), 'yyyy-MM-dd');
    } else if (mode === 'twoWeeks') {
      startDate = format(startOfWeek(week), 'yyyy-MM-dd');
      endDate = format(endOfWeek(addWeeks(week, 1)), 'yyyy-MM-dd');
    } else if (mode === 'month') {
      startDate = format(startOfWeek(week), 'yyyy-MM-dd');
      endDate = format(endOfWeek(addMonths(week, 1)), 'yyyy-MM-dd');
    }

    try {
      const [schedulesResponse, activitiesResponse] = await Promise.all([
        axios.get(`http://localhost:3003/api/schedules/all`, {
          params: { start: startDate, end: endDate },
          headers: { 'Authorization': `Bearer ${token}` },
        }),
        axios.get(`http://localhost:3003/api/activities/all`, {
          headers: { 'Authorization': `Bearer ${token}` },
        })
      ]);

      const fetchedSchedules = schedulesResponse.data;
      const fetchedActivities = activitiesResponse.data;

      const combinedData = fetchedSchedules.map(schedule => {
        const activityDetails = fetchedActivities.find(activity => activity.id === schedule.activityId);
        return {
          ...schedule,
          activityId: activityDetails.id,  // přidáme 'activityId' pro jedinečné identifikaci aktivity, pokud je potřeba
          ...activityDetails,
          id: schedule.id  // Explicitně zachovat 'id' z 'schedule', přepíše jakékoli 'id' přidané z 'activityDetails'
        };
      });

      setSchedules(combinedData);
      setError('');
    } catch (error) {
      console.error("Error fetching schedules:", error);
      setError('Nepodařilo se načíst data rozvrhu.');
    } finally {
      setLoading(false);
    }
  };

  const onSelect = (scheduleId) => {
    const selected = schedules.find(schedule => schedule.id === scheduleId);
    setSelectedSchedule(selected);
  };

  const onReserve = async (activityId, scheduleId) => {
    setLoading(true);
    const bookingDetails = {
      userId: user.id,
      activityId: activityId,
      scheduleId: scheduleId,
      status: 'scheduled',
      bookingDate: new Date().toISOString()
    };

    try {
      const response = await axios.post('http://localhost:3003/api/bookings/create', bookingDetails, {
        headers: { 'Authorization': `Bearer ${token}` } // Předpokládáme, že máte token pro autorizaci
      });

      if (response.status === 201) {
        setSchedules((prevSchedules) =>
          prevSchedules.map(schedule =>
            schedule.id === scheduleId ? { ...schedule, isReserved: true } : schedule
          )
        );
        alert('Rezervace byla úspěšně provedena.');
      }
      setError('');
    } catch (error) {
      console.error("Error reserving schedule:", error);
      setError('Nepodařilo se provést rezervaci.');
    } finally {
      setLoading(false);
    }
  };

  return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>Rozvrhy</Typography>
        <WeekNavigator onChange={setCurrentWeek} onViewModeChange={setViewMode} />
        {loading ? (
            <CircularProgress />
        ) : error ? (
            <Alert severity="error">{error}</Alert>
        ) : (
            <ScheduleList
                schedules={schedules}
                onSelect={onSelect}
                onReserve={onReserve}
            />
        )}
        {selectedSchedule && (
            <ScheduleDetail
                schedule={selectedSchedule}
                open={true}
                onClose={() => setSelectedSchedule(null)}
                onReserve={onReserve}
            />
        )}
      </Box>
  );
};

export default SchedulePage;