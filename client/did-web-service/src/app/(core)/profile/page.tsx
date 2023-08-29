'use client'
import ComfirmDialog from "@components/generic/ComfirmDialog";
import ListHead from "@components/generic/ListHead";
import ListToolbar from "@components/generic/ListToolbar";
import CreateCredentialDialog from "@components/identity-profile/CreateCredentialDialog";
import EditCredentialDialog, { EDIT_TYPE } from "@components/identity-profile/EditCredentialDialog";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { useMounted } from "@hooks/useMounted";
import { Credential } from "@model/credential/credential";
import { ProfileCredentialInfo } from "@model/identity/features/profile/profile-credential-info";
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Card, Container, IconButton, MenuItem, Popover, Stack, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Typography } from "@mui/material";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { useToast } from "@services/feedback.service";
import { activeIdentity$ } from "@services/identity/identity.events";
import { logger } from "@services/logger";
import { filter } from 'lodash';
import Link from "next/link";
import { FC, forwardRef, useEffect, useState } from "react";

const CREDENTIAL_LIST_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'value', label: 'Value', alignRight: false },
  { id: '', alignRight: false },
]

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Profile: FC = () => {
  const TAG = "ProfilePage";
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const identityProfileFeature = activeIdentity?.get("profile");
  const [credentials] = useBehaviorSubject(activeIdentity?.get("credentials").credentials$); // All credentials of this identity
  const { mounted } = useMounted();

  const [originCredential, setOriginCredential] = useState<Credential>(null);
  const [availableItemsForAddition, setAvailableItemsForAddition] = useState<ProfileCredentialInfo[]>([]);
  const [openCreateCredential, setOpenCreateCredential] = useState(false);

  const [openEditCredentialDialog, setOpenEditCredentialDialog] = useState(false);
  const [preEditCredentialInfo, setPreEditCredentialInfo] = useState<ProfileCredentialInfo>(null);
  const [preEditCredentialValue, setPreEditCredentialValue] = useState<string>('');
  const [editType, setEditType] = useState(EDIT_TYPE.NEW);

  const { showSuccessToast, showErrorToast } = useToast();
  const [isOpenPopupMenu, setOpenPopupMenu] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const availableProfileEntries = identityProfileFeature?.getAvailableProfileEntries(); // List of addable profile items (that can produce credentials)

  const explorerDIDLink = activeIdentity && `https://eid.elastos.io/did?did=${encodeURIComponent(activeIdentity.did)}&is_did=true`;

  useEffect(() => {
    computeAvailableItems();
  }, [credentials]);

  /**
   * Computes the list of available items a user can add to his profile.
   * This list is based on the global list of available profile items, minus the profile items that are
   * already added and that can't be added more than once.
   */
  const computeAvailableItems = () => {
    const availableEntries = availableProfileEntries?.filter((entry) => {
      // Condition to keep the entry available for addition?
      // - Be of kind "multipleInstancesAllowed"
      // - Or not be used by user's credentials yet
      return entry.options.multipleInstancesAllowed || !credentials.find(c => c.verifiableCredential.type.includes(entry.shortType));
    });

    setAvailableItemsForAddition(availableEntries);
  }

  const showFeedbackToast = (isSuccess: boolean, successMessage: string, errorMessage: string) => {
    if (isSuccess) {
      showSuccessToast(successMessage);
    } else {
      showErrorToast(errorMessage);
    }
  }

  /*  const getCredentialsKeys = (credentials: Credential[]): string[] => {
     return credentials.map(c => (c.verifiableCredential.getId().getFragment()));
   }; */

  const handleCreateCredentialDialogClose = (selectedItem: ProfileCredentialInfo) => {
    setOpenCreateCredential(false);
    console.log("selected item", selectedItem);
    if (selectedItem) {
      setOpenEditCredentialDialog(true);
      setPreEditCredentialInfo(selectedItem);
      setPreEditCredentialValue('');
      setEditType(EDIT_TYPE.NEW);
      setOriginCredential(null);
    }
  };

  const handleEditCredentialDialogClose = async (editCredentialValue: { info: ProfileCredentialInfo, value: string, type: EDIT_TYPE, originCredential: Credential }) => {
    setOpenEditCredentialDialog(false);
    if (!editCredentialValue)
      return;

    if (!editCredentialValue.value)
      return;

    if (editCredentialValue.type == EDIT_TYPE.EDIT && editCredentialValue.originCredential) {
      let isSuccess = false;
      try {
        isSuccess = await identityProfileFeature.updateCredential(editCredentialValue.originCredential, editCredentialValue.value).catch()
      } catch (error) {
        logger.error(TAG, 'Update credential error', error);
      }
      showFeedbackToast(isSuccess, 'Entry has been updated!', 'Failed to update the entry...');
    }

    if (editCredentialValue.type == EDIT_TYPE.NEW && !originCredential) {
      let isSuccess = false;
      try {
        isSuccess = await identityProfileFeature.createCredential('', [editCredentialValue.info.shortType], editCredentialValue.info.key, editCredentialValue.value);
      } catch (error) {
        logger.error(TAG, 'Create credential error', error);
      }
      showFeedbackToast(isSuccess, 'Entry has been created!', 'Failed to create the entry...');
    }
  }

  const handleOpenMenu = (event, credential: Credential) => {
    setOpenPopupMenu(event.currentTarget);
    setOriginCredential(credential);
  };

  const handleCloseMenu = () => {
    setOpenPopupMenu(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function applySortFilter(array, comparator, query) {
    const stabilizedThis = array?.map((el, index) => [el, index]);
    stabilizedThis?.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      return filter(array, (_credential: Credential) => _credential.verifiableCredential.getId().getFragment().toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis?.map((el) => el[0]);
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - credentials?.length) : 0;

  const filteredUsers = applySortFilter(credentials, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers?.length && !!filterName;

  const handleClickDeleteCredential = () => {
    handleCloseMenu();
    setOpenConfirmDialog(true)
  }

  const handleClickEditCredential = () => {
    handleCloseMenu();
    setOpenEditCredentialDialog(true);
    const entry = identityProfileFeature.findProfileInfoByTypes(originCredential.verifiableCredential.getType());
    setPreEditCredentialInfo(entry);
    // TODO: DONT GET THE PROPERTY LIKE THIS: ASK THE PROFILE FEATURE TO RETURN THE VALUE
    setPreEditCredentialValue(originCredential.verifiableCredential.getSubject().getProperty(entry.key));
    setEditType(EDIT_TYPE.EDIT);
  }

  const handleCloseDialog = async (isAgree: boolean) => {
    setOpenConfirmDialog(false);
    if (!isAgree)
      return;

    let isSuccess = false;
    try {
      isSuccess = await identityProfileFeature.deleteCredential(originCredential.verifiableCredential.getId().toString());
    } catch (error) {
      logger.error(TAG, error);
    }
    showFeedbackToast(isSuccess, 'Entry has been deleted', 'Failed to delete the entry...');
  };

  // TODO: MAKE THIS MORE GENERIC - WORKS ONLY FOR STRING VALUES
  const getValueFromCredential = (credential: Credential): string => {
    if (!credential || !credential.verifiableCredential || !credential.verifiableCredential.getSubject())
      return '';

    const profileInfoEntry = identityProfileFeature.findProfileInfoByTypes(credential.verifiableCredential.getType());

    if (profileInfoEntry)
      return credential.verifiableCredential.getSubject().getProperty(profileInfoEntry.key);
    else
      return JSON.stringify(credential.verifiableCredential.getSubject());
  }

  return (<div className="col-span-full">
    <Box
      mt={2}
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
        <Avatar src="/assets/images/account.svg" sx={{ ml: 2, width: 120, height: 120 }} />
      </Stack>
    </Box>

    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" >
        <Typography variant="h4" gutterBottom>
          About me
        </Typography>
        <Button variant="contained"
          startIcon={<AddIcon />}
          onClick={() => { setOpenCreateCredential(true) }}
        >
          New profile item
        </Button>
      </Stack>

      <Typography gutterBottom>
        <i>Good to know</i>: every item in the list below is stored in your identity as an individual <b>credential</b>. Credentials can later be shared to apps that request them, with your consent. Credentials are always signed with your own signature so no matter where they are shared, one can always make sure that <b>the information inside was created by you, and not modified</b>.
      </Typography>

      {mounted &&
        <Card>
          <ListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
          <TableContainer sx={{ maxWidth: 1200 }}>
            <Table>
              <ListHead
                order={order}
                orderBy={orderBy}
                headLabel={CREDENTIAL_LIST_HEAD}
                rowCount={credentials ? credentials.length : 0}
                numSelected={selected ? selected.length : 0}
                onRequestSort={handleRequestSort}
                onSelectAllClick={() => { }}
              />
              <TableBody>
                {filteredUsers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((credential: Credential) => {
                  // const { id, name, value} = row;
                  const id = credential.id;
                  const value = getValueFromCredential(credential);

                  return (
                    <TableRow hover key={id} tabIndex={-1} >
                      <TableCell component="th" scope="row" padding="none">
                        <Stack ml={1} direction="row" alignItems="center" spacing={2}>
                          <Avatar src={"/assets/images/account.svg"} />
                          <Typography variant="subtitle2" noWrap>
                            {credential.tittle}
                          </Typography>
                        </Stack>
                      </TableCell>

                      <TableCell align="left">{value}</TableCell>

                      <TableCell align="right">
                        <IconButton size="large" color="inherit" onClick={(event) => { handleOpenMenu(event, credential) }}>
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>

              {isNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <div className="text-center">
                        <Typography variant="h6" paragraph>
                          Not found
                        </Typography>

                        <Typography variant="body2">
                          No results found for &nbsp;
                          <strong>&quot;{filterName}&quot;</strong>.
                          <br /> Try checking for typos or using complete words.
                        </Typography>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={credentials ? credentials.length : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      }

      <div className="mt-4">
        <Typography variant="h4" gutterBottom>
          Advanced
        </Typography>
      </div>

      {explorerDIDLink && <Link target="_blank" href={explorerDIDLink}>View identity's DID on blockchain explorer</Link>}
    </Container>

    <Popover
      open={Boolean(isOpenPopupMenu)}
      anchorEl={isOpenPopupMenu}
      onClose={handleCloseMenu}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
        sx: {
          p: 1,
          width: 140,
          '& .MuiMenuItem-root': {
            px: 1,
            typography: 'body2',
            borderRadius: 0.75,
          },
        },
      }}
    >
      <MenuItem onClick={handleClickEditCredential}>
        Edit
      </MenuItem>

      <MenuItem sx={{ color: 'error.main' }} onClick={handleClickDeleteCredential}>
        Delete
      </MenuItem>
    </Popover>

    <ComfirmDialog
      title='Delete this Credential?'
      content='Do you want to delete this Credential?'
      open={openConfirmDialog}
      onClose={(isAgree: boolean) => handleCloseDialog(isAgree)}
    />

    <CreateCredentialDialog
      open={openCreateCredential}
      onClose={handleCreateCredentialDialogClose}
      availableItemsForAddition={availableItemsForAddition}
    />

    <EditCredentialDialog
      credentialInfo={preEditCredentialInfo}
      defaultValue={preEditCredentialValue}
      type={editType}
      open={openEditCredentialDialog}
      originCredential={originCredential}
      onClose={handleEditCredentialDialogClose}
    />
  </div>)
}

export default Profile;