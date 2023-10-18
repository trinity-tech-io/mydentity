"use client";
import { ChangeEvent, ChangeEventHandler, FC, useState } from "react";
import { Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";
import { FormControl, InputAdornment, Stack, Typography } from "@mui/material";
import { Breadcrumbs } from "@components/breadcrumbs/Breadcrumbs";
import { CredentialDetailWidget } from "./components/CredentialDetail";
import { CredentialListWidget } from "./components/CredentialList";
import Headline from "@components/layout/Headline";
import OutlinedInputStyled from "@components/input/OutlinedInputStyled";
import { DarkButton } from "@components/button";
import SwitchUI from "@components/switch/Switch";
import SelectBox from "@components/select/SelectBox";

const CredentialsList: FC = () => {
  const [openedDetail, setOpenedDetail] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>(""); // State to hold the selected filter
  const [stringFilter, setStringFilter] = useState<string>("");

  const onFilterChange = (value: string) => {
    setSelectedFilter(value);
  };
  const handleFilterString:ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    setStringFilter(e.target.value.trim())
  }
  const handleDetailSwitch = (event: ChangeEvent, checked: boolean) => {
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
      <Stack direction="row" spacing={2} marginBottom={2}>
        <div className="bg-[#666666]/[.18] flex flex-col flex-1 gap-4 p-4 rounded-md">
          <div className="flex items-center gap-2">
            <div className="bg-[#34A853] w-4 h-4 rounded-[4px]" />
            <Typography variant="body2" fontWeight={600} className="flex-1">
              This credential conforms to a format published by its issuer and
              can be easily reused by multiple apps.
            </Typography>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-[#9291A5] w-4 h-4 rounded-[4px]" />
            <Typography variant="body2" fontWeight={600} className="flex-1">
              Non-conform format
            </Typography>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex">
            <OutlinedInputStyled
              id="credential-search"
              size="small"
              placeholder="Search"
              className="mr-4 rounded"
              onChange={handleFilterString}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
            <DarkButton
              className="rounded"
              size="small"
              startIcon={<AddIcon />}
              // disabled={!credentials} // Don't allow edition until credentials are fetched
              // onClick={(): void => {
              //   setOpenCreateCredential(true);
              // }}
            >
              ADD PROFILE ITEM
            </DarkButton>
          </div>
          <div className="flex flex-col flex-1 justify-end">
            <div className="inline-flex gap-2">
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body2" className="text-[#C4C4C4]">
                  Show Details
                </Typography>
                <SwitchUI onChange={handleDetailSwitch} />
              </Stack>
              <FormControl>
                <SelectBox
                  valuePrefix="filter"
                  list={[
                    "All",
                    "created by me",
                    "created by others",
                    "conform",
                    "not conform",
                  ]}
                  onChange={onFilterChange}
                />
              </FormControl>
            </div>
          </div>
        </div>
      </Stack>
      <CredentialListWidget
        openedDetail={openedDetail}
        selectedFilter={selectedFilter}
        stringFilter={stringFilter}
      />
      {/* <CredentialDetailWidget /> */}
    </>
  );
};

export default CredentialsList;
