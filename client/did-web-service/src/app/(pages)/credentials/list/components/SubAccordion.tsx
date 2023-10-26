import { FC, memo } from "react";
import { Accordion, AccordionDetails, AccordionSummary, List, ListItem, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ListItemTextStyled from "./ListItemText";

const SubAccordion: FC<{ subfield: { [key: string]: string } }> = memo(
  ({ subfield }) => {
    return (
      <Accordion className="w-full" sx={{ boxShadow: "unset" }} defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            p: 0,
            minHeight: "auto !important",
            ".MuiAccordionSummary-content, .MuiAccordionSummary-content.Mui-expanded":
              { my: 0.5 },
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            SUBFIELD
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List dense sx={{ p: 0, ".MuiListItemText-root": { margin: 0 } }}>
            {Object.keys(subfield).map((key, _id) => (
              <ListItem key={_id}>
                <ListItemTextStyled
                  primary={key.toUpperCase()}
                  secondary={subfield[key]}
                />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    );
  }
);
SubAccordion.displayName = "SubDetailAccordion";

export default SubAccordion;
