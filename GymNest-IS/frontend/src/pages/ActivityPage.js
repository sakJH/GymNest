import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ActivityList from '../components/ActivityList';
import ActivityFilter from '../components/ActivityFilter';
import ActivityDetail from '../components/ActivityDetail';
import ActivityCreate from '../components/ActivityCreate';
import { Paper, Typography, Button } from '@mui/material';
import { AuthContext } from '../components/AuthContext';

const ActivityPage = () => {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const { role } = useContext(AuthContext);

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

  const handleCreateFormOpen = () => setIsCreateFormOpen(true);
  const handleCreateFormClose = () => setIsCreateFormOpen(false);

  const handleCreate = async (newActivity) => {
    try {
      await axios.post('http://localhost:8080/activities', newActivity);
      fetchActivities(); // Znovu načíst aktivity po přidání nové
    } catch (error) {
      console.error("Error creating activity:", error);
    }
  };

  const handleEdit = async (activityId, updatedActivity) => {
    try {
      await axios.put(`http://localhost:8080/activities/${activityId}`, updatedActivity);
      fetchActivities(); // Znovu načíst aktivity po editaci
    } catch (error) {
      console.error("Error editing activity:", error);
    }
  };

  const handleDelete = async (activityId) => {
    try {
      await axios.delete(`http://localhost:8080/activities/${activityId}`);
      fetchActivities(); // Znovu načíst aktivity po smazání
      if (selectedActivity && selectedActivity.id === activityId) {
        setIsDetailOpen(false); // Zavřít detail, pokud byla smazaná aktuálně zobrazená akce
      }
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };


  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>Akce</Typography>
      {role === 'trenér' && (
        <Button variant="contained" onClick={handleCreateFormOpen} sx={{ mb: 2 }}>
          Vytvořit novou akci
        </Button>
      )}
      <ActivityFilter onFilter={handleFilter} />
      <ActivityList
        activities={activities}
        onReserve={handleClick}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {selectedActivity && (
        <ActivityDetail
          activity={selectedActivity}
          open={isDetailOpen}
          onClose={handleDetailClose}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
      <ActivityCreate
        open={isCreateFormOpen}
        onClose={handleCreateFormClose}
        onCreate={handleCreate}
      />
    </Paper>
  );
};

export default ActivityPage;