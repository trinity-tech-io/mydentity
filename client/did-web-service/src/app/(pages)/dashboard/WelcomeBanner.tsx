import { FC } from "react";
import Headline from "@components/layout/Headline";

export const WelcomeBanner: FC = (_) => {
  return (
    <Headline
      title="Explore your Web3-powered identity experience."
      description="Unlock the full potential of your digital identity by seamlessly integrating it across an extensive array of platforms and services.
      This harmonious synergy simplifies your online engagement, ensuring a comprehensive and interconnected digital experience."
      showBg={true}
    />
  );
};
