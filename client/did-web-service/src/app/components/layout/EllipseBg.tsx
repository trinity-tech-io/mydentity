import { styled } from "@mui/material";

const EllipseBg = styled("div")(({ theme }) => ({
    bottom: 0,
    right: 0,
    height: "100%",
    background:
      "linear-gradient(to bottom, rgba(255, 211, 187, 100%), rgba(255, 211, 187, 20%), transparent)",
    borderTopLeftRadius: "100%",
}));

export default EllipseBg