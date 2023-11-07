"use client";
import { ChangeEvent, ChangeEventHandler, FC, useState } from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  FormControl,
  InputAdornment,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Breadcrumbs } from "@components/breadcrumbs/Breadcrumbs";
import { CredentialDetailWidget } from "./components/CredentialDetail";
import { CredentialListWidget } from "./components/CredentialList";
import Headline from "@components/layout/Headline";
import OutlinedInputStyled from "@components/input/OutlinedInputStyled";
import SwitchUI from "@components/switch/Switch";
import SelectBox from "@components/select/SelectBox";
import { activeIdentity$ } from "@services/identity/identity.events";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import AddProfileItem from "../../profile/components/AddProfileItem";
import { ConformBadge } from "@components/credential/SharedCountLabel";

const CredentialsList: FC = () => {
  const theme = useTheme();
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const [openedDetail, setOpenedDetail] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>(""); // State to hold the selected filter
  const [stringFilter, setStringFilter] = useState<string>("");
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const onFilterChange = (value: string): void => {
    setSelectedFilter(value);
  };
  const handleFilterString: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setStringFilter(e.target.value.trim());
  };
  const handleDetailSwitch = (event: ChangeEvent, checked: boolean): void => {
    setOpenedDetail(checked);
  };

  return (
    <>
      <div className="col-span-full">
        {/* <Breadcrumbs entries={["credentials-list"]} /> */}
        <Headline
          title="Credentials"
          description="Here is the comprehensive list of all your credentials, which are pieces of information related to you. These credentials may originate from your actions or other applications acting on your behalf, encompassing both your base identity profile and additional data."
          showBg={true}
        />
      </div>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        marginBottom={2}
      >
        <div className="bg-[#666666]/[.18] flex flex-col flex-1 gap-4 p-4 rounded-md">
          <div className="flex items-center gap-4">
            <ConformBadge className="mx-1" />
            <Typography variant="body2" fontWeight={600} className="flex-1">
              This credential conforms to a format published by its issuer and
              can be easily reused by multiple apps.
            </Typography>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-4 h-4 inline-flex justify-center items-center p-2 text-[7pt] text-white rounded-[4px] bg-[#9291A5]">
              N
            </div>
            <Typography variant="body2" fontWeight={600} className="flex-1">
              Number of shared apps
            </Typography>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex w-full">
            <OutlinedInputStyled
              id="credential-search"
              size="small"
              placeholder="Search"
              className="mr-4 rounded flex-1"
              onChange={handleFilterString}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
            {isMobile ? (
              <FormControl>
                <SelectBox
                  valuePrefix="filter"
                  list={[
                    "All",
                    "Created by me",
                    "Created by others",
                    "Conform",
                    "Not conform",
                  ]}
                  onChange={onFilterChange}
                />
              </FormControl>
            ) : (
              <AddProfileItem identity={activeIdentity} />
            )}
          </div>
          <div className="flex flex-col flex-1 justify-end">
            <div className="inline-flex gap-2">
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body2" className="text-[#C4C4C4]">
                  Show Details
                </Typography>
                <SwitchUI onChange={handleDetailSwitch} />
              </Stack>
              {!isMobile ? (
                <FormControl>
                  <SelectBox
                    valuePrefix="filter"
                    list={[
                      "All",
                      "Created by me",
                      "Created by others",
                      "Conform",
                      "Not conform",
                    ]}
                    onChange={onFilterChange}
                  />
                </FormControl>
              ) : (
                <AddProfileItem identity={activeIdentity} />
              )}
            </div>
          </div>
        </div>
      </Stack>
      <CredentialListWidget
        openedDetail={openedDetail}
        selectedFilter={selectedFilter}
        stringFilter={stringFilter}
        identity={activeIdentity}
      />
      {/* <CredentialDetailWidget /> */}
    </>
  );
};

export default CredentialsList;
