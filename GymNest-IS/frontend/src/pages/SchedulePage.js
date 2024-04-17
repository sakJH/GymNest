import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { AuthContext } from '../components/AuthContext';
import WeekNavigator from '../components/./schedule/WeekNavigator';
import ScheduleList from '../components/./schedule/ScheduleList';
import ScheduleDetail from '../components/./schedule/ScheduleDetail';
import { startOfWeek, endOfWeek, addWeeks, format, addMonths } from 'date-fns';

const SchedulePage = () => {
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState('week'); // Přidání stavu pro režim zobrazení
  const { token } = useContext(AuthContext);

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
        return { ...schedule, ...activityDetails };
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
            />
        )}
        {selectedSchedule && (
            <ScheduleDetail
                schedule={selectedSchedule}
                open={true}
                onClose={() => setSelectedSchedule(null)}
            />
        )}
      </Box>
  );
};

export default SchedulePage;