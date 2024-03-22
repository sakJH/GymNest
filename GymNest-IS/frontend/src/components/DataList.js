import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText } from '@mui/material';

function DataList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/data') // FAKE API TEST
      .then(response => {
        setData(response.data);
      })
      .catch(error => console.error("Chyba při načítání dat:", error));
  }, []);

  return (
    <div>
        <h2>test fake api</h2>
        <List>
          {data.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={item.nazev} secondary={item.popis} />
            </ListItem>
          ))}
        </List>
    </div>
  );
}

export default DataList;