import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { deleteTruck, openEditTruckDialog, openNewTruckDialog } from '../../store/trucksSlice';
import { Popover } from '@mui/material';
import ConfirmationPopup from '../layout/ConfirmationPopup';
import { setAlert } from '../../store/appSlice';

const TrucksList = () => {
  const dispatch = useDispatch()
  const {data, searchText} = useSelector((state) => state.trucks)
  const [filteredData, setFilteredData] = useState([])
  const [selectedRow, setSelectedRow] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleRowClick = (params, event) => {
    setSelectedRow(params.row);
    setAnchorEl(event.currentTarget);
  };

  const handleDelete = (response) => {
    setConfirmationMessage('')
    if(response) {
      dispatch(deleteTruck(selectedRow.id))
      const message = 'Truck '+selectedRow.id+' is successfully deleted!'
      dispatch(setAlert({type: 'success', message: message}))
    }
  }

  const handleClosePopover = () => setAnchorEl(null);

  const openConfirmation = () => {
    setConfirmationMessage('Are you sure you wanna delete it?')
    handleClosePopover();
  };

  const handleEdit = () => {
    dispatch(openEditTruckDialog(selectedRow))
    handleClosePopover();
  };

  const handleAssign = () => {
    dispatch(openEditTruckDialog(selectedRow))
    handleClosePopover();
  };

  const handlePreview = () => {
    // Implement preview logic here
    console.log("Previewing vehicle:", selectedRow);
    handleClosePopover();
  };

  useEffect(() => {
    const getFilteredArray = (data, searchText) => {
      if(searchText.length === 0) return data
      return data.filter(truck => truck.make.concat(truck.model).toLowerCase().includes(searchText))
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

export default TrucksList
