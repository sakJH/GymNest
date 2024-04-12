// WeekNavigator.js
import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { startOfWeek, endOfWeek, addWeeks, format } from 'date-fns';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Tooltip from '@mui/material/Tooltip';

const WeekNavigator = ({ onChange }) => {
    const [currentWeek, setCurrentWeek] = useState(new Date());

    const handlePrevWeek = () => {
        const newWeek = addWeeks(currentWeek, -1);
        setCurrentWeek(newWeek);
        onChange(newWeek);
    };

    const handleNextWeek = () => {
        const newWeek = addWeeks(currentWeek, 1);
        setCurrentWeek(newWeek);
        onChange(newWeek);
    };

    return (
        <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
            <Tooltip title="Předchozí týden">
                <Button onClick={handlePrevWeek} startIcon={<ArrowBackIosNewIcon />}>
                    Předchozí
                </Button>
            </Tooltip>
            <Typography variant="subtitle1">
                {format(startOfWeek(currentWeek), 'dd.MM.yyyy')} - {format(endOfWeek(currentWeek), 'dd.MM.yyyy')}
            </Typography>
            <Tooltip title="Následující týden">
                <Button onClick={handleNextWeek} endIcon={<ArrowForwardIosIcon />}>
                    Následující
                </Button>
            </Tooltip>
        </Box>
    );
};

export default WeekNavigator;
