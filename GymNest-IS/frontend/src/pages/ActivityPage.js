import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ActivityList from '../components/activity/ActivityList';
import ActivityFilter from '../components/activity/ActivityFilter';
import ActivityDetail from '../components/activity/ActivityDetail';
import ActivityCreate from '../components/activity/ActivityCreate';
import { Paper, Typography, Button } from '@mui/material';
import { AuthContext } from '../components/AuthContext';
import UserNotifications from '../components/user/UserNotifications';

const ActivityPage = () => {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const { role } = useContext(AuthContext);
  const [activityToEdit, setActivityToEdit] = useState(null);

const handleEditOpen = (activityId) => {
  const activity = activities.find(a => a.id === activityId);
  setActivityToEdit(activity);  // Nastavíme aktivitu pro úpravu
  setIsCreateFormOpen(true);
};

const handleUpdate = async (updatedActivity) => {
  try {
    await axios.put(`${apiAddress}/activities/update`, updatedActivity);
    fetchActivities(); // Znovu načíst aktivity po úpravě
    setIsCreateFormOpen(false);
    setActivityToEdit(null);  // Resetovat editační aktivitu
  } catch (error) {
    console.error("Error updating activity:", error);
  }
};

  // Úprava existující metody handleEdit pro volání handleEditOpen
  const handleEdit = (activityId) => {
    handleEditOpen(activityId);
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const apiAddress =  'http://localhost:3003/api';

  const fetchActivities = async () => {
    try {
      const response = await axios.get(`${apiAddress}/activities/all`);
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
      const { type, date } = filter;  // Předpokládáme, že filter obsahuje tyto hodnoty
      let url = `${apiAddress}/activities/searchTypeAndDate`;  // Příklad správné URL
      const response = await axios.get(url, {
        params: { type, date }
      });
      setActivities(response.data);  // Nastavíme stav s nově načtenými aktivitami
    } catch (error) {
      console.error("Error fetching filtered activities:", error);
    }
  };

  const handleCreateFormOpen = () => setIsCreateFormOpen(true);

  const handleCreateFormClose = () => {
    setIsCreateFormOpen(false); // Zavře formulář
    setActivityToEdit(null);    // Resetuje stav aktivity pro úpravu
    setSelectedActivity(null);  // Může být také užitečné resetovat vybranou aktivitu
  };
  const handleCreate = async (newActivity) => {
    try {
      await axios.post(`${apiAddress}/activities/create`, newActivity); // TODO až do odvolání přímá komunikace - žádná api-gateway
      fetchActivities(); // Znovu načíst aktivity po přidání nové
    } catch (error) {
      console.error("Error creating activity:", error);
    }
  };

  const handleDelete = async (activityId) => {
    try {
      await axios.delete(`${apiAddress}/activities/delete/${activityId}`); // TODO až do odvolání přímá komunikace - žádná api-gateway
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
    <UserNotifications />
      <Typography variant="h4" gutterBottom>Akce</Typography>
      {role === 'trenér' && (
        <Button variant="contained" onClick={handleCreateFormOpen} sx={{ mb: 2 }}>
          Vytvořit novou akci
        </Button>
      )}
      <Button variant="contained" onClick={handleCreateFormOpen} sx={{ mb: 2 }}>
          Vytvořit novou akci
      </Button> // TODO - jen  na testing
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
        onUpdate={handleUpdate}
        activity={activityToEdit}
        isEditMode={Boolean(activityToEdit)}
      />
    </Paper>
  );
};

export default ActivityPage;