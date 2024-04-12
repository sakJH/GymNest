// ActivityCreate.js
import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box } from '@mui/material';

const ActivityCreate = ({ open, onClose, onCreate }) => {
  const [activity, setActivity] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
    maxParticipants: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = () => {
    onCreate(activity);
    onClose();
    setActivity({ name: '', description: '', date: '', time: '', maxParticipants: '' });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Vytvořit novou akci</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Název" name="name" value={activity.name} onChange={handleChange} />
          <TextField label="Popis" name="description" value={activity.description} onChange={handleChange} />
          <TextField label="Datum" name="date" type="date" InputLabelProps={{ shrink: true }} value={activity.date} onChange={handleChange} />
          <TextField label="Čas" name="time" type="time" InputLabelProps={{ shrink: true }} value={activity.time} onChange={handleChange} />
          <TextField label="Max. účastníků" name="maxParticipants" type="number" value={activity.maxParticipants} onChange={handleChange} />
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