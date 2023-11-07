"use client";

import { FC } from "react";

export const LettersAvatar: FC<{
  text: string;
  width?: number;
  height?: number;
}> = ({ text, width = 40, height = 40 }) => {
  const circleStyle = {
    width: `${width}px`,
    height: `${height}px`,
    borderRadius: "50%",
    color: "white",
    fontSize: "16px",
  };

  return (
    <div
      className="bg-indigo-400 p-2 rounded-sm overflow-hidden text-center"
      style={circleStyle}
    >
      {text}
    </div>
  );
};
