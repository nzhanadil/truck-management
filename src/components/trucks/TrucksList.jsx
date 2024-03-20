import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { openEditTruckDialog, openNewTruckDialog } from '../../store/trucksSlice';

const TrucksList = () => {
  const dispatch = useDispatch()
  const {data, searchText} = useSelector((state) => state.trucks)
  const [filteredData, setFilteredData] = useState([])

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
        onRowClick={(params) => dispatch(openEditTruckDialog(params.row))}
      />
    </div>
  )
}

export default TrucksList

