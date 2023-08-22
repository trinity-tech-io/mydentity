"use client";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FC } from "react";

const BindEmailPassword: FC = () => {
  const router = useRouter();

  return (
    <div className="col-span-full">
      <Typography variant="h5" className='w-full text-center font-semibold mt-32 mb-24 leading-9'>
        TODO: prompt for password and generate first shadow key during on boarding process
      </Typography>
    </div>
  )
}

export default BindEmailPassword;