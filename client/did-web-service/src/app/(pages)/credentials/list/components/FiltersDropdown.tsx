import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface FiltersDropdownProps {
  onFilterChange: (filter: string) => void;
}

export const FiltersDropdown: React.FC<FiltersDropdownProps> = ({ onFilterChange }) => {
  const [filter, setFilter] = useState<string>('filter0');  // Set the default value to "filter0" for "All"

  const handleChange = (event: SelectChangeEvent<string>): void => {
    const newFilter = event.target.value as string;
    setFilter(newFilter);
    onFilterChange(newFilter);
  };

  return (
    <Select value={filter} onChange={handleChange} style={{ marginRight: 20, width: 'auto', height: 40 }}>
      <MenuItem value="filter0">All</MenuItem>
      <MenuItem value="filter1">created by me</MenuItem>
      <MenuItem value="filter2">created by others</MenuItem>
      <MenuItem value="filter3">conform</MenuItem>
      <MenuItem value="filter4">not conform</MenuItem>
    </Select>
  );
};
