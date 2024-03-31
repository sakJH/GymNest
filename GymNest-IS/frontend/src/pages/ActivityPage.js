import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ActivityList from '../components/ActivityList';
import ActivityFilter from '../components/ActivityFilter';
import ActivityDetail from '../components/ActivityDetail';
import { Paper, Typography } from '@mui/material';

const ActivityPage = () => {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await axios.get('http://localhost:8080/activities');
      setActivities(response.data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  const handleClick = (activityId) => {
    const activity = activities.find(a => a.id === activityId);
    setSelectedActivity(activity);
    setIsDetailOpen(true);
  };

  const handleDetailClose = () => {
    setIsDetailOpen(false);
  };

  const handleFilter = async (filter) => {
    try {
      const response = await axios.get('http://localhost:8080/activities', {
        params: filter
      });
      setActivities(response.data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };


  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>Akce</Typography>
      <ActivityFilter onFilter={handleFilter} />
      <ActivityList activities={activities} onReserve={handleClick} />
      {selectedActivity &&
        <ActivityDetail
          activity={selectedActivity}
          open={isDetailOpen}
          onClose={handleDetailClose}
        />
      }
    </Paper>
  );
};

export default ActivityPage;