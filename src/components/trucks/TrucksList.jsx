import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { deleteTruck, openEditTruckDialog, openNewTruckDialog, updateTruck } from '../../store/trucksSlice';
import { Popover } from '@mui/material';
import ConfirmationPopup from '../layout/ConfirmationPopup';
import { setAlert } from '../../store/appSlice';
import AssignPopup from '../layout/AssignPopup';
import { addUser, assignTruckToUser, updateUser } from '../../store/usersSlice';
import { getCurrentDate } from '../../utils/HelperFunctions';

const TrucksList = () => {
  const dispatch = useDispatch()
  const {data, searchText} = useSelector((state) => state.trucks)
  const users = useSelector((state) => state.users)
  const [filteredData, setFilteredData] = useState([])
  const [selectedRow, setSelectedRow] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [assignMessage, setAssignMessage] = useState('');

  const handleRowClick = (params, event) => {
    setSelectedRow(params.row);
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => setAnchorEl(null);

  const handleDelete = (response) => {
    setConfirmationMessage('')
    if(response) {
      dispatch(deleteTruck(selectedRow.id))
      const message = 'Truck '+selectedRow.id+' is successfully deleted!'
      dispatch(setAlert({type: 'success', message: message}))
    }
  }

  const openConfirmation = () => {
    setConfirmationMessage('Are you sure you wanna delete it?')
    handleClosePopover();
  };

  const handleEdit = () => {
    dispatch(openEditTruckDialog(selectedRow))
    handleClosePopover();
  };

  const getTruck = (id) => {
    return data.filter(truck => truck.id === id)[0]
  }

  const getUser = (email) => {
    return users.data.filter(user => user.email === email)[0]
  }

  const handleAssign = ({response, value}) => {
    setAssignMessage('')
    if(response) {
      const trucksHistory = [...getUser(value).trucksHistory, {startDate: getCurrentDate(), truck: selectedRow.id, endDate: ''}]
      const truckHistory = [...getTruck(selectedRow.id).history, {startDate: getCurrentDate(), user: value, endDate: '', images: []}]
      dispatch(updateUser({email: value, truck: selectedRow.id, trucksHistory}))
      dispatch(updateTruck({id: selectedRow.id, status: 'assigned', history: truckHistory}))
      const message = 'Truck '+selectedRow.id+' is successfully assigned to driver!'
      dispatch(setAlert({type: 'success', message: message}))
    }
  };

  const openAssign = () => {
    setAssignMessage('Please select driver to assign')
    handleClosePopover();
  };

  const handlePreview = () => {
    // Implement preview logic here
    console.log("Previewing vehicle:", selectedRow);
    handleClosePopover();
  };

  const getAvailableDrivers = () => {
    if(users.currentUser.role === 'driver' && users.currentUser.truck==='') return [users.currentUser.email]
    return users.data.filter(user => user.role === 'driver' && user.truck === '').map(user => user.email)
  }

  useEffect(() => {
    const getFilteredArray = (data, searchText) => {
      if(searchText.trim().length === 0) return data
      return data.filter(truck => (truck.id+" "+truck.make+" "+truck.model).toLowerCase().includes(searchText.trim()))
    }
    if(data) {
      setFilteredData(getFilteredArray(data, searchText))
    }
  }, [data, searchText])

  const columns = [
      { field: 'id', headerName: 'ID', minWidth: 100, flex: 1 },  
      { field: 'make', headerName: 'Make', minWidth: 100 , flex: 1 },
      { field: 'model', headerName: 'Model', minWidth: 100, flex: 1} ,
      { field: 'vin', headerName: 'VIN', minWidth: 100, flex: 1 },
      { field: 'status', headerName: 'Status', minWidth: 100, flex: 1 },
      { field: 'mileage', headerName: 'Mileage', minWidth: 100, flex: 1 },
      { field: 'year', headerName: 'Year', minWidth: 100 , flex: 1 },
      { field: 'color', headerName: 'Color', minWidth: 100, flex: 1 },
      { field: 'plate_number', headerName: 'Plate Number', minWidth: 100, flex: 1 }
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
        <div className='flex flex-col gap-3 p-5 w-44'>
          <button 
            onClick={handleEdit}
            className='flex justify-between py-2 px-3 hover:bg-gray-400 rounded-sm bg-gray-200 disabled:text-gray-500 disabled:hover:bg-gray-200'
          >
            <p>Edit</p>
            <EditIcon />
          </button>
          <button 
            onClick={openConfirmation}
            className='flex justify-between py-2 px-3 hover:bg-gray-400 rounded-sm bg-gray-200 disabled:text-gray-500 disabled:hover:bg-gray-200'
          >
            <p>Delete</p>
            <DeleteIcon />
          </button>
          <button 
            onClick={openAssign}
            disabled={selectedRow && (selectedRow.status === 'out of service' || selectedRow.status === 'assigned')}
            className='flex justify-between py-2 px-3 hover:bg-gray-400 rounded-sm bg-gray-200 disabled:text-gray-500 disabled:hover:bg-gray-200'
          >
            <p>Assign</p>
            <AssignmentIndIcon />
          </button>
          <button
            onClick={handlePreview}
            className='flex justify-between py-2 px-3 hover:bg-gray-400 rounded-sm bg-gray-200 disabled:text-gray-500 disabled:hover:bg-gray-200'
          >
            <p>Preview</p>
            <VisibilityIcon />
          </button>
        </div>
      </Popover>

      { confirmationMessage && <ConfirmationPopup message={confirmationMessage} handleConfirm={handleDelete}/>}
      { assignMessage && <AssignPopup message={assignMessage} handleConfirm={handleAssign} options={getAvailableDrivers()}/>}

    </div>
  )
}

export default TrucksList
