"use client";
import { ChangeEvent, FC, MouseEvent, useState } from "react";
import { useRouter } from "next13-progressbar";
import Link from "next/link";
import { filter } from "lodash";
import {
  NavigateNext as NavigateNextIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import {
  Container,
  InputAdornment,
  MenuItem,
  Popover,
  Stack,
  TableCell,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import ChipIcon from "@assets/images/chip.svg";
import { CopyButton, NormalButton } from "@components/button";
import { IconAvatar } from "@components/feature/DetailLine";
import ComfirmDialog from "@components/generic/ComfirmDialog";
import DetailContainer from "@components/generic/DetailContainer";
import { DetailTable } from "@components/generic/DetailTable";
import EditCredentialDialog, {
  EditionMode,
} from "@components/identity-profile/EditCredentialDialog";
import OutlinedInputStyled from "@components/input/OutlinedInputStyled";
import Headline from "@components/layout/Headline";
import {
  LoadingProfileInfo,
  LoadingTableAvatarRow,
} from "@components/loading-skeleton";
import { UnlockRetrier } from "@components/security/UnlockRetrier";
import { useUnlockPromptState } from "@components/security/unlock-key-prompt/UnlockKeyPrompt";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { useMounted } from "@hooks/useMounted";
import { Credential } from "@model/credential/credential";
import { ProfileCredential } from "@model/credential/profile-credential";
import { useToast } from "@services/feedback.service";
import { findProfileInfoByTypes } from "@services/identity-profile-info/identity-profile-info.service";
import { ProfileCredentialInfo } from "@services/identity-profile-info/profile-credential-info";
import { activeIdentity$ } from "@services/identity/identity.events";
import { logger } from "@services/logger";
import { EditableCredentialAvatar } from "@components/credential/EditableCredentialAvatar";
import { OrderBy } from "./order-by";
import CredentialTableRow from "@components/credential/CredentialTableRow";
import UserListHead from "@components/generic/ListHead";
import AddProfileItem from "./components/AddProfileItem";

const CREDENTIAL_LIST_HEAD = [
  { id: "name", label: "Profile item", alignRight: false },
  { id: "value", label: "Value", alignRight: false },
  { id: "", alignRight: false },
];

type ComparatorMethod = (a: ProfileCredential, b: ProfileCredential) => number;

const Profile: FC = () => {
  const TAG = "ProfilePage";
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const credentialsFeature = activeIdentity?.credentials();
  const identityProfileFeature = activeIdentity?.profile();
  const [name] = useBehaviorSubject(identityProfileFeature?.name$);
  const [credentials] = useBehaviorSubject(
    identityProfileFeature?.profileCredentials$
  ); // All profile credentials of this identity
  const { mounted } = useMounted();
  const router = useRouter();
  const [avatarCredential] = useBehaviorSubject(
    identityProfileFeature?.avatarCredential$
  );
  const { unlockerIsIdle, unlockerIsCancelled } = useUnlockPromptState();

  const [originCredential, setOriginCredential] =
    useState<ProfileCredential>(null);

  const [openEditCredentialDialog, setOpenEditCredentialDialog] =
    useState(false);
  const [preEditCredentialInfo, setPreEditCredentialInfo] =
    useState<ProfileCredentialInfo>(null);
  const [preEditCredentialValue, setPreEditCredentialValue] =
    useState<string>("");
  const [editType, setEditType] = useState(EditionMode.NEW);

  const { showSuccessToast, showErrorToast } = useToast();
  const [isOpenPopupMenu, setOpenPopupMenu] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<"desc" | "asc">("asc");
  const [orderBy, setOrderBy] = useState<OrderBy>(OrderBy.NAME);
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const explorerDIDLink =
    activeIdentity &&
    `https://eid.elastos.io/did?did=${encodeURIComponent(
      activeIdentity.did
    )}&is_did=true`;

  const showFeedbackToast = (
    isSuccess: boolean,
    successMessage: string,
    errorMessage: string
  ): void => {
    if (isSuccess) {
      showSuccessToast(successMessage);
    } else {
      showErrorToast(errorMessage);
    }
  };

  /*  const getCredentialsKeys = (credentials: Credential[]): string[] => {
     return credentials.map(c => (c.verifiableCredential.getId().getFragment()));
   }; */

  const handleEditCredentialDialogClose = async (editCredentialValue: {
    info: ProfileCredentialInfo;
    value: any;
    type: EditionMode;
    originCredential: ProfileCredential;
  }): Promise<void> => {
    setOpenEditCredentialDialog(false);
    if (!editCredentialValue) return;

    if (!editCredentialValue.value) return;

    if (
      editCredentialValue.type == EditionMode.EDIT &&
      editCredentialValue.originCredential
    ) {
      let isSuccess = false;
      try {
        isSuccess = !!(await identityProfileFeature.updateProfileCredential(
          editCredentialValue.originCredential,
          editCredentialValue.value
        ));
      } catch (error) {
        logger.error(TAG, "Update credential error", error);
      }
      showFeedbackToast(
        isSuccess,
        "Entry has been updated!",
        "Failed to update the entry..."
      );
    }

    if (editCredentialValue.type == EditionMode.NEW && !originCredential) {
      let isSuccess = false;
      try {
        // Call the API with auto-retry if user unlock method is required.
        isSuccess = !!(await identityProfileFeature.createProfileCredential(
          "",
          editCredentialValue.info.typesForCreation(),
          editCredentialValue.info.key,
          editCredentialValue.value
        ));
      } catch (error) {
        logger.error(TAG, "Create credential error", error);
      }
      showFeedbackToast(
        isSuccess,
        "Entry has been created!",
        "Failed to create the entry..."
      );
    }
  };

  const handleOpenMenu = (
    event: MouseEvent,
    credential: ProfileCredential
  ): void => {
    setOpenPopupMenu(event.currentTarget);
    setOriginCredential(credential);
  };

  const handleCloseMenu = (): void => {
    setOpenPopupMenu(null);
  };

  const handleRequestSort = (event: MouseEvent, property: OrderBy): void => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleFilterByName = (event: ChangeEvent<HTMLInputElement>): void => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleAvatarFileChanged = async (file: File): Promise<void> => {
    setUploadingAvatar(true);
    await identityProfileFeature.upsertIdentityAvatar(file);
    setUploadingAvatar(false);
  };

  function descendingComparator(
    a: Credential,
    b: Credential,
    orderBy: OrderBy
  ): number {
    switch (orderBy) {
      case "name":
        return b.getDisplayableTitle().localeCompare(a.getDisplayableTitle());
      case "value": {
        const aValue = a.getDisplayValue()?.label
          ? a.getDisplayValue().label
          : a.getDisplayValue();
        const bValue = b.getDisplayValue()?.label
          ? b.getDisplayValue().label
          : b.getDisplayValue();
        return bValue?.localeCompare(aValue);
      }
      default:
    }
  }

  function getComparator(
    order: "desc" | "asc",
    orderBy: any
  ): ComparatorMethod {
    return order === "desc"
      ? (a, b): number => descendingComparator(a, b, orderBy)
      : (a, b): number => -descendingComparator(a, b, orderBy);
  }

  function applySortFilter(
    array: ProfileCredential[],
    comparator: ComparatorMethod,
    query: string
  ): ProfileCredential[] {
    // hide avatar credential
    const filteredArray = array?.filter((credential) => {
      const fragment = credential.getFragment();
      return fragment !== "avatar";
    });
    const stabilizedThis: [ProfileCredential, number][] = filteredArray?.map(
      (el, index) => [el, index]
    );
    stabilizedThis?.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });

    if (query) {
      return filter(
        filteredArray,
        (_credential: ProfileCredential) =>
          _credential.verifiableCredential
            .getId()
            .getFragment()
            .toLowerCase()
            .indexOf(query.toLowerCase()) !== -1
      );
    }

    return stabilizedThis?.map((el) => el[0]);
  }

  const filteredCredentials = applySortFilter(
    credentials,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredCredentials?.length && !!filterName;

  const handleClickDeleteCredential = (): void => {
    handleCloseMenu();
    setOpenConfirmDialog(true);
  };

  const handleClickEditCredential = (): void => {
    handleCloseMenu();
    setOpenEditCredentialDialog(true);
    const entry = findProfileInfoByTypes(
      originCredential.verifiableCredential.getType()
    );
    setPreEditCredentialInfo(entry);
    // TODO: DONT GET THE PROPERTY LIKE THIS: ASK THE PROFILE FEATURE TO RETURN THE VALUE
    setPreEditCredentialValue(
      originCredential.verifiableCredential.getSubject().getProperty(entry.key)
    );
    setEditType(EditionMode.EDIT);
  };

  const handleCloseDialog = async (isAgree: boolean): Promise<void> => {
    setOpenConfirmDialog(false);
    if (!isAgree) return;

    let isSuccess = false;
    try {
      isSuccess = await credentialsFeature.deleteCredential(originCredential);
    } catch (error) {
      logger.error(TAG, error);
    }
    showFeedbackToast(
      isSuccess,
      "Entry has been deleted",
      "Failed to delete the entry..."
    );
  };

  // TODO: MAKE THIS MORE GENERIC - WORKS ONLY FOR STRING VALUES
  /* const getValueFromCredential = (credential: Credential): string => {
    if (!credential || !credential.verifiableCredential || !credential.verifiableCredential.getSubject())
      return '';

    const profileInfoEntry = findProfileInfoByTypes(credential.verifiableCredential.getType());

    if (profileInfoEntry)
      return credential.verifiableCredential.getSubject().getProperty(profileInfoEntry.key);
    else
      return JSON.stringify(credential.verifiableCredential.getSubject());
  } */

  const handleShowAllIdentities = (): void => {
    router.push("/identities");
  };

  return (
    <div className="col-span-full">
      <Headline
        title="My Profile"
        description="Each profile item in the list below represents a distinct credential securely stored within your digital identity. These credentials can be
        shared with apps, subject to your consent. Your unique signature accompanies each credential, assuring its origin and integrity when shared."
        showBg={true}
      />
      {/* <Breadcrumbs entries={["profile"]} /> */}
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        className="mb-4"
      >
        <Stack direction="row">
          <div className="flex flex-1 items-center">
            {!unlockerIsIdle || (mounted && !!activeIdentity) ? (
              <>
                <EditableCredentialAvatar
                  credential={avatarCredential}
                  width={80}
                  height={80}
                  onFileUpload={handleAvatarFileChanged}
                  updating={uploadingAvatar}
                  disabled={!credentials}
                />
                <div className="flex flex-col ml-4">
                  <div className="flex pb-2">
                    <Box className="rounded-md bg-[#9291A5] text-[8pt] px-3 py-0.5 inline-block">
                      ACTIVE IDENTITY
                    </Box>
                  </div>
                  <Typography variant="h4">
                    {name || "Unnamed identity"}
                  </Typography>
                  <div className="inline-flex items-center">
                    <Typography variant="body2">
                      {activeIdentity?.did?.toString()}
                    </Typography>
                    <CopyButton text={activeIdentity?.did?.toString()} />
                  </div>
                </div>
              </>
            ) : (
              <LoadingProfileInfo />
            )}
          </div>
          <div className="ml-4 flex flex-col justify-center items-end gap-1">
            <div className="flex">
              <OutlinedInputStyled
                id="credential-search"
                size="small"
                placeholder="Search"
                className="mr-4 rounded"
                onChange={handleFilterByName}
                // inputProps={{ ref: emailInputRef }}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
              />
              <AddProfileItem identity={activeIdentity} />
            </div>
            <div className="flex flex-1 gap-1 items-end">
              <div className="inline-flex">
                <NormalButton
                  size="small"
                  endIcon={<NavigateNextIcon />}
                  onClick={handleShowAllIdentities}
                >
                  Show all identities
                </NormalButton>
                {!!explorerDIDLink && (
                  <Link target="_blank" href={explorerDIDLink} passHref={true}>
                    <NormalButton size="small" endIcon={<NavigateNextIcon />}>
                      View on blockchain explorer
                    </NormalButton>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Stack>
      </Box>

      <DetailContainer
        title={
          <div className="inline-flex items-center">
            <IconAvatar>
              <div className="w-4 h-4 flex justify-center">
                <ChipIcon />
              </div>
            </IconAvatar>
            <span className="pl-2">Credentials</span>
          </div>
        }
        showAllAction={() => {}}
      >
        <div className="mb-1">
          <DetailTable
            headCells={
              <>
                <TableCell>PROFILE ITEM</TableCell>
                <TableCell align="center">DETAIL</TableCell>
                <TableCell align="center">ISSUED BY</TableCell>
                <TableCell sx={{ width: 0 }}></TableCell>
              </>
            }
            bodyRows={
              mounted && !!filteredCredentials ? (
                <>
                  {!filteredCredentials.length ? (
                    <>
                      <TableRow>
                        <TableCell component="th" colSpan={6} align="center">
                          {isNotFound ? (
                            <Typography variant="body1">
                              No results found for &nbsp;
                              <strong>&quot;{filterName}&quot;</strong>.
                              <br /> Try checking for typos or using complete
                              words.
                            </Typography>
                          ) : (
                            <Typography variant="body1">
                              No credential found
                            </Typography>
                          )}
                        </TableCell>
                      </TableRow>
                    </>
                  ) : (
                    filteredCredentials
                      ?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((credential: ProfileCredential) => (
                        <CredentialTableRow
                          key={credential.id}
                          credential={credential}
                          handleOpenMenu={handleOpenMenu}
                        />
                      ))
                  )}
                </>
              ) : (
                Array(3)
                  .fill(0)
                  .map((_, _i) => (
                    <LoadingTableAvatarRow key={_i} colSpan={4} />
                  ))
              )
            }
          />
        </div>
      </DetailContainer>

      <Container>
        {/* Unlocking credentials failed, cannot display them. Show a retry button to  */}
        {unlockerIsCancelled && (!credentials || !mounted) && (
          <UnlockRetrier className="mt-4" />
        )}
        {/* {credentials && mounted && (
          <Card>
            <TableContainer sx={{ maxWidth: 1200 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={CREDENTIAL_LIST_HEAD}
                  rowCount={credentials ? credentials.length : 0}
                  numSelected={selected ? selected.length : 0}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={(): void => {}}
                />
              </Table>
            </TableContainer>
          </Card>
        )} */}
      </Container>

      <Popover
        open={Boolean(isOpenPopupMenu)}
        anchorEl={isOpenPopupMenu}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={handleClickEditCredential}>Edit</MenuItem>

        <MenuItem
          sx={{ color: "error.main" }}
          onClick={handleClickDeleteCredential}
        >
          Delete
        </MenuItem>
      </Popover>

      <ComfirmDialog
        title="Delete this Credential?"
        content="Do you want to delete this Credential?"
        open={openConfirmDialog}
        onClose={handleCloseDialog}
      />

      <EditCredentialDialog
        credentialInfo={preEditCredentialInfo}
        defaultValue={preEditCredentialValue}
        type={editType}
        open={openEditCredentialDialog}
        originCredential={originCredential}
        onClose={handleEditCredentialDialogClose}
      />
    </div>
  );
};

export default Profile;
