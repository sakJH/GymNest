import React, { useState } from 'react';
import { TextField, MenuItem, Button, Box } from '@mui/material';

const ActivityFilter = ({ onFilter, types }) => {
  const [filter, setFilter] = useState({
    type: '',
    date: '',
  });

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
        {types.map((type) => (
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