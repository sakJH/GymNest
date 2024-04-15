import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box, MenuItem } from '@mui/material';
import axios from 'axios';

const ActivityCreate = ({ open, onClose, onCreate }) => {
  const [activity, setActivity] = useState({
    name: '',
    description: '',
    type: '',
    duration: '',
  });
  const [activityTypes, setActivityTypes] = useState([]);
  const [newType, setNewType] = useState('');
  const [isAddingNewType, setIsAddingNewType] = useState(false);

  useEffect(() => {
    const fetchActivityTypes = async () => {
      try {
        const response = await axios.get('http://localhost:3003/api/activities/all');
        const activities = response.data;
        const uniqueTypes = [...new Set(activities.map(activity => activity.type))];
        setActivityTypes(uniqueTypes);
      } catch (error) {
        console.error("Error fetching activity types:", error);
      }
    };

    fetchActivityTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'type' && value === 'add_new') {
      setIsAddingNewType(true);
      setActivity(prev => ({ ...prev, type: '' }));
    } else {
      setActivity({ ...activity, [name]: value });
      if (name === 'newType') {
        setIsAddingNewType(false);
        setActivity(prev => ({ ...prev, type: value }));
      }
    }
  };

  const handleSubmit = () => {
    if (activity.type === '' && newType !== '') {
      activity.type = newType;
    }
    onCreate(activity);
    onClose();
    setActivity({ name: '', description: '', type: '', duration: '' });
    setNewType('');
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Vytvořit novou akci</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Název" name="name" value={activity.name} onChange={handleChange} required />
          <TextField label="Popis" name="description" value={activity.description} onChange={handleChange} />
          <TextField
            select
            label="Typ"
            name="type"
            value={activity.type}
            onChange={handleChange}
            required
          >
            {activityTypes.map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
            <MenuItem value="add_new">Přidat nový typ...</MenuItem>
          </TextField>
          {isAddingNewType && (
            <TextField label="Nový Typ" name="newType" value={newType} onChange={handleChange} required />
          )}
          <TextField label="Trvání (minuty)" name="duration" type="number" value={activity.duration} onChange={handleChange} required />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Zrušit</Button>
        <Button onClick={handleSubmit}>Vytvořit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActivityCreate;
