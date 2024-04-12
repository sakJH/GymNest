// DataList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText } from '@mui/material';

/**
 * will change
 * @returns {JSX.Element}
 */
const DataList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3005/api') // TODO - co to má dělat? Proč to má komunikovat s API?
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
