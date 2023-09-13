import Typography from '@mui/material/Typography';
import { FC } from 'react';

export const PasskeyAuth: FC = () => {
  return (
    <div className='flex flex-row gap-4 mt-4 p-4 items-center' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h5" className='w-full text-center font-semibold mt-4 mb-24 leading-9'>
        🔐  Add PassKey<br />
      </Typography>
    </div>
  );
}
