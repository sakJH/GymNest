// ScheduleFilter.js
import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

const ScheduleFilter = ({ onChange }) => {
    const [filters, setFilters] = useState({
        eventName: '',
        date: '',
        location: ''
    });

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onChange(filters);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField
                name="eventName"
                label="Hledat akci"
                variant="outlined"
                size="small"
                value={filters.eventName}
                onChange={handleFilterChange}
                sx={{ minWidth: '240px' }}
            />
            <TextField
                name="date"
                label="Datum"
                type="date"
                InputLabelProps={{ shrink: true }}
                onChange={handleFilterChange}
                size="small"
                sx={{ minWidth: '180px' }}
            />
            <TextField
                name="location"
                label="Místo"
                variant="outlined"
                size="small"
                value={filters.location}
                onChange={handleFilterChange}
                sx={{ minWidth: '180px' }}
            />
            <Button type="submit" variant="contained">Filtrovat</Button>
        </Box>
    );
};
export default ScheduleFilter;