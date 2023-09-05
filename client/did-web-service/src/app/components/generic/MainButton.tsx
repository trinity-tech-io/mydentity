import { } from "@mui/base";
import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import clsx from "clsx";
import { FC, ReactNode } from "react";

export const MainButton: FC<{
  leftIcon?: ReactNode;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  children: ReactNode;
  busy?: boolean;
  disabled?: boolean;
  mode?: "default" | "danger";
  className?: any;
}> = ({ leftIcon, size = "medium", mode = "default", onClick, children, busy = false, disabled = false, className }) => {
  const busyIcon = <CircularProgress size={16} />
  const color = mode === "default" ? "primary" : "error";

  return (
    <div className={clsx("flex", className)} >
      <Button
        className="flex-1"
        startIcon={busy ? busyIcon : leftIcon}
        disabled={busy || disabled}
        size={size}
        color={color}
        variant="contained"
        onClick={onClick}>
        {children}
      </Button>
    </div >
  )
}
