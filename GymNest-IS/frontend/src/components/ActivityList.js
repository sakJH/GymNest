import React from 'react';
import { List, ListItem, ListItemText, Button, Typography, ListItemButton } from '@mui/material';

const ActionList = ({ actions, onReserve }) => {
  return (
    <List>
      {actions.map((action) => (
        <ListItem key={action.id} divider disablePadding>
          <ListItemButton onClick={() => onReserve(action.id)}>
            <ListItemText
              primary={action.name}
              secondary={`${new Date(action.date).toLocaleDateString()} - ${action.time}`}
            />
          </ListItemButton>
          <Button variant="outlined" onClick={(e) => { e.stopPropagation(); onReserve(action.id); }}>Rezervovat</Button>
        </ListItem>
      ))}
      {actions.length === 0 && <Typography variant="subtitle1">Žádné akce nebyly nalezeny.</Typography>}
    </List>
  );
};

export default ActionList;