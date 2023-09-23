"use client";
import { Divider, styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import clsx from "clsx";
import { FC } from "react";

const DividerStyled = styled(Divider)(({ theme }) => ({
  borderColor: "rgb(250 250 250 / 0.2)",
}));

const SeparateLineText: FC<{ text: string; textClassName?: string }> = ({
  text,
  textClassName = "",
}) => {
  return (
    <div className="relative">
      <Typography
        variant="subtitle1"
        className={clsx("text-base font-bold text-white", textClassName)}
      >
        {text}
      </Typography>
      <DividerStyled className="absolute top-1/2 w-[140px] left-[-160px]" />
      <DividerStyled className="absolute top-1/2 w-[140px] right-[-160px]" />
    </div>
  );
};

export default SeparateLineText;
