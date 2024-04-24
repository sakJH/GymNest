import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress, Alert, Button } from '@mui/material';
import { AuthContext } from '../components/AuthContext';
import WeekNavigator from '../components/./schedule/WeekNavigator';
import ScheduleList from '../components/./schedule/ScheduleList';
import ScheduleDetail from '../components/./schedule/ScheduleDetail';
import ScheduleCreate from '../components/./schedule/ScheduleCreate';
import { useSchedules } from '../hooks/useSchedules';
import { useReservedSchedules } from '../hooks/useReservedSchedules';

const SchedulePage = () => {
  const { user, token } = useContext(AuthContext);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [loading, setLoading] = useState(false);
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

  const { schedules } = useSchedules(currentWeek, viewMode, setLoading, setError);
  const { reservedSchedules } = useReservedSchedules(schedules, setLoading, setError);

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
            refreshAndDetailUpdate() // Znovu načíst data po odstranění
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
      const scheduleDetails = schedules.find(schedule => schedule.id === scheduleId); // Najděte detaily rozvrhu

      if (existingBooking) {
          // Zrušení rezervace, pokud je rozvrh již rezervovaný
          const response = await axios.delete(`${apiAddress}/bookings/cancel/${existingBooking.bookingId}`, {
              headers: { 'Authorization': `Bearer ${token}` }
          });
          if (response.status === 200) {
              alert('Rezervace byla zrušena.');
              refreshAndDetailUpdate();
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
          const bookingResponse = await axios.post(`${apiAddress}/bookings/create`, bookingDetails, {
              headers: { 'Authorization': `Bearer ${token}` }
          });
          if (bookingResponse.status === 201) {
              alert('Rezervace byla úspěšně provedena.');
              refreshAndDetailUpdate();
              const formattedDate = new Date(scheduleDetails.startTime).toLocaleDateString('cs-CZ'); // Přeformátování data
              const formattedTime = new Date(scheduleDetails.startTime).toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' }); // Přeformátování času
              createNotification(`Vaše třída ${scheduleDetails.name} začíná v ${formattedTime}, dne ${formattedDate}.`, 'Nová rezervace');
          }
      }
  } catch (error) {
      console.error("Error handling reservation:", error);
      setError('Nepodařilo se zpracovat požadavek na rezervaci.');
  } finally {
      setLoading(false);
  }
};

const createNotification = async (message, title) => {
  const notificationDetails = {
      userId: user.id,
      title: title,
      message: message,
      status: 'unread' // defaultní status pro nové notifikace
  };
  try {
      await axios.post(`${apiAddress}/notifications/create`, notificationDetails, {
          headers: { 'Authorization': `Bearer ${token}` }
      });
  } catch (error) {
      console.error('Failed to create notification:', error);
  }
};


const refreshAndDetailUpdate = async () => {
  setCurrentWeek(new Date(currentWeek));
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
        {user && (user.roleId === 3 || user.roleId === 4) && (
            <Button variant="contained" color="primary" onClick={() => handleOpenCreateSchedule()}>
                Vytvořit nový termín akce
            </Button>
        )}
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