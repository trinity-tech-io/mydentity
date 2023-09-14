import { FC, useEffect, useState } from "react";

export enum SecurityState {
  Unknown,
  Good,
  Average,
  Bad
}

export const SecurityStatus: FC<{
  width?: number;
  height?: number;
  state: SecurityState;
}> = ({ width = 34, height = 34, state }) => {
  const [backgroundColor, setBackgroundColor] = useState<string>(null);

  useEffect(() => {
    switch (state) {
      case SecurityState.Unknown: setBackgroundColor("transparent"); break;
      case SecurityState.Good: setBackgroundColor("green"); break;
      case SecurityState.Average: setBackgroundColor("orange"); break;
      case SecurityState.Bad: setBackgroundColor("red"); break;
    }
  }, [state]);

  return (
    <div className="flex">
      <div className="rounded-full" style={{ width, height, backgroundColor }}></div>
    </div>
  )
}