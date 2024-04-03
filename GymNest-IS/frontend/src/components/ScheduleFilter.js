import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

const ScheduleFilter = ({ onChange }) => {
    const [filter, setFilter] = useState('');

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onChange({ eventName: filter });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2 }}>
            <TextField
                label="Hledat akci"
                variant="outlined"
                size="small"
                value={filter}
                onChange={handleFilterChange}
            />
            <Button type="submit" variant="contained">Filtrovat</Button>
        </Box>
    );
};

export default ScheduleFilter;
