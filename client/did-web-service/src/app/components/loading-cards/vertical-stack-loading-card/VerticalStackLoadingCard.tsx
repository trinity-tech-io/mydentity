/* eslint-disable jsx-a11y/heading-has-content */
import clsx from "clsx";
import { FC } from "react";
import "./VerticalStackLoadingCard.scss";

export const VerticalStackLoadingCard: FC<{
  className?: string;
}> = ({ className }) => {
  return (
    <div className={clsx("vertical-stack-loading-card", className)}>
      <div className="content">
        <p></p>
        <h2></h2>
        <h2></h2>
      </div>
    </div >
  )
}