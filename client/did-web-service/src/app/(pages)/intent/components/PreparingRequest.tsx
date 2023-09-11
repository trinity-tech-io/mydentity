import { LinearProgress } from "@mui/material";
import clsx from "clsx";
import { FC } from "react";

export const PreparingRequest: FC<
  {
    className?: string
  }> = ({ className }) => {
    return (
      <div className={clsx("flex flex-col w-full", className)}>
        <div className="italic">Preparing request, hold on...</div>
        <LinearProgress />
      </div>
    )
  }