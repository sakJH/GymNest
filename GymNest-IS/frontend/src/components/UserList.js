import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/users/', {  }); //change URL to API endpoint
        setUsers(response.data);
      } catch (error) {
        console.error('Chyba při získávání dat o uživatelích:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Seznam Uživatelů</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;