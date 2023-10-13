import { FC } from "react";
import clsx from "clsx";

const SharedCountLabel: FC<{ count: number; isConform?: boolean }> = ({
  count,
  isConform = false,
}) => {
  return (
    <div
      className={clsx(
        "w-4 h-4 inline-flex justify-center items-center p-2 text-[7pt] rounded-[4px]",
        isConform ? "bg-[#34A853]" : "bg-[#9291A5]"
      )}
    >
      {count}
    </div>
  );
};
export default SharedCountLabel;
