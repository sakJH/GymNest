import React, { useContext } from 'react';
import { List, ListItem, ListItemText, Button, Typography, ListItemButton } from '@mui/material';
import { AuthContext } from '../AuthContext';

const ActivityList = ({ activities, onClick, onEdit, onDelete }) => {
  const { user } = useContext(AuthContext);

  return (
    <List>
      {activities.map((activity) => (
        <ListItem key={activity.id} divider disablePadding>
          <ListItemButton onClick={() => onClick(activity.id)}>
            <ListItemText
              primary={activity.name}
              secondary={`Type: ${activity.type}, Duration: ${activity.duration} minutes, Created At: ${new Date(activity.createdAt).toLocaleString()}`}
            />
          </ListItemButton>
          {(user && (user.roleId === 3 || user.roleId === 4)) && (
            <>
              <Button variant="outlined" onClick={(e) => { e.stopPropagation(); onEdit(activity.id); }} color="warning">
                Editovat
              </Button>
              <Button variant="outlined" onClick={(e) => { e.stopPropagation(); onDelete(activity.id); }} color="error">
                Smazat
              </Button>
            </>
          )}
        </ListItem>
      ))}
      {activities.length === 0 && <Typography variant="subtitle1">Žádné akce nebyly nalezeny.</Typography>}
    </List>
  );
};

export default ActivityList;