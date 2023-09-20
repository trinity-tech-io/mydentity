import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export const FiltersDropdown: React.FC = () => {
  const [filter, setFilter] = useState<string>('');  // Update the state type to string

  const handleChange = (event: SelectChangeEvent<string>): void => {  // Adjust the event type
    setFilter(event.target.value);
  };

  return (
    <Select value={filter} onChange={handleChange} style={{ marginRight: 20, width: 'auto', height: 40 }}>
      <MenuItem value="">All</MenuItem>
      <MenuItem value="filter1">created by me</MenuItem>
      <MenuItem value="filter2">created by others</MenuItem>
      <MenuItem value="filter3">conform</MenuItem>
      <MenuItem value="filter4">not conform</MenuItem>
    </Select>
  );
};