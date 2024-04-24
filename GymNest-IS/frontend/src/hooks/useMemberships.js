import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useMemberships = (userId) => {
    const [memberships, setMemberships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMemberships = useCallback(async () => {
        if (!userId) return;
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3002/api/memberships/user/${userId}`);
            setMemberships(response.data || []);
            setError(null);
        } catch (error) {
            setError('Unable to fetch memberships');
            setMemberships([]);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchMemberships();
    }, [fetchMemberships]);

    return {
        memberships,
        loading,
        error,
        refreshMemberships: fetchMemberships,
    };
};

export default useMemberships;