import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const ActionDetail = ({ action, open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{action.name}</DialogTitle>
      <DialogContent>
        <Typography gutterBottom>Datum: {new Date(action.date).toLocaleDateString()}</Typography>
        <Typography gutterBottom>Čas: {action.time}</Typography>
        <Typography gutterBottom>Popis: {action.description}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Zavřít</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActionDetail;