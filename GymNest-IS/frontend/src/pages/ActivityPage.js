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

  const apiAddress =  'http://localhost:3003/api';

  const fetchActivities = async () => {
    try {
      const response = await axios.get(`${apiAddress}/activities/all`); // TODO až do odvolání přímá komunikace - žádná api-gateway
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
      const response = await axios.get(`${apiAddress}/activities/find/`, { // TODO až do odvolání přímá komunikace - žádná api-gateway
        params: filter                                               //Tady to upravit - localhost:3003/api/activities/find/${activityId}
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
      await axios.post(`${apiAddress}/api/activities/create`, newActivity); // TODO až do odvolání přímá komunikace - žádná api-gateway
      fetchActivities(); // Znovu načíst aktivity po přidání nové
    } catch (error) {
      console.error("Error creating activity:", error);
    }
  };

  const handleEdit = async (activityId, updatedActivity) => {
    try {
      await axios.put(`${apiAddress}/api/activities/update/${activityId}`, updatedActivity); // TODO až do odvolání přímá komunikace - žádná api-gateway
      fetchActivities(); // Znovu načíst aktivity po editaci
    } catch (error) {
      console.error("Error editing activity:", error);
    }
  };

  const handleDelete = async (activityId) => {
    try {
      await axios.delete(`${apiAddress}/api/activities/delete/${activityId}`); // TODO až do odvolání přímá komunikace - žádná api-gateway
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