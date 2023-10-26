"use client";
import { ChangeEvent, FC, useEffect, useState } from "react";
import {
  FormControl,
  Grid,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { Breadcrumbs } from "@components/breadcrumbs/Breadcrumbs";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { activeIdentity$ } from "@services/identity/identity.events";
import Headline from "@components/layout/Headline";
import ApplicationBox from "./components/ApplicationBox";
import OutlinedInputStyled from "@components/input/OutlinedInputStyled";
import SwitchUI from "@components/switch/Switch";
import SelectBox from "@components/select/SelectBox";

const Applications: FC = () => {
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const [interactingApplications] = useBehaviorSubject(
    activeIdentity?.applications().applications$
  );
  const [expandedIDs, setExpandedIDs] = useState<string[]>([]);
  const [openedDetail, setOpenedDetail] = useState(false);

  useEffect(() => {
    if (interactingApplications?.length)
      setExpandedIDs((_) =>
        openedDetail ? interactingApplications.map((app) => app.id) : []
      );
  }, [openedDetail, interactingApplications]);

  const handleDetailSwitch = (event: ChangeEvent, checked: boolean): void => {
    setOpenedDetail(checked);
  };

  return (
    <div className="col-span-full">
      {/* <Breadcrumbs entries={["applications"]} /> */}
      <Headline
        title="Applications"
        description="Applications that interacted with your identity. These applications are instrumental in communicating with the identity framework to provide enriched services and tailored experiences."
        showBg={true}
      />
      <Stack direction="row" className="mb-4">
        <OutlinedInputStyled
          id="credential-search"
          size="small"
          placeholder="Search"
          className="mr-4 rounded"
          // onChange={handleFilterString}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
        <Stack direction="row" spacing={2} sx={{ ml: "auto" }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2" className="text-[#C4C4C4]">
              Show Details
            </Typography>
            <SwitchUI onChange={handleDetailSwitch} />
          </Stack>
          <FormControl>
            <SelectBox
              valuePrefix="filter"
              list={["All"]}
              // onChange={onFilterChange}
            />
          </FormControl>
        </Stack>
      </Stack>

      {interactingApplications?.length == 0 && (
        <Typography variant="h6" align="center" sx={{ pt: 2 }}>
          No application has interacted with this identity yet.
        </Typography>
      )}

      {interactingApplications?.length > 0 && (
        <Grid container spacing={2}>
          {interactingApplications?.map((app, _id) => (
            <Grid item xs={12} sm={6} key={_id}>
              <ApplicationBox
                application={app}
                id={app.id}
                expanded={expandedIDs.includes(app.id)}
                setExpanded={setExpandedIDs}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Applications;
