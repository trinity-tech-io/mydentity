import React from 'react';
import { Stack } from '@mui/material';
import Image from 'next/image';
import ListItemTextStyled from "./ListItemText";

const TextWithDynamicImage = ({ createdBy, dynamicImage }: { createdBy?: string; dynamicImage?: string }): React.JSX.Element => {
  return (
    <Stack direction="row">
      {dynamicImage && (
        <Image
          src={dynamicImage}
          alt="Avatar"
          width={20}
          height={20}
          style={{ marginRight: '10px' }}
        />
      )}
      <ListItemTextStyled
        primary=""
        secondary={createdBy}
      />
    </Stack>
  );
}

export default TextWithDynamicImage;
