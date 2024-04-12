import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { AuthContext } from '../components/AuthContext';
import WeekNavigator from '../components/schedules/WeekNavigator';
import ScheduleList from '../components/schedules/ScheduleList';
import ScheduleDetail from '../components/schedules/ScheduleDetail';
import { startOfWeek, endOfWeek, format } from 'date-fns';

const SchedulePage = () => {
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchSchedules(currentWeek);
  }, [currentWeek]);

  const fetchSchedules = async (week) => {
    setLoading(true);
    const startDate = format(startOfWeek(week), 'yyyy-MM-dd');
    const endDate = format(endOfWeek(week), 'yyyy-MM-dd');
    try {
      const response = await axios.get(`http://localhost:3003/api/schedules/all`, {
        params: { start: startDate, end: endDate },
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setSchedules(response.data);
      setError('');
    } catch (error) {
      console.error("Error fetching schedules:", error);
      setError('Nepodařilo se načíst data rozvrhu.');
    } finally {
      setLoading(false);
    }
  };

  return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>Rozvrhy</Typography>
        <WeekNavigator onChange={setCurrentWeek} />
        {loading ? (
            <CircularProgress />
        ) : error ? (
            <Alert severity="error">{error}</Alert>
        ) : (
            <ScheduleList
                schedules={schedules}
                onSelect={setSelectedSchedule}
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
