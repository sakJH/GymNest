import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ActionList from '../components/ActivityList';
import ActionFilter from '../components/ActivityFilter';
import ActionDetail from '../components/ActivityDetail';
import { Paper, Typography } from '@mui/material';

const ActionsPage = () => {
  const [actions, setActions] = useState([]);
  const [selectedAction, setSelectedAction] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    fetchActions();
  }, []);

  const fetchActions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/actions');
      setActions(response.data);
    } catch (error) {
      console.error("Error fetching actions:", error);
    }
  };

  const handleActionClick = (actionId) => {
    const action = actions.find(a => a.id === actionId);
    setSelectedAction(action);
    setIsDetailOpen(true);
  };

  const handleDetailClose = () => {
    setIsDetailOpen(false);
  };

  const handleFilter = async (filter) => {
    try {
      const response = await axios.get('http://localhost:8080/actions', {
        params: filter
      });
      setActions(response.data);
    } catch (error) {
      console.error("Error fetching actions:", error);
    }
  };


  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>Akce</Typography>
      <ActionFilter onFilter={handleFilter} />
      <ActionList actions={actions} onReserve={handleActionClick} />
      {selectedAction &&
        <ActionDetail
          action={selectedAction}
          open={isDetailOpen}
          onClose={handleDetailClose}
        />
      }
    </Paper>
  );
};

export default ActionsPage;