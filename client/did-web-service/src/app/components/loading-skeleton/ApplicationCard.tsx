import { FC } from "react";
import { Stack } from "@mui/material";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SkelTheme from "./SkelTheme";
import { LandingCard } from "@components/card";

// ----------------------------------------------------------------------

const ApplicationCard: FC = () => {
  return (
    <SkelTheme>
      <LandingCard
        className={"w-full h-auto bg-neutral-950"}
        waveIconVisible={false}
        footer={<h5 className="w-full"><Skeleton count={1} /></h5>}
      >
        <div className="w-full mb-[5%]">
          <h4><Skeleton count={1} height={28} /></h4>
        </div>
      </LandingCard>
    </SkelTheme>
  );
};

export default ApplicationCard;
