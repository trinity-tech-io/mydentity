import { FC, useState } from "react";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import CardIcon from "@assets/images/card/card.svg";
import { FAQGroup } from "./faq-types";
import { IconAvatar } from "@components/feature/DetailLine";

const AccordionWrapper = styled("div")(({ theme }) => ({
  ".MuiAccordion-root": {
    "&:first-child": {
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    "&:last-child": {
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
    },
  },
}));
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  // backgroundColor:
  //   theme.palette.mode === "dark"
  //     ? "rgba(255, 255, 255, .05)"
  //     : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
  background: "#9b9b9b2b",
}));

export const FAQ: FC<{
  group: FAQGroup;
}> = ({ group }) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div>
      <div className="inline-flex items-center mb-4">
        <IconAvatar>
          <div className="w-4 h-4 flex justify-center">
            <CardIcon />
          </div>
        </IconAvatar>
        <Typography variant="subtitle1" className="pl-2">
          {group.title}
        </Typography>
      </div>
      <AccordionWrapper>
        {group.items.map((item, i) => (
          <Accordion
            key={i}
            expanded={expanded === item.title}
            onChange={handleChange(item.title)}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography>{item.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>{item.content}</AccordionDetails>
          </Accordion>
        ))}
      </AccordionWrapper>
    </div>
  );
};
