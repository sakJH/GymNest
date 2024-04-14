// WeekNavigator.js
import React, { useState } from 'react';
import { Button, Box, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { startOfWeek, endOfWeek, addWeeks, addMonths, format } from 'date-fns';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Tooltip from '@mui/material/Tooltip';

const WeekNavigator = ({ onChange }) => {
    const [currentWeek, setCurrentWeek] = useState(new Date());
    const [viewMode, setViewMode] = useState('week');

    const handlePrev = () => {
        const newDate = viewMode === 'month' ? addMonths(currentWeek, -1) : addWeeks(currentWeek, viewMode === 'twoWeeks' ? -2 : -1);
        setCurrentWeek(newDate);
        onChange(newDate);
    };

    const handleNext = () => {
        const newDate = viewMode === 'month' ? addMonths(currentWeek, 1) : addWeeks(currentWeek, viewMode === 'twoWeeks' ? 2 : 1);
        setCurrentWeek(newDate);
        onChange(newDate);
    };

    const handleChangeViewMode = (event, newViewMode) => {
        if (newViewMode !== null) {
            setViewMode(newViewMode);
        }
    };

    return (
        <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
            <ToggleButtonGroup value={viewMode} exclusive onChange={handleChangeViewMode}>
                <ToggleButton value="week">Týden</ToggleButton>
                <ToggleButton value="twoWeeks">2 Týdny</ToggleButton>
                <ToggleButton value="month">Měsíc</ToggleButton>
            </ToggleButtonGroup>
            <Tooltip title="Předchozí">
                <Button onClick={handlePrev} startIcon={<ArrowBackIosNewIcon />}>
                    Předchozí
                </Button>
            </Tooltip>
            <Typography variant="subtitle1">
                {format(startOfWeek(currentWeek), 'dd.MM.yyyy')} - {format(endOfWeek(currentWeek, {weekStartsOn: viewMode === 'month' ? 0 : viewMode === 'twoWeeks' ? 2 : 1}), 'dd.MM.yyyy')}
            </Typography>
            <Tooltip title="Následující">
                <Button onClick={handleNext} endIcon={<ArrowForwardIosIcon />}>
                    Následující
                </Button>
            </Tooltip>
        </Box>
    );
};

export default WeekNavigator;
