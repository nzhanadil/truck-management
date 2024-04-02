import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { Popover } from '@mui/material';
import ConfirmationPopup from '../layout/ConfirmationPopup';
import { useNavigate } from 'react-router-dom';

const DriversList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {data, searchText} = useSelector((state) => state.users)
  const [filteredData, setFilteredData] = useState([])
  const [selectedRow, setSelectedRow] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleRowClick = (params, event) => {
    setSelectedRow(params.row);
    setAnchorEl(event.currentTarget);
  };

  const handleDelete = (response) => {
    // setConfirmationMessage('')
    // if(response) {
    //   dispatch(deleteTruck(selectedRow.id))
    //   const message = 'Truck '+selectedRow.id+' is successfully deleted!'
    //   dispatch(setAlert({type: 'success', message: message}))
    // }
  }

  const handleClosePopover = () => setAnchorEl(null);

  const openConfirmation = () => {
    // setConfirmationMessage('Are you sure you wanna delete it?')
    handleClosePopover();
  };

  const handleEdit = () => {
    // dispatch(openEditTruckDialog(selectedRow))
    handleClosePopover();
  };

  const handleAssign = () => {
    // dispatch(openEditTruckDialog(selectedRow))
    handleClosePopover();
  };

  const handlePreview = () => {
    navigate(`/drivers/${selectedRow.email}/`, {replace:true})
    handleClosePopover();
  };

  const getDrivers = (data) => {
    return data.filter(user => user.role==='driver')
  }

  useEffect(() => {
    const getFilteredArray = (data, searchText) => {
      if(searchText.trim().length === 0) return getDrivers(data)
      return getDrivers(data).filter(user => (user.firstname+" "+user.lastname).toLowerCase().includes(searchText.trim()))
    }
    if(data) {
      setFilteredData(getFilteredArray(data, searchText))
    }
  }, [data, searchText])

  const columns = [
      { field: 'firstname', headerName: 'Firstname', minWidth: 100, flex: 1 },  
      { field: 'lastname', headerName: 'Lastname', minWidth: 100 , flex: 1 },
      { field: 'email', headerName: 'Email', minWidth: 100, flex: 1} ,
      { field: 'phone_number', headerName: 'Phone number', minWidth: 100, flex: 1 },
      { field: 'truck', headerName: 'Truck', minWidth: 100, flex: 1 },
      { field: 'trailer', headerName: 'Trailer', minWidth: 100, flex: 1 },
  ];

  return (
    <div style={{ height: '90vh', width: '100%' }} className='px-5'>
      <DataGrid
        rows={filteredData}
        columns={columns}
        sx={{ '&, [class^=MuiDataGrid]': { border: 'none' } }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 15, 20, 25, 30]}
        disableColumnMenu={true}
        rowSelection={false}
        onRowClick={handleRowClick}
      />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div className='flex flex-col w-28 gap-3 p-2'>
          <button 
            onClick={handleEdit}
            className='flex justify-between p-1 hover:bg-gray-200 rounded-sm'
          >
            <p>Edit</p>
            <EditIcon />
          </button>
          <button 
            onClick={openConfirmation}
            className='flex justify-between p-1 hover:bg-gray-200 rounded-sm'
          >
            <p>Delete</p>
            <DeleteIcon />
          </button>
          <button 
            onClick={handleAssign}
            className='flex justify-between p-1 hover:bg-gray-200 rounded-sm'
          >
            <p>Assign</p>
            <AssignmentIndIcon />
          </button>
          <button
            onClick={handlePreview}
            className='flex justify-between p-1 hover:bg-gray-200 rounded-sm'
          >
            <p>Preview</p>
            <VisibilityIcon />
          </button>
        </div>
      </Popover>

      { confirmationMessage && <ConfirmationPopup message={confirmationMessage} handleConfirm={handleDelete}/>}
    </div>
  )
}

export default DriversList
