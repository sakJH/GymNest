// ActivityList.js
import React, { useContext } from 'react';
import { List, ListItem, ListItemText, Button, Typography, ListItemButton } from '@mui/material';
import { AuthContext } from '../AuthContext';

const ActivityList = ({ activities, onReserve, onEdit, onDelete }) => {
  const { role } = useContext(AuthContext); // Získání role uživatele

  return (
    <List>
      {activities.map((activity) => (
        <ListItem key={activity.id} divider disablePadding>
          <ListItemButton onClick={() => onReserve(activity.id)}>
            <ListItemText
              primary={activity.name}
              secondary={`${new Date(activity.date).toLocaleDateString()} - ${activity.time}`}
            />
          </ListItemButton>
          {role === 'trenér' && (
            <>
              <Button variant="outlined" onClick={(e) => { e.stopPropagation(); onEdit(activity.id); }}>
                Editovat
              </Button>
              <Button variant="outlined" onClick={(e) => { e.stopPropagation(); onDelete(activity.id); }} color="error">
                Smazat
              </Button>
            </>
          )}
          <Button variant="outlined" onClick={(e) => { e.stopPropagation(); onReserve(activity.id); }}>
            Rezervovat
          </Button>
        </ListItem>
      ))}
      {activities.length === 0 && <Typography variant="subtitle1">Žádné akce nebyly nalezeny.</Typography>}
    </List>
  );
};

export default ActivityList;
