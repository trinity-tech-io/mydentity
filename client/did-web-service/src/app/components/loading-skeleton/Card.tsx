import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SkelTheme from "./SkelTheme";
import { LandingCard } from "@components/card";

// ----------------------------------------------------------------------

const Card: FC = () => {
  return (
    <SkelTheme>
      <LandingCard
        className={"w-full h-auto bg-neutral-950"}
        topRightSection={
          <h5 className="w-[30%]"><Skeleton count={1} height={24} /></h5>
        }
        footer={<h5 className="w-full"><Skeleton count={1} /></h5>}
      >
        <div className="flex flex-col mb-[5%]">
          <label htmlFor="holder-name" className="text-white text-[10px]">
            IDENTITY NAME
          </label>
          <h4><Skeleton count={1} height={28} /></h4>
        </div>
      </LandingCard>
    </SkelTheme>
  );
};

export default Card;
