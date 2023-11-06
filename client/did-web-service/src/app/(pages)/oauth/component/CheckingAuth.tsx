import { FC } from "react";
import { PreparingContainer } from "@components/preparing/PreparingContainer";
import { Icon as ReactIcon } from "@iconify/react";

const CheckingAuth: FC = () => {
  return (
    <PreparingContainer
      icon={
        <ReactIcon
          className="main-icon"
          icon="simple-icons:authelia"
          width="90%"
          height="100%"
        />
      }
      preparingText="Checking authentication, Please wait for a moment..."
    />
  );
};

export default CheckingAuth;