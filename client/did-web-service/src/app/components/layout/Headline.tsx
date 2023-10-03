import { styled } from "@mui/material";
import { FC, ReactNode } from "react";

const HeadlineBox = styled("div")((props: { showBg: boolean }) => {
  const { showBg } = props;
  return {
    marginBottom: "1.5rem",
    background: showBg ? "url('./headline-banner.png') no-repeat center center / cover" : "none",
  };
});
const Headline: FC<{
  title: string;
  description: string | ReactNode;
  showBg?: boolean;
}> = ({ title, description, showBg = false }) => (
  <HeadlineBox showBg={showBg} className={showBg?"p-6 rounded-lg":""}>
    <h3 className="w-full text-4xl font-bold pb-2">{title}</h3>
    <p className="mt-4">{description}</p>
  </HeadlineBox>
);
export default Headline;
