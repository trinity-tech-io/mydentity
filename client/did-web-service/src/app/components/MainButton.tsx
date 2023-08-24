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
  className?: any;
}> = ({ leftIcon, size = "medium", onClick, children, busy = false, disabled = false, className }) => {
  const busyIcon = <CircularProgress size={16} />

  return (
    <div className={clsx("flex", className)} >
      <Button className="flex-1" startIcon={busy ? busyIcon : leftIcon} disabled={busy || disabled} size={size} variant="contained" onClick={onClick}>{children}</Button>
    </div >
  )
}
