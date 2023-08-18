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
}> = ({ leftIcon, size = "medium", onClick, children, busy = false }) => {
  const busyIcon = <CircularProgress size={16} />

  return (
    <Button startIcon={busy ? busyIcon : leftIcon} disabled={busy} size={size} variant="contained" onClick={onClick}>{children}</Button>
  )
}
