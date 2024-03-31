import React from 'react';
import { List, ListItem, ListItemText, Button, Typography, ListItemButton } from '@mui/material';

const ActivityList = ({ activities, onReserve }) => {
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
          <Button variant="outlined" onClick={(e) => { e.stopPropagation(); onReserve(activity.id); }}>Rezervovat</Button>
        </ListItem>
      ))}
      {activities.length === 0 && <Typography variant="subtitle1">Žádné akce nebyly nalezeny.</Typography>}
    </List>
  );
};

export default ActivityList;