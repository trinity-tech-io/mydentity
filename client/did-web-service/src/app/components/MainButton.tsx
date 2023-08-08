import Button from '@mui/material/Button';
import { FC, ReactNode } from "react";

export const MainButton: FC<{
  title: string;
  leftIcon?: ReactNode;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}> = ({ title, leftIcon, size = "medium", onClick }) => {
  return (
    <Button startIcon={leftIcon} size={size} variant="contained" onClick={onClick}>{title}</Button>
  )
}
