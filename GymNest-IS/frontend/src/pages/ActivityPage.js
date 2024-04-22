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
  const { user } = useContext(AuthContext);
  const [activityTypes, setActivityTypes] = useState([]);
  const apiAddress = 'http://localhost:3003/api';

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await axios.get(`${apiAddress}/activities/all`);
      const activities = response.data;
      setActivities(activities);
      const uniqueTypes = [...new Set(activities.map(activity => activity.type))];
      setActivityTypes(uniqueTypes);  // Uložení jedinečných typů pro filtr
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  const refreshActivities = async () => {
    fetchActivities();
    setIsDetailOpen(false);
  };

  const handleClick = activityId => {
    const activity = activities.find(a => a.id === activityId);
    setSelectedActivity(activity);
    setIsDetailOpen(true);
  };

  const handleDetailClose = () => {
    setIsDetailOpen(false);
  };

  const handleCreateFormOpen = () => {
    if (user && (user.roleId === 3 || user.roleId === 4)) { // Only coach and admin can open create form
      setIsCreateFormOpen(true);
    }
  };

  const handleCreateFormClose = () => {
    setIsCreateFormOpen(false);
  };

  const handleCreate = async (newActivity) => {
    if (user && (user.roleId === 3 || user.roleId === 4)) { // Only coach and admin can create activities
      try {
        await axios.post(`${apiAddress}/activities/create`, newActivity);
        refreshActivities();
      } catch (error) {
        console.error("Error creating activity:", error);
      }
    }
  };

  const handleEdit = (activityId) => {
    if (user && (user.roleId === 3 || user.roleId === 4)) { // Only coach and admin can edit activities
      const activity = activities.find(a => a.id === activityId);
      setSelectedActivity(activity);
      setIsCreateFormOpen(true);
    }
  };

  const handleDelete = async (activityId) => {
    if (user && user.roleId === 4) { // Only admin can delete activities
      try {
        await axios.delete(`${apiAddress}/activities/delete/${activityId}`);
        refreshActivities();
        if (selectedActivity && selectedActivity.id === activityId) {
          setIsDetailOpen(false);
        }
      } catch (error) {
        console.error("Error deleting activity:", error);
      }
    }
  };

  const handleFilter = async (filter) => {
    try {
      const { type, date } = filter;
      let url = `${apiAddress}/activities/searchTypeAndDate`;
      const response = await axios.get(url, {
        params: { type, date }
      });
      setActivities(response.data);
    } catch (error) {
      console.error("Error fetching filtered activities:", error);
    }
  };

  const handleUpdate = async (activity) => {
    if (user && (user.roleId === 3 || user.roleId === 4)) { // Ověření oprávnění uživatele
      try {
        const activityId = activity.id; // Získání ID aktivity pro aktualizaci
        const updateDetails = { ...activity }; // Získání detailů pro aktualizaci
        delete updateDetails.id;

        const response = await axios.put(`${apiAddress}/activities/update`, {
          activityId,
          updateDetails
        });

        if (response.status === 200) {
          alert('Aktivita byla úspěšně aktualizována.');
          refreshActivities(); // Znovunačtení seznamu aktivit po aktualizaci
        }
      } catch (error) {
        console.error("Error updating activity:", error);
        alert('Nepodařilo se aktualizovat aktivitu.'); // Zobrazení chyby uživateli
      }
    }
  };

  return (
      <Paper elevation={3} sx={{ padding: 2 }}>
        <UserNotifications />
        <Typography variant="h4" gutterBottom>Akce</Typography>
        {(user && (user.roleId === 3 || user.roleId === 4)) && (
            <Button variant="contained" onClick={handleCreateFormOpen} sx={{ mb: 2 }}>
              Vytvořit novou akci
            </Button>
        )}
        <ActivityFilter onFilter={handleFilter} types={activityTypes} />
        <ActivityList
            activities={activities}
            onClick={handleClick}
            onEdit={user && (user.roleId === 3 || user.roleId === 4) ? handleEdit : null}
            onDelete={user && user.roleId === 4 ? handleDelete : null}
        />
        {selectedActivity && (
            <ActivityDetail
                activity={selectedActivity}
                open={isDetailOpen}
                onClose={handleDetailClose}
                onEdit={user && (user.roleId === 3 || user.roleId === 4) ? handleEdit : null}
                onDelete={user && user.roleId === 4 ? handleDelete : null}
            />
        )}
        {isCreateFormOpen && (
            <ActivityCreate
                open={isCreateFormOpen}
                onClose={handleCreateFormClose}
                onCreate={handleCreate}
                activity={selectedActivity}
                onUpdate={handleUpdate}
                isEditMode={Boolean(selectedActivity)}
                types={activityTypes}
            />
        )}
      </Paper>
  );
};

export default ActivityPage;
