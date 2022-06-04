import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { User } from 'scripts/interfaces/User';
import { selectUsers, userActions } from '@store/slices/userSlice';
import { useDispatch } from 'react-redux';
import BaseSelect from '@components/base/Select';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import IconButton from '@mui/material/IconButton';
import Input from '@components/base/Input';
import PageContainer from '@components/base/PageContainer';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';

const MOCK_OPTIONS = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

const Users = () => {
  const [tableData, setTableData] = useState({
    loading: false,
    rows: [],
    page: 1,
    pageSize: 10
  });
  const dispatch = useDispatch();
  const users: User[] = selectUsers();
  // const loading: LOADING_STATE = selectLoadingUser();

  useEffect(() => {
    if (!users.length) {
      dispatch(userActions.fetchUsers());
    }
  }, []);

  useEffect(() => {
    setTableData((prevState) => ({ ...prevState, rows: users }));
  }, [users.length]);

  // Table configuration
  const columns: GridColDef[] = [
    {
      field: 'fullName',
      headerName: 'Name',
      width: 150,
      resizable: false,
      editable: false,
      sortable: false
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 300,
      resizable: false,
      editable: false,
      sortable: false
    },
    {
      field: 'permission',
      headerName: 'Permission',
      width: 300,
      resizable: false,
      editable: false,
      sortable: false,
      renderCell: ({ value }: GridRenderCellParams) => (
        <div className='text-capitalize text-primary-blue'>{value.toLowerCase() ?? '-'}</div>
      )

    },
    {
      field: 'status',
      headerName: 'Status',
      width: 300,
      resizable: false,
      editable: false,
      sortable: false,
      renderCell: ({ value }: GridRenderCellParams) => {
        return (
          <div className={`text-capitalize text-status-${value.toLowerCase()}`}>{value.toLowerCase() ?? '-'}</div>
        );
      }
    },
    {
      field: 'id',
      headerName: 'Actions',
      width: 250,
      resizable: false,
      editable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <div className='flex'>
          <IconButton onClick={handleEdit(params.id as string)}>
            <EditOutlinedIcon />
          </IconButton>
          <IconButton onClick={handleDelete(params.id as string)}>
            <DeleteOutlinedIcon />
          </IconButton>
        </div>
      )
    }
  ];

  const handleEdit = (userId: string) => () => {
    console.log('Edit', userId);
  };

  const handleDelete = (userId: string) => () => {
    console.log('Delete', userId);
  };

  return (
    <PageContainer title='Users'>
      <div className="container flex flex-column flex-1">
        <div className="flex justify-between py-6 px-3 bg-white">
          <div className="flex">
            <Input name="search" className="border-0 border-radius-4 mr-2" placeholder="Search" />
            <BaseSelect options={MOCK_OPTIONS} placeholder="Permission" className="mr-2" />
            <BaseSelect options={MOCK_OPTIONS} placeholder="Status" className="mr-2"/>
            <div className={styles.selectedFilter}></div>
          </div>
          <button className='button create flex items-center'>
            <PersonAddAltOutlinedIcon className='mr-1' />
            Add
          </button>
        </div>
        <div className="bg-white flex-1">
          <DataGrid
            columns={columns}
            rows={tableData.rows}
            getRowId={(row) => row.userId}
            rowHeight={50}
            autoHeight
            checkboxSelection
            disableSelectionOnClick
            disableColumnMenu
          />
        </div>
      </div>
    </PageContainer>
  );
};

export default Users;
