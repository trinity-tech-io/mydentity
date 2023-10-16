"use client";
import { FC } from "react";
import clsx from "clsx";
import { Divider, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const DividerStyled = styled(Divider)(({ theme }) => ({
  "&:before, &:after": {
    borderTopColor: "#C4C4C4",
  },
}));

const SeparateLineText: FC<{ text: string; textClassName?: string }> = ({
  text,
  textClassName = "",
}) => {
  return (
    <DividerStyled>
      <Typography
        variant="caption"
        className={clsx("px-4 font-bold text-white", textClassName)}
      >
        {text}
      </Typography>
    </DividerStyled>
  );
};

export default SeparateLineText;
