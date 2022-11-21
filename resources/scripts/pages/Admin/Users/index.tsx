import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { DefaultObjectType, User } from '@utils/interfaces';
import { LOADING_STATE, USER_STATUS } from 'scripts/configs/enums';
import { adminRoutes } from '@components/Router';
import {
  selectCurrentUser,
  selectFilteredUsers,
  selectLoadingUser,
  selectUserFilter,
  userActions
} from '@store/slices/userSlice';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import Box from '@mui/material/Box';
import ConfirmBox from '@components/base/ConfirmBox';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import IconButton from '@mui/material/IconButton';
import Input from '@components/base/Input';
import PageContainer from '@components/base/PageContainer';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import React, { ChangeEventHandler, useEffect, useMemo, useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import UserForm from '@pages/admin/Users/components/UserForm';
import getStyles from './styles';

const Users = () => {
  // Hooks
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // Selectors
  const loadingState: string = selectLoadingUser();
  const users: User[] = selectFilteredUsers();
  const currentUser: User = selectCurrentUser();
  const userFilter: DefaultObjectType = selectUserFilter();
  const styles = getStyles();

  // State
  const [openModal, setOpenModal] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [search, setSearch] = useState<string>('');

  const isLoading = loadingState === LOADING_STATE.LOADING;

  useEffect(() => {
    if (!users.length) {
      dispatch(userActions.fetchUsers());
    }
  }, []);

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      dispatch(userActions.setFilter({ ...userFilter, search }));
    }, 300);
    return () => clearTimeout(debounceSearch);
  }, [search]);

  useEffect(() => {
    if (loadingState === LOADING_STATE.FAIL) {
      enqueueSnackbar('Error', { variant: 'error', autoHideDuration: 1000 });
    } else if (loadingState === LOADING_STATE.SUCCESS) {
      enqueueSnackbar('Success', { variant: 'success', autoHideDuration: 1000 });
    }
  }, [loadingState]);

  // Table configuration
  const columns: GridColDef[] = [
    {
      field: 'fullName',
      headerName: 'Name',
      minWidth: 150,
      flex: 1
    },
    {
      field: 'email',
      headerName: 'Email',
      minWidth: 300,
      flex: 1
    },
    {
      field: 'permission',
      headerName: 'Permission',
      width: 300,
      renderCell: ({ value }: GridRenderCellParams) => (
        <div className="text-capitalize text-primary-blue">{value.toLowerCase() ?? '-'}</div>
      )
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 300,
      renderCell: ({ value }: GridRenderCellParams) => {
        return <div className={`text-capitalize text-status-${value.toLowerCase()}`}>{value.toLowerCase() ?? '-'}</div>;
      }
    },
    {
      field: 'id',
      headerName: 'Actions',
      width: 250,
      renderCell: (params: GridRenderCellParams) => (
        <div className="flex">
          <IconButton onClick={handleEdit(params.id as string)} disabled={isLoading}>
            <EditOutlinedIcon />
          </IconButton>
          <IconButton
            onClick={handleOpenModal(params)}
            disabled={
              isLoading || params.row.status === USER_STATUS.BLOCKED || params.row.userId === currentUser.userId
            }
          >
            <BlockOutlinedIcon />
          </IconButton>
        </div>
      )
    }
  ];

  const handleEdit = (userId: string) => () => {
    if (!userId) return;
    const selectedUser: User = users.find((user: User) => user.userId === userId);
    setSelectedUser(selectedUser);
    setOpenForm(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = (params: GridRenderCellParams) => () => {
    setOpenModal(true);
    setSelectedUser(params.row);
  };

  const handleSubmitModal = () => {
    if (openModal) {
      handleCloseModal();
    }
    const updateData = {
      userId: currentUser.userId,
      status: USER_STATUS.BLOCKED
    };
    dispatch(userActions.patchUser(updateData));
  };

  const handleSearchTask: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearch(event.target.value);
  };

  const handleToggleUserForm = (value: boolean = false) => {
    if (!value) {
      setSelectedUser(null);
    }
    setOpenForm(value);
  };

  const saveUser = async (data: any) => {
    const { status, permission, ...restData } = data;
    const payload = {
      ...restData,
      status: status.value,
      permission: permission.value
    };

    if (payload?.userId) {
      dispatch(userActions.patchUser(payload));
    } else {
      dispatch(userActions.postUser(payload));
    }
  };

  const MemoUserForm = useMemo(() => {
    return (
      <UserForm open={openForm} user={selectedUser} onClose={() => handleToggleUserForm(false)} onSubmit={saveUser} />
    );
  }, [openForm]);

  return (
    <PageContainer title="Users" loading={isLoading} routes={adminRoutes}>
      <div className="container flex flex-column flex-1">
        <Box sx={styles.toolbarStyles}>
          <Box className="w-25 mr-4">
            <Input
              autoComplete="off"
              disabled={isLoading}
              placeholder="Search task"
              icon={<SearchOutlinedIcon />}
              value={search}
              onChange={handleSearchTask}
            />
          </Box>
          <Box>
            <button
              className="button create flex items-center"
              disabled={isLoading}
              onClick={() => handleToggleUserForm(true)}
            >
              <PersonAddAltOutlinedIcon className="mr-1" />
              Add
            </button>
          </Box>
        </Box>
        <Box className="bg-white flex-1 px-4 overflow-auto" sx={styles.gridContainerStyles}>
          <DataGrid
            loading={isLoading}
            columns={columns}
            rows={users}
            getRowId={(row) => row.userId}
            rowHeight={50}
            autoHeight
            disableSelectionOnClick
            disableColumnMenu
            sx={styles.gridStyles}
          />
        </Box>
      </div>
      <ConfirmBox
        title="Confirm"
        open={openModal}
        message="Are you sure to perform action ?"
        onClose={handleCloseModal}
        onSubmit={handleSubmitModal}
      />
      {MemoUserForm}
    </PageContainer>
  );
};

export default Users;
