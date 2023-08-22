import { } from "@mui/base";
import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import { FC, ReactNode } from "react";

export const MainButton: FC<{
  leftIcon?: ReactNode;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  children: ReactNode;
  busy?: boolean;
  disabled?: boolean;
}> = ({ leftIcon, size = "medium", onClick, children, busy = false, disabled = false }) => {
  const busyIcon = <CircularProgress size={16} />

  return (
    <Button startIcon={busy ? busyIcon : leftIcon} disabled={busy || disabled} size={size} variant="contained" onClick={onClick}>{children}</Button>
  )
}
