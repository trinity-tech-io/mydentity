import { FC, ReactNode } from "react";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

const HeadlineBox = styled("div")((props: { showBg: boolean }) => {
  const { showBg } = props;
  return {
    marginBottom: "1.5rem",
    background: showBg ? "url('/headline-banner.png') no-repeat center center / cover" : "none",
  };
});
const Headline: FC<{
  title: string;
  description: string | ReactNode;
  showBg?: boolean;
}> = ({ title, description, showBg = false }) => (
  <HeadlineBox showBg={showBg} className={showBg?"p-6 rounded-lg":""}>
    <Typography className="w-full pb-8" variant="h3" color="text.primary">{title}</Typography>
    <Typography className="mt-4" variant="body1" color="text.primary">{description}</Typography>
  </HeadlineBox>
);
export default Headline;
