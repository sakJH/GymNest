import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Button, Box } from '@mui/material';
import axios from 'axios';

const ActionFilter = ({ onFilter }) => {
  const [filterOptions, setFilterOptions] = useState({ types: [] });
  const [filter, setFilter] = useState({
    type: '',
    date: '',
  });

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        // TODO endpoint, pro typy akcí??
        const response = await axios.get('http://localhost:3005/api/actions/types');
        setFilterOptions(prev => ({ ...prev, types: response.data }));
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    };

    fetchFilterOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter(prevState => ({
      ...prevState,
      [name]: value,
    }));
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
        {filterOptions.types.map((option) => (
          <MenuItem key={option} value={option}>{option}</MenuItem>
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
        onClick={() => onFilter(filter)}
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

export default ActionFilter;