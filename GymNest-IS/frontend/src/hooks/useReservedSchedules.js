import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../components/AuthContext';

export function useReservedSchedules(schedules, setLoading, setError) {
    const { user, token } = useContext(AuthContext);
    const [reservedSchedules, setReservedSchedules] = useState([]);
    const apiAddress = 'http://localhost:3003/api';

    useEffect(() => {
        const fetchReservedSchedules = async () => {
            if (!user) {
                setReservedSchedules([]);
                return;
            }

            setLoading(true);
            try {
                const bookingsResponse = await axios.get(`${apiAddress}/bookings/user/${user.id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const bookings = bookingsResponse.data;

                const activeBookings = bookings.filter(booking => booking.status !== 'cancelled');
                const reservedScheduleIds = activeBookings.map(booking => booking.scheduleId);

                const filteredSchedules = schedules.filter(schedule =>
                    reservedScheduleIds.includes(schedule.id)
                ).map(schedule => {
                    const booking = bookings.find(booking => booking.scheduleId === schedule.id);
                    return {
                        ...schedule,
                        bookingId: booking.id // Add the bookingId to the schedule
                    };
                });

                setReservedSchedules(filteredSchedules);
                setError('');
            } catch (error) {
                console.error("Error fetching reserved schedules:", error);
                setError('Nepodařilo se načíst rezervované rozvrhy.');
            } finally {
                setLoading(false);
            }
        };

        if (schedules.length > 0) {
            fetchReservedSchedules();
        }
    }, [user, schedules, token]);

    return { reservedSchedules };
}