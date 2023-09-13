/* eslint-disable jsx-a11y/heading-has-content */
import clsx from "clsx";
import { FC } from "react";
import "./LoadingCircle.scss";

export const LoadingCircle: FC<{
  className?: string;
}> = ({ className }) => {
  return (
    <div className={clsx("loading-circle", className)}>
      <div className="content">
        <div className="animated"></div>
      </div>
    </div >
  )
}