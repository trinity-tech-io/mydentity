import { FC } from "react";
import clsx from "clsx";
import { Box } from "@mui/material";

export enum StateTextSize {
  SMALL = 7,
  MEDIUM = 8,
  LARGE = 9,
}
const PassStateLabel: FC<{ isPassed: boolean; title: string; size?: StateTextSize; }> = ({
  isPassed,
  title,
  size = StateTextSize.MEDIUM
}) => {
  return (
    <Box
      className={clsx(
        `rounded-md text-[${size}pt] px-3 py-0.5 inline-block text-white max-w-[40%] md:max-w-[50%]`,
        isPassed ? "bg-[#34A853]" : "bg-[#EA4335]"
      )}
    >
      {title}
    </Box>
  );
};

export default PassStateLabel;
