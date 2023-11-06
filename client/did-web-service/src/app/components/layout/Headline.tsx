import { FC, ReactNode } from "react";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

const HeadlineBox = styled("div")((props: { showBg: boolean }) => {
  const { showBg } = props;
  return {
    marginBottom: "1.5rem",
    background: showBg
      ? "url('/headline-banner.png') no-repeat center center / cover"
      : "none",
  };
});
const Headline: FC<{
  title: string;
  description: string | ReactNode;
  showBg?: boolean;
}> = ({ title, description, showBg = false }) => (
  <HeadlineBox
    showBg={showBg}
    className={showBg ? "p-4 sm:p-6 rounded-lg" : ""}
    sx={{ color: "white" }}
  >
    <Typography
      className="w-full pb-3 sm:pb-4 sm:pb-8"
      variant="h3"
      color="inherit"
    >
      {title}
    </Typography>
    <Typography className="mt-4" variant="body1" color="inherit">
      {description}
    </Typography>
  </HeadlineBox>
);
export default Headline;
