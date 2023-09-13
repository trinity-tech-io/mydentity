'use client';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

export const SignInHeader: FC = () => {
  return (
    <div>
      <Typography variant="h4" className='w-full text-center font-semibold mt-4 mb-24 leading-9'>
        Welcome back 👋
      </Typography>
      <Typography>
        Choose how to sign in below
      </Typography>
    </div>
  );
}