import { FC, ReactNode, useEffect, useState } from "react";
import { Error as ErrorIcon, Info as InfoIcon } from "@mui/icons-material";
import { Icon as ReactIcon } from "@iconify/react";

export enum SecurityState {
  Unknown,
  Good,
  Average,
  Bad,
}

const ColorByState = {
  [SecurityState.Unknown]: "#3A3A3A",
  [SecurityState.Good]: "#34A853",
  [SecurityState.Average]: "#ED6C02",
  [SecurityState.Bad]: "#EA4335",
};

const IconByState = {
  [SecurityState.Unknown]: <ReactIcon icon="fluent-mdl2:unknown-solid" fontSize={24} />,
  [SecurityState.Good]: <ReactIcon icon="carbon:checkmark-filled" fontSize={24} />,
  [SecurityState.Average]: <InfoIcon />,
  [SecurityState.Bad]: <ErrorIcon />,
};

export const SecurityStatus: FC<{
  state: SecurityState;
  advice: string;
}> = ({ state, advice }) => {
  return (
    <div
      className={`flex rounded-lg px-2 py-2 sm:py-4 flex gap-2`}
      style={{background: ColorByState[state]}}
    >
      <span className="text-white">{IconByState[state]}</span>
      <span className="text-white text-[10.5px] sm:text-[12px] leading-[1.4] font-semibold">{advice}</span>
    </div>
  );
};
