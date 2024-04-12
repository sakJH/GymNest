// ActivityDetail.js
import React, { useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { AuthContext } from '../AuthContext'; // Upravte cestu podle vaší struktury souborů

const ActivityDetail = ({ activity, open, onClose, onEdit, onDelete }) => {
  const { role } = useContext(AuthContext); // Použití role z AuthContext

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{activity.name}</DialogTitle>
      <DialogContent>
        <Typography gutterBottom>Datum: {new Date(activity.date).toLocaleDateString()}</Typography>
        <Typography gutterBottom>Čas: {activity.time}</Typography>
        <Typography gutterBottom>Popis: {activity.description}</Typography>
      </DialogContent>
      <DialogActions>
        {role === 'trenér' && (
          <>
            <Button onClick={() => onEdit(activity.id)}>Editovat</Button>
            <Button onClick={() => onDelete(activity.id)} color="error">Smazat</Button>
          </>
        )}
        <Button onClick={onClose}>Zavřít</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActivityDetail;
