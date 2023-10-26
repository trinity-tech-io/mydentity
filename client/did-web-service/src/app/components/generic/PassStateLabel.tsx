import { FC } from "react";
import clsx from "clsx";
import { Box } from "@mui/material";

const PassStateLabel: FC<{ isPassed: boolean; title: string }> = ({
  isPassed,
  title,
}) => {
  return (
    <Box
      className={clsx(
        "rounded-md text-[8pt] px-3 py-0.5 inline-block text-white whitespace-nowrap",
        isPassed ? "bg-[#34A853]" : "bg-[#EA4335]"
      )}
    >
      {title}
    </Box>
  );
};

export default PassStateLabel;
