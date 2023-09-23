"use client";
import { Divider, styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import clsx from "clsx";
import { FC } from "react";

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
