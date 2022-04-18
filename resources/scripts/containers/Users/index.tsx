import { DataGrid, GridColDef } from '@mui/x-data-grid';
import BaseSelect from '@components/base/Select';
import Input from '@components/base/Input';
import PageContainer from '@components/base/PageContainer';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import React, { useState } from 'react';
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

  // Table configuration
  const columns: GridColDef[] = [
    {
      field: 'fullName',
      headerName: 'Name',
      width: 150,
      editable: false
    }
  ];

  const handleTableError = (err: any) => {
    console.log(err);
  };

  return (
    <PageContainer title='Users'>
      <div className="container">
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
        <div className="bg-white">
          <DataGrid
            columns={columns}
            rows={tableData.rows}
            page={tableData.page}
            paginationMode="server"
            pageSize={tableData.pageSize - 1}
            rowsPerPageOptions={[tableData.pageSize]}
            error={handleTableError}
            rowHeight={50}
            checkboxSelection
            disableSelectionOnClick
            pagination
            autoHeight
          />
        </div>
      </div>
    </PageContainer>
  );
};

export default Users;
