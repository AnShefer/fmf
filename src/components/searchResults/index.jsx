/* eslint-disable no-nested-ternary */
import React from 'react';

import { List, ListItem, ListItemText } from '@mui/material';

import Iconify from '../iconify'; // Adjust the import path as needed

// eslint-disable-next-line react/prop-types
const SearchResults = ({ results = [], setCurrentMedias = () => {} }) => {
  console.log('SearchResults received:', ''); // Debugging line

  return (
    <List sx={{ p: 0 }}>
      {results.map((result) => (
        <ListItem
          onClick={() => setCurrentMedias(result)}
          key={result.id}
          disableGutters
          sx={{ p: 0, cursor: 'pointer' }}
        >
          <ListItemText
            primary={result.title}
            primaryTypographyProps={{
              fontWeight: 300,
              fontSize: '15px',
              pl: '30px',
              color: '#000',
            }}
          />
          {result.type === 'image' ? (
            <Iconify sx={{ color: '#000' }} icon="mdi:image" width={24} />
          ) : result.type === 'video' ? (
            <Iconify sx={{ color: '#000' }} icon="mdi:video" width={24} />
          ) : null}
        </ListItem>
      ))}
    </List>
  );
};

export default SearchResults;
