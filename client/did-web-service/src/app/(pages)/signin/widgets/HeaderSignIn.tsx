'use client';
import Typography from '@mui/material/Typography';

export const SignInHeader = () => {
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