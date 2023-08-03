import { FC, MouseEventHandler } from "react";

export const StyledButton: FC<{
  children: React.ReactNode;
  onClick?: MouseEventHandler;
}> = ({ children, onClick }) => {
  return (
    <button
      className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
      onClick={e => onClick?.(e)}>
      {children}
    </button>
  )
}