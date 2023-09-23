"use client";
import Typography from "@mui/material/Typography";
import { FC } from "react";

export const SignInHeader: FC = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="md:w-3/5">
        <Typography variant="h4" className="w-full text-white text-center">
          Hello, we've missed you! Welcome back.
        </Typography>
        <Typography variant="body1" className="text-white text-left pt-6">
          We're thrilled to have you return. To access your account, you have
          the convenience of choosing from a variety of sign-in methods
          available below. Your seamless experience is our priority.
        </Typography>
      </div>
    </div>
  );
};
