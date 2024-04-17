import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box, MenuItem } from '@mui/material';
import axios from 'axios';

const ActivityCreate = ({ open, onClose, onCreate, onUpdate, activity: initialActivity, isEditMode  }) => {
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

  useEffect(() => {
    if (isEditMode && initialActivity) {
      setActivity(initialActivity);  // Inicializace formuláře hodnotami stávající aktivity
    } else {
      setActivity({ name: '', description: '', type: '', duration: '' });  // Reset pokud se otevře pro novou aktivitu
    }
  }, [initialActivity, isEditMode]);

  const handleSubmit = () => {
    // Přidání logiky pro zpracování nového typu
    const updatedActivity = {
      ...activity,
      type: isAddingNewType && newType ? newType : activity.type
    };

    if (isEditMode) {
      onUpdate(updatedActivity);  // Volání funkce pro aktualizaci
    } else {
      onCreate(updatedActivity);  // Volání funkce pro vytvoření nové aktivity
    }
    onClose();  // Zavření dialogového okna po odeslání formuláře
    resetForm();  // Resetování formuláře
  };

  const resetForm = () => {
    setActivity({ name: '', description: '', type: '', duration: '' });
    setIsAddingNewType(false);
    setNewType('');
  };

  const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === 'type' && value === 'add_new') {
        setIsAddingNewType(true);
      } else if (name === 'type') {
        setActivity({ ...activity, type: value });
      } else if (name === 'newType') {
        setNewType(value);
      } else {
        setActivity({ ...activity, [name]: value });
      }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isEditMode ? 'Upravit aktivitu' : 'Vytvořit novou akci'}</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Název" name="name" value={activity.name} onChange={handleChange} required />
          <TextField label="Popis" name="description" value={activity.description} onChange={handleChange} />
          <TextField
            select
            label="Typ"
            name="type"
            value={isAddingNewType ? 'add_new' : activity.type}
            onChange={handleChange}
            required
          >
            {activityTypes.map((membershipType) => (
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
        <Button onClick={handleSubmit}>{isEditMode ? 'Uložit' : 'Vytvořit'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActivityCreate;
