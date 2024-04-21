import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress, Alert, Button } from '@mui/material';
import { AuthContext } from '../components/AuthContext';
import WeekNavigator from '../components/./schedule/WeekNavigator';
import ScheduleList from '../components/./schedule/ScheduleList';
import ScheduleDetail from '../components/./schedule/ScheduleDetail';
import ScheduleCreate from '../components/./schedule/ScheduleCreate';
import { startOfWeek, endOfWeek, addWeeks, format, addMonths } from 'date-fns';

const SchedulePage = () => {
  const { user, token } = useContext(AuthContext);
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [reservedSchedules, setReservedSchedules] = useState([]);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState('week');
  const [openScheduleCreate, setOpenScheduleCreate] = useState(false);
  const [editableSchedule, setEditableSchedule] = useState(null);

  const apiAddress = 'http://localhost:3003/api';

  const handleOpenCreateSchedule = (schedule = null) => {
    setEditableSchedule(schedule); // null pro nový termín, nebo objekt termínu pro úpravu
    setOpenScheduleCreate(true);
  };

  const handleCloseCreateSchedule = () => {
    setOpenScheduleCreate(false);
    setEditableSchedule(null); // Resetujeme po zavření dialogu
  };

  useEffect(() => {
    fetchSchedules(currentWeek, viewMode);
  }, [currentWeek, viewMode]);

  useEffect(() => {
    if (user && schedules.length > 0) {
        fetchReservedSchedules();
    }
  }, [user, schedules]);

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
        axios.get(`${apiAddress}/schedules/all`, {
          params: { start: startDate, end: endDate },
          headers: { 'Authorization': `Bearer ${token}` },
        }),
        axios.get(`${apiAddress}/activities/all`, {
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

  const fetchReservedSchedules = async () => {
    setLoading(true);
    try {
        // Načtení všech rezervací pro uživatele
        const bookingsResponse = await axios.get(`${apiAddress}/bookings/user/${user.id}`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        const bookings = bookingsResponse.data;

        // Filtrujeme pouze aktivní rezervace, které nejsou zrušené
        const activeBookings = bookings.filter(booking => booking.status !== 'cancelled');
        const reservedScheduleIds = activeBookings.map(booking => booking.scheduleId);

        // Filtrace kombinovaných dat z fetchSchedules pro získání rezervovaných rozvrhů
        const reservedSchedules = schedules.filter(schedule =>
            reservedScheduleIds.includes(schedule.id)
        ).map(schedule => {
            const booking = bookings.find(booking => booking.scheduleId === schedule.id);
            return {
                ...schedule,
                bookingId: booking.id
            };
        });

        setReservedSchedules(reservedSchedules);
        setError('');
    } catch (error) {
        console.error("Error fetching reserved schedules:", error);
        setError('Nepodařilo se načíst rezervované rozvrhy.');
    } finally {
        setLoading(false);
    }
  };

  const onSelect = (scheduleId) => {
    const selected = schedules.find(schedule => schedule.id === scheduleId);
    setSelectedSchedule(selected);
  };

  const onSelectReserved = (scheduleId) => {
    const selected = reservedSchedules.find(schedule => schedule.id === scheduleId);
    setSelectedSchedule(selected);
  };

  const onEdit = async (scheduleId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiAddress}/schedules/find/${scheduleId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.status === 200) {
        const scheduleData = response.data;
        handleOpenCreateSchedule(scheduleData);
      } else {
        setError('Nepodařilo se načíst detaily termínu.');
      }
    } catch (error) {
      console.error("Error fetching schedule details:", error);
      setError('Nepodařilo se načíst detaily termínu.');
    } finally {
      setLoading(false);
    }
  };

const onDelete = async (scheduleId) => {
    setLoading(true);
    try {
        const response = await axios.delete(`${apiAddress}/schedules/cancel/${scheduleId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.status === 200) {
            alert('Harmonogram byl úspěšně zrušen.');
            fetchSchedules(currentWeek, viewMode); // Znovu načíst data po odstranění
        }
    } catch (error) {
        console.error("Error deleting schedule:", error);
        setError('Nepodařilo se zrušit harmonogram.');
    } finally {
        setLoading(false);
    }
};

  const onReserve = async (activityId, scheduleId) => {
    setLoading(true);
    const existingBooking = reservedSchedules.find(schedule => schedule.id === scheduleId);
    try {
        if (existingBooking) {
            // Zrušení rezervace, pokud je rozvrh již rezervovaný
            const response = await axios.delete(`${apiAddress}/bookings/cancel/${existingBooking.bookingId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.status === 200) {
                alert('Rezervace byla zrušena.');
                setReservedSchedules(prev => prev.filter(sch => sch.bookingId !== existingBooking.bookingId));
            }
        } else {
            // Vytvoření nové rezervace
            const bookingDetails = {
                userId: user.id,
                activityId: activityId,
                scheduleId: scheduleId,
                status: 'scheduled',
                bookingDate: new Date().toISOString()
            };
            const response = await axios.post(`${apiAddress}/bookings/create`, bookingDetails, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.status === 201) {
                alert('Rezervace byla úspěšně provedena.');
                fetchReservedSchedules();  // Znovu načtěte seznam rezervovaných rozvrhů
            }
        }
    } catch (error) {
        console.error("Error handling reservation:", error);
        setError('Nepodařilo se zpracovat požadavek na rezervaci.');
    } finally {
        setLoading(false);
    }
};

const refreshAndDetailUpdate = async () => {
  await fetchSchedules(currentWeek, viewMode);
  setSelectedSchedule(null);
};

return (
  <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>Rozvrhy</Typography>
      {user && reservedSchedules.length > 0 && (
          <Box sx={{ padding: 2 }}>
              <Typography variant="h5" gutterBottom>Moje Rezervace</Typography>
              {loading ? (
                  <CircularProgress />
              ) : error ? (
                  <Alert severity="error">{error}</Alert>
              ) : (
                  <ScheduleList
                      schedules={reservedSchedules}
                      onSelect={onSelectReserved}
                      onReserve={onReserve}
                      onDelete={onDelete}
                      onEdit={onEdit}
                  />
              )}
          </Box>
      )}
      <Box sx={{ padding: 2 }}>
        <Typography variant="h5" gutterBottom>Všechny termíny</Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpenCreateSchedule()}>
            Vytvořit nový termín akce
        </Button>
        <WeekNavigator onChange={setCurrentWeek} onViewModeChange={setViewMode} />
        <ScheduleCreate
          open={openScheduleCreate}
          handleClose={handleCloseCreateSchedule}
          schedule={editableSchedule}
          refreshSchedules={refreshAndDetailUpdate}
        />
        {loading ? (
            <CircularProgress />
        ) : error ? (
            <Alert severity="error">{error}</Alert>
        ) : (
            <ScheduleList
                schedules={schedules.filter(schedule =>
                    !reservedSchedules.some(reserved => reserved.id === schedule.id))}
                onSelect={onSelect}
                onReserve={onReserve}
                onDelete={onDelete}
                onEdit={onEdit}
            />
        )}
        {selectedSchedule && (
            <ScheduleDetail
                schedule={selectedSchedule}
                open={true}
                onClose={() => setSelectedSchedule(null)}
                onReserve={onReserve}
                onDelete={onDelete}
                onEdit={onEdit}
            />
        )}
      </Box>
  </Box>
);
};

export default SchedulePage;