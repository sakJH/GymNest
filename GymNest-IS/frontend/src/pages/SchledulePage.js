import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ScheduleList from '../components/ScheduleList';
import ScheduleDetail from '../components/ScheduleDetail';
import ScheduleFilter from '../components/ScheduleFilter';
import { Box, Typography, Button } from '@mui/material';
import { AuthContext } from '../components/AuthContext';

const SchedulePage = () => {
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [filter, setFilter] = useState({});
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchSchedules();
  }, [filter]);

  const apiAddress =  'http://localhost:3005/api';

  const fetchSchedules = async () => {
    try {
      const response = await axios.get(`${apiAddress}/schedules/all`, {
        params: filter,
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setSchedules(response.data);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  const handleClick = (scheduleId) => {
    const schedule = schedules.find(s => s.id === scheduleId);
    setSelectedSchedule(schedule);
    setIsDetailOpen(true);
  };

  const handleDetailClose = () => {
    setIsDetailOpen(false);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>Rozvrhy</Typography>
        <ScheduleFilter onChange={handleFilterChange} />
        <ScheduleList
            schedules={schedules}
            onSelect={handleClick}
        />
        {selectedSchedule && (
            <ScheduleDetail
                schedule={selectedSchedule}
                open={isDetailOpen}
                onClose={handleDetailClose}
            />
        )}
      </Box>
  );
};

export default SchedulePage;
