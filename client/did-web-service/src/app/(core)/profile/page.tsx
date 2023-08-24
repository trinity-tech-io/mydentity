'use client'
import ComfirmDialog from "@components/ComfirmDialog";
import CreateCredentialDialog from "@components/CreateCredentialDialog";
import EditCredentialDialog, { EDIT_TYPE } from "@components/EditCredentialDialog";
import ListHead from "@components/ListHead";
import ListToolbar from "@components/ListToolbar";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { useMounted } from "@hooks/useMounted";
import { BasicCredentialEntry } from "@model/credential/basiccredentialentry";
import { Credential } from "@model/credential/credential";
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Card, Container, IconButton, MenuItem, Popover, Stack, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Typography } from "@mui/material";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { useToast } from "@services/feedback.service";
import { BasicCredentialsService } from "@services/identity/basiccredentials.service";
import { activeIdentity$ } from "@services/identity/identity.events";
import { logger } from "@services/logger";
import { filter } from 'lodash';
import moment from "moment";
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
  const [credentials] = useBehaviorSubject(activeIdentity?.get("credentials").credentials$);
  const { mounted } = useMounted();

  const [originCredential, setOriginCredential] = useState<Credential>(null);
  const [avaliableItemKeys, setAvaliableItemKeys] = useState([]);
  const [openCreateCredential, setOpenCreateCredential] = useState(false);

  const [openEditCredentialDialog, setOpenEditCredentialDialog] = useState(false);
  const [preEditCredentialKey, setPreEditCredentialKey] = useState('');
  const [preEditCredentialValue, setPreEditCredentialValue] = useState('');
  const [editType, setEditType] = useState(EDIT_TYPE.NEW);

  const [isOpenPopupMenu, setOpenPopupMenu] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const { showSuccessToast, showErrorToast } = useToast();

  let basicCredentialsService: BasicCredentialsService;
  let basicCredentialsKey: string[];

  useEffect(() => {
    if (!basicCredentialsService) {
      basicCredentialsService = new BasicCredentialsService();
      basicCredentialsKey = basicCredentialsService.getBasicCredentialkeys();
    }

    if (credentials) {
      setAvaliableItemKeys(findAvailableItem(basicCredentialsKey, getCredentialsKeys(credentials)));
    }
  }, [credentials]);

  const showFeedbackToast = (isSuccess: boolean, preMsg: string) => {
    if (isSuccess) {
      showSuccessToast(preMsg + ' Success');
    } else {
      showErrorToast(preMsg + ' Faild');
    }
  }

  const getCredentialsKeys = (credentials: Credential[]): string[] => {
    return credentials.map(c => (c.verifiableCredential.getId().getFragment()));
  };

  const findAvailableItem = (basicCredentialKeys: string[], existCredentialKeys: string[]): string[] => {
    return basicCredentialKeys.filter((key) => {
      return existCredentialKeys.indexOf(key) == -1;
    });
  }

  const handleCreateCredentialDialogClose = (value: string) => {
    setOpenCreateCredential(false);
    console.log("selected value", value);
    if (value) {
      setOpenEditCredentialDialog(true);
      setPreEditCredentialKey(value);
      setPreEditCredentialValue('');
      setEditType(EDIT_TYPE.NEW);
      setOriginCredential(null);
    }
  };

  const handleEditCredentialDialogClose = async (editCredentialValue: { key: string, value: string, type: EDIT_TYPE, originCredential: Credential }) => {
    setOpenEditCredentialDialog(false);
    if (!editCredentialValue)
      return;

    if (!editCredentialValue.value)
      return;

    if (editCredentialValue.type == EDIT_TYPE.EDIT && editCredentialValue.originCredential) {
      let isSuccess = false;
      try {
        isSuccess = await updateCredential(editCredentialValue.originCredential, editCredentialValue.value).catch()
      } catch (error) {
        logger.error(TAG, 'Update credential error', error);
      }
      showFeedbackToast(isSuccess, 'Edit item');
    }

    if (editCredentialValue.type == EDIT_TYPE.NEW && !originCredential) {
      let isSuccess = false;
      try {
        isSuccess = await createCredential('', [], editCredentialValue.key, editCredentialValue.value);
      } catch (error) {
        logger.error(TAG, 'Create credential error', error);
      }
      showFeedbackToast(isSuccess, 'Create item');
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
    const key = originCredential.verifiableCredential.getId().getFragment();
    setPreEditCredentialKey(key);
    setPreEditCredentialValue(originCredential.verifiableCredential.getSubject().getProperty(key));
    setEditType(EDIT_TYPE.EDIT);
  }

  const handleCloseDialog = async (isAgree: boolean) => {
    setOpenConfirmDialog(false);
    if (!isAgree)
      return;
    let isSuccess = false
    try {
      isSuccess = await deleteCredential(originCredential.verifiableCredential.getId().toString());
    } catch (error) {
      logger.error(TAG, error);
    }
    showFeedbackToast(isSuccess, 'Delete item');
    return;
  };

  const getValueFromCredential = (credential: Credential, propertyName: string): string => {
    if (!credential || !credential.verifiableCredential || !credential.verifiableCredential.getSubject())
      return '';
    return credential.verifiableCredential.getSubject().getProperty(propertyName);
  }

  const getCredentialId = (credential: Credential): string => {
    if (!credential && !credential.verifiableCredential && !credential.verifiableCredential.getId())
      return '';
    return credential.verifiableCredential.getId().toString()
  }

  const deleteCredential = async (credentialId: string) => {
    try {
      await activeIdentity?.get("credentials").deleteCredential(credentialId);
      return true;
    } catch (error) {
      logger.error(TAG, error);
    }
  }

  const createCredential = async (credentialId: string, types: string[], key: string, value: string) => {
    let credentialType: string[] = [];
    try {
      let finalCredentialId;
      if (!credentialId) {
        finalCredentialId = activeIdentity.did + "#" + key;
      } else {
        finalCredentialId = credentialId;
      }
      const basicCredentialsService = new BasicCredentialsService();
      const entry: BasicCredentialEntry = basicCredentialsService.getBasicCredentialInfoByKey(key);
      for (let index = 0; index < types.length; index++) {
        credentialType.push(types[index])
      }
      credentialType.push(entry.context + "#" + entry.shortType);

      const expirationDate = moment().add(5, "years").toDate();

      let prop = {};
      prop[key] = value;

      await activeIdentity?.get("credentials").createCredential(finalCredentialId, credentialType, expirationDate, prop);
      return true;
    } catch (error) {
      logger.error(TAG, error);
    }
  }

  const updateCredential = async (credential: Credential, newValue: string) => {
    const credentialId = getCredentialId(credential);
    try {
      await deleteCredential(credentialId);
      await createCredential(credentialId, [], credential.verifiableCredential.getId().getFragment(), newValue);
      return true;
    } catch (error) {
      logger.error(TAG, error);
    }
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
                  const name = credential.verifiableCredential.getId().getFragment();
                  const value = getValueFromCredential(credential, name);

                  return (
                    <TableRow hover key={id} tabIndex={-1} >
                      <TableCell component="th" scope="row" padding="none">
                        <Stack ml={1} direction="row" alignItems="center" spacing={2}>
                          <Avatar alt={name} src={"/assets/images/account.svg"} />
                          <Typography variant="subtitle2" noWrap>
                            {name}
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
      avaliableItemKeys={avaliableItemKeys}
    />

    <EditCredentialDialog
      credentialKey={preEditCredentialKey}
      defaultValue={preEditCredentialValue}
      type={editType}
      open={openEditCredentialDialog}
      originCredential={originCredential}
      onClose={handleEditCredentialDialogClose}
    />
  </div>)
}

export default Profile;