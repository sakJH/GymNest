import React, { useState, useEffect, useContext } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { AuthContext } from '../AuthContext';
import axios from 'axios';

const ScheduleCreate = ({ schedule, open, handleClose, refreshSchedules }) => {
    const { token } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        activityId: '',
        startTime: '',
        endTime: '',
        capacity: ''
    });
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchActivities();
        if (schedule) {
          setFormData({
              activityId: schedule.activityId || '',
              startTime: formatDateTime(schedule.startTime),
              endTime: formatDateTime(schedule.endTime),
              capacity: schedule.capacity || ''
          });
        } else {
            setFormData({
                activityId: '',
                startTime: '',
                endTime: '',
                capacity: ''
            });
        }
    }, [schedule]);

    const formatDateTime = (isoDate) => {
      if (!isoDate) return '';
      // Vytvoření objektu Date z ISO řetězce
      const date = new Date(isoDate);
      // Získání lokálního času bez posunu
      const localISOTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
      return localISOTime.substring(0, 16); // Oříznout sekundy a milisekundy
    };

    const formatDateTimeForSubmission = (localTime) => {
      if (!localTime) return '';
      const date = new Date(localTime);
      // Přidá časový posun zpět, protože 'localTime' je ve formátu lokálního času
      const utcTime = new Date(date).toISOString();
      return utcTime.substring(0, 16);  // Odstranění sekund a milisekund
    };

    const fetchActivities = async () => {
        try {
            const response = await axios.get(`http://localhost:3003/api/activities/all`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setActivities(response.data);
        } catch (error) {
            console.error("Chyba při načítání aktivit:", error);
            alert('Nepodařilo se načíst aktivity');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
      setLoading(true);
      const data = {
          activityId: formData.activityId,
          startTime: formatDateTimeForSubmission(formData.startTime),
          endTime: formatDateTimeForSubmission(formData.endTime),
          capacity: formData.capacity,
      };
      const url = schedule ? `http://localhost:3003/api/schedules/update` : `http://localhost:3003/api/schedules/create`;
      const method = schedule ? 'put' : 'post';

      try {
          const response = await axios({
              method: method,
              url: url,
              headers: { 'Authorization': `Bearer ${token}` },
              data: schedule ? { scheduleId: schedule.id, updateDetails: data } : data
          });
          if (response.status === 200 || response.status === 201) {
              alert(`Harmonogram byl ${schedule ? 'aktualizován' : 'vytvořen'} úspěšně!`);
              handleClose();
              refreshSchedules();
          }
      } catch (error) {
          alert(`Nepodařilo se ${schedule ? 'aktualizovat' : 'vytvořit'} harmonogram: ${error.message}`);
          console.error(error);
      } finally {
          setLoading(false);
      }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{schedule ? "Editovat termín" : "Vytvořit termín"}</DialogTitle>
            <DialogContent>
                <FormControl fullWidth margin="dense">
                    <InputLabel id="activity-label">Aktivita</InputLabel>
                    <Select
                        labelId="activity-label"
                        name="activityId"
                        value={formData.activityId}
                        label="Aktivita"
                        onChange={handleChange}
                    >
                        {activities.map((activity) => (
                            <MenuItem key={activity.id} value={activity.id}>
                                {activity.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    margin="dense"
                    name="startTime"
                    label="Počáteční čas"
                    type="datetime-local"
                    fullWidth
                    variant="outlined"
                    value={formData.startTime}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    margin="dense"
                    name="endTime"
                    label="Koncový čas"
                    type="datetime-local"
                    fullWidth
                    variant="outlined"
                    value={formData.endTime}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    margin="dense"
                    name="capacity"
                    label="Kapacita"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={formData.capacity}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Zrušit</Button>
                <Button onClick={handleSubmit} color="primary">
                    {loading ? <CircularProgress size={24} /> : (schedule ? 'Aktualizovat' : 'Vytvořit')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ScheduleCreate;