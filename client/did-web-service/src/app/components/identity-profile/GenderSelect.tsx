import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete, { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';

export default function GenderSelect(): React.ReactElement  {
  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 395 }}
      options={gender}
      autoHighlight
      getOptionLabel={(option): string => option.label}
      renderOption={(props, option): React.JSX.Element => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {option.label}
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

interface GenderType {
  code: string;
  label: string;
  suggested?: boolean;
}

const gender: readonly GenderType[] = [
  { code: "1", label: "man" },
  { code: "2", label: "famle"}
];
