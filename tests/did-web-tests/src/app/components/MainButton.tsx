import Button from '@mui/material/Button';
import { FC, ReactNode } from "react";

export const MainButton: FC<{
  title: string;
  leftIcon?: ReactNode;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
}> = ({ title, leftIcon, size = "medium", onClick, disabled = false }) => {
  return (
    <Button
      startIcon={leftIcon}
      size={size}
      variant="contained"
      onClick={() => { !disabled && onClick?.() }}
      disabled={disabled}>
      {title}
    </Button>
  )
}
