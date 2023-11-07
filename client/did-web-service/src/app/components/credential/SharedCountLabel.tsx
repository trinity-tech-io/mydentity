import { FC } from "react";
import clsx from "clsx";

export const ConformBadge: FC<{ className?: string }> = ({
  className = "",
}) => <div className={clsx("bg-[#34A853] w-[10px] h-[10px] rounded-full", className)} />;

const SharedCountLabel: FC<{ count: number; isConform?: boolean }> = ({
  count,
  isConform = false,
}) => {
  return (
    <div
      className={clsx(
        "w-4 h-4 inline-flex justify-center items-center p-2 text-[7pt] text-white rounded-[4px]",
        isConform ? "bg-[#34A853]" : "bg-[#9291A5]"
      )}
    >
      {count}
    </div>
  );
};
export default SharedCountLabel;
