import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Button, Box } from '@mui/material';
import axios from 'axios';

const ActivityFilter = ({ onFilter }) => {
  const [filterOptions, setFilterOptions] = useState({ types: [] });
  const [filter, setFilter] = useState({
    type: '',
    date: '',
  });

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('http://localhost:3003/api/activities/all');
        const activities = response.data;
        const uniqueTypes = [...new Set(activities.map(activity => activity.type))];
        setFilterOptions(prev => ({ ...prev, types: uniqueTypes }));
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onFilter(filter);
  };

  return (
    <Box
      display="flex"
      gap={2}
      alignItems="center"
      sx={{
        marginTop: 2,
        width: '100%',
        maxWidth: 600,
      }}
    >
      <TextField
        select
        label="Typ"
        name="type"
        value={filter.type}
        onChange={handleChange}
        fullWidth
      >
        {filterOptions.types.map((type) => (
          <MenuItem key={type} value={type}>{type}</MenuItem>
        ))}
      </TextField>
      <TextField
        type="date"
        label="Datum"
        name="date"
        value={filter.date}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        fullWidth
      />
      <Button
        variant="outlined"
        onClick={handleSubmit}
        sx={{
          minWidth: 100,
          height: '56px',
        }}
      >
        Filtrovat
      </Button>
    </Box>
  );
};

export default ActivityFilter;