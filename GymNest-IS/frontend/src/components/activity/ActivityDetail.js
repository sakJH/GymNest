import React, { useContext, useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, List, ListItem, ListItemText, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

/**
 * Renders a dialog component displaying detailed information about an activity.
 *
 * @param {Object} props - The props object containing the activity, open, onClose, onEdit, and onDelete properties.
 * @param {Object} props.activity - The activity object to display details for.
 * @param {boolean} props.open - Whether the dialog is open or not.
 * @param {function} props.onClose - The function to call when the dialog is closed.
 * @param {function} props.onEdit - The function to call when the edit button is clicked.
 * @param {function} props.onDelete - The function to call when the delete button is clicked.
 * @return {JSX.Element} The rendered dialog component.
 */
const ActivityDetail = ({ activity, open, onClose, onEdit, onDelete }) => {
  const { user } = useContext(AuthContext);
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get('http://localhost:3003/api/schedules/all');
        const filteredSchedules = response.data.filter(sch => sch.activityId === activity.id);
        setSchedules(filteredSchedules);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };

    fetchSchedules();
  }, [activity.id]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{activity.name}</DialogTitle>
      <DialogContent>
        <Typography gutterBottom>Typ: {activity.type}</Typography>
        <Typography gutterBottom>Trvání: {activity.duration} minut</Typography>
        <Typography gutterBottom>Vytvořeno: {new Date(activity.createdAt).toLocaleString()}</Typography>
        <Typography gutterBottom>Popis: {activity.description}</Typography>
        <Typography variant="h6" gutterBottom>Naplánované Harmonogramy:</Typography>
        <List>
          {schedules.map((schedule) => (
            <ListItem key={schedule.id}>
              <ListItemText
                primary={`Začíná: ${new Date(schedule.startTime).toLocaleString()}`}
                secondary={`Končí: ${new Date(schedule.endTime).toLocaleString()} - Kapacita: ${schedule.capacity}`}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        {(user && (user.roleId === 3 || user.roleId === 4)) && (
          <>
          <Tooltip title="Editovat">
              <IconButton onClick={(e) => { e.stopPropagation(); onEdit(activity.id); }} color="primary">
                  <EditIcon />
              </IconButton>
          </Tooltip>
          <Tooltip title="Smazat">
              <IconButton onClick={(e) => { e.stopPropagation(); onDelete(activity.id); }} color="error">
                  <DeleteIcon />
              </IconButton>
          </Tooltip>
          </>
        )}
        <Button variant="outlined" onClick={onClose}>Zavřít</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActivityDetail;