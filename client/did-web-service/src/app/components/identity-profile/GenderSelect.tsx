import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete, { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';

interface GenderSelectProps {
  selectedGender: GenderType | null
  onGenderSelect: (selectedGender: GenderType | null) => void;
}

export default function GenderSelect({ onGenderSelect }: GenderSelectProps): React.ReactElement {  
  const handleGenderChange = (event: React.ChangeEvent<unknown>, newValue: GenderType | null): void => {    
    onGenderSelect(newValue)
  }

  return (
    <Autocomplete
      key="gender-select" 
      id="country-select-demo"
      sx={{ width: 395 }}
      options={gender}
      onChange={handleGenderChange}
      autoHighlight
      getOptionLabel={(option): string => option}
      renderOption={(props, option): React.JSX.Element => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {option}
        </Box>
      )}
      renderInput={(params: AutocompleteRenderInputParams): React.ReactElement => (
        <TextField
          {...params}
          label="Choose a sex"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password" // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

export enum GenderType {
  male = 'male',
  famle = 'famle'
}

const gender: readonly GenderType[] = [
  GenderType.male,
  GenderType.famle
];
