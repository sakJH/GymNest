// hooks/useSchedules.js
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { format, startOfWeek, endOfWeek, addWeeks, addMonths } from 'date-fns';
import { AuthContext } from '../components/AuthContext';

export function useSchedules(currentWeek, viewMode, setLoading, setError) {
    const { token } = useContext(AuthContext);
    const [schedules, setSchedules] = useState([]);
    const apiAddress = 'http://localhost:3003/api';

    useEffect(() => {
        const fetchSchedules = async () => {
            setLoading(true);
            let startDate, endDate;
            switch (viewMode) {
                case 'week':
                    startDate = format(startOfWeek(currentWeek), 'yyyy-MM-dd');
                    endDate = format(endOfWeek(currentWeek), 'yyyy-MM-dd');
                    break;
                case 'twoWeeks':
                    startDate = format(startOfWeek(currentWeek), 'yyyy-MM-dd');
                    endDate = format(endOfWeek(addWeeks(currentWeek, 1)), 'yyyy-MM-dd');
                    break;
                case 'month':
                    startDate = format(startOfWeek(currentWeek), 'yyyy-MM-dd');
                    endDate = format(endOfWeek(addMonths(currentWeek, 1)), 'yyyy-MM-dd');
                    break;
                default:
                    startDate = format(startOfWeek(currentWeek), 'yyyy-MM-dd');
                    endDate = format(endOfWeek(currentWeek), 'yyyy-MM-dd');
            }

            try {
                const [schedulesResponse, activitiesResponse] = await Promise.all([
                    axios.get(`${apiAddress}/schedules/all`, {
                        params: { start: startDate, end: endDate },
                        headers: { 'Authorization': `Bearer ${token}` },
                    }),
                    axios.get(`${apiAddress}/activities/all`, {
                        headers: { 'Authorization': `Bearer ${token}` },
                    })
                ]);

                const fetchedSchedules = schedulesResponse.data;
                const fetchedActivities = activitiesResponse.data;

                // Combining schedule and activity details
                const combinedData = fetchedSchedules.map(schedule => {
                    const activityDetails = fetchedActivities.find(activity => activity.id === schedule.activityId);
                    return {
                      ...schedule,
                      activityId: activityDetails.id,  // přidáme 'activityId' pro jedinečné identifikaci aktivity, pokud je potřeba
                      ...activityDetails,
                      id: schedule.id  // Explicitně zachovat 'id' z 'schedule', přepíše jakékoli 'id' přidané z 'activityDetails'
                    };
                });

                setSchedules(combinedData);
                setError('');
            } catch (error) {
                console.error("Error fetching schedules:", error);
                setError('Nepodařilo se načíst data rozvrhu.');
            } finally {
                setLoading(false);
            }
        };

        fetchSchedules();
    }, [currentWeek, viewMode, token]);

    return { schedules };
}