"use client";
import { FC } from "react";
import { Grid } from "@mui/material";
import Headline from "@components/layout/Headline";
import DiscoverSection from "./component/DiscoverSection";
import EssentialsLogo from "@assets/shared/esentials.svg";
import ElastosLogo from "@assets/shared/elastos.svg";
import TrinityLogo from "@assets/shared/trinitytech.svg";
import KYCLogo from "@assets/shared/kyc.svg";

const DiscoverProps = [
  {
    logo: <EssentialsLogo width="100%" height="100%" />,
    label: "IDENTITY WALLET",
    title: "Essentials",
    description:
      "Essentials is a mobile app designed to manage Web3 identities, including cryptocurrencies. It's a non-custodial platform, which means no data about you is stored by the service. You, as the user, hold the responsibility for safeguarding your cryptographic keys. This offers full ownership but comes with additional responsibility, giving you the choice.",
    actionName: "GET ESSENTIALS",
    handleAction: (): void => {
      window.open("https://d.web3essentials.io", "_blank");
    },
  },
  {
    logo: <ElastosLogo width="100%" height="100%" />,
    label: "WEB3 TECH",
    title: "Elastos",
    description:
      "Elastos forms the essential technology infrastructure underpinning all these identities, offering a secure and versatile foundation for diverse online experiences.",
    actionName: "DISCOVER ELASTOS",
    handleAction: (): void => {
      window.open("https://elastos.org", "_blank");
    },
  },
  {
    logo: <TrinityLogo width="100%" height="100%" />,
    label: "COMPANY",
    title: "Trinity Tech",
    description:
      "Trinity Tech, the company behind this identity application, specializes in crafting innovative Elastos technologies and services. Their expertise is dedicated to enhancing and expanding the capabilities of this platform.",
    actionName: "VISIT WEBSITE",
    handleAction: (): void => {
      window.open("https://trinity-tech.io", "_blank");
    },
  },
  {
    logo: <KYCLogo width="100%" height="100%" />,
    label: "KYC SERVICE",
    title: "KYC-me",
    description:
      "KYC Service for W3C DID and Verifiable Credentials on the Elastos Platform. Users can also utilize prominent KYC providers like Alibaba Cloud and Tencent Cloud to issue credentials.",
    actionName: "VISIT WEBSITE",
    handleAction: (): void => {
      window.open("https://kyc-me.io", "_blank");
    },
  },
];
const DiscoverPage: FC = () => {
  return (
    <div>
      <Headline
        title="Discover"
        description="Explore a diverse ecosystem of apps and companies, each offering unique solutions and services. Discover innovative products, connect with
        creative minds, and find the right resources for your needs."
        showBg={true}
      />
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {DiscoverProps.map((prop, _id) => (
          <Grid item xs={12} sm={6} key={_id}>
            <DiscoverSection {...prop} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default DiscoverPage;
