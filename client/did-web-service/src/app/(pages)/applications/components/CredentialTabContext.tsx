import { FC, useState } from "react";
import { TabContext, TabPanel } from "@mui/lab";
import { styled } from "@mui/material/styles";
import { Grid, Tab, Tabs } from "@mui/material";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { IdentityInteractingApplication } from "@model/identity-interacting-application/identity-interacting-application";
import CredentialBox from "./CredentialBox";

const StyledTabs = styled(Tabs)({
  background: "#a0a0a040",
  minHeight: "unset",
  borderRadius: ".25rem",
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    paddingLeft: 16,
    paddingRight: 16,
  },
  "& .MuiTabs-indicatorSpan": {
    width: "100%",
    backgroundColor: "#9D3E3E",
  },
});

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  minHeight: "unset",
  paddingTop: 8,
  paddingBottom: 8,
  color:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.7)"
      : "rgba(32, 32, 32, 0.7)",
  "&.Mui-selected": {
    color: theme.palette.text.primary,
  },
  "&.Mui-focusVisible": {
    backgroundColor: "rgba(100, 95, 228, 0.32)",
  },
}));

const StyledTabPanel = styled(TabPanel)(({ theme }) => ({
  paddingTop: 16,
  paddingBottom: 0,
}));

const CredentialTabContext: FC<{
  application: IdentityInteractingApplication;
}> = ({ application }) => {
  const [tabValue, setTabValue] = useState("1");
  const [requestedCredentials] = useBehaviorSubject(
    application?.requestedCredentials$
  );
  const [importedCredentials] = useBehaviorSubject(
    application?.importedCredentials$
  );

  const handleChange = (_: React.SyntheticEvent, newValue: string): void => {
    setTabValue(newValue);
  };

  return (
    <TabContext value={tabValue}>
      <StyledTabs
        value={tabValue}
        onChange={handleChange}
        TabIndicatorProps={{
          children: <span className="MuiTabs-indicatorSpan" />,
        }}
        variant="fullWidth"
        centered
      >
        <StyledTab
          value="1"
          label={`${requestedCredentials?.length || 0} credential(s) shared to`}
        />
        <StyledTab
          value="2"
          label={`${
            importedCredentials?.length || 0
          } credential(s) received from`}
        />
      </StyledTabs>
      <StyledTabPanel value="1">
        <Grid container spacing={2}>
          {requestedCredentials?.map((rc) => (
            <Grid item xs={6} key={rc.id}>
              <CredentialBox credential={rc.credential} />
            </Grid>
          ))}
        </Grid>
      </StyledTabPanel>
      <StyledTabPanel value="2">
        <Grid container spacing={2}>
          {importedCredentials?.map((cr) => (
            <Grid item xs={6} key={cr.id}>
              <CredentialBox credential={cr} />
            </Grid>
          ))}
        </Grid>
      </StyledTabPanel>
    </TabContext>
  );
};

export default CredentialTabContext;
