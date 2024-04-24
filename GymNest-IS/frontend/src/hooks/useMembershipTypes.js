import { useState, useEffect } from 'react';
import axios from 'axios';

const useMembershipTypes = () => {
    const [membershipTypes, setMembershipTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMembershipTypes = async () => {
            try {
                const response = await axios.get(`http://localhost:3002/api/memberships/types/all`);
                setMembershipTypes(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching membership types:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchMembershipTypes();
    }, []);

    return { membershipTypes, loading, error };
};

export default useMembershipTypes;