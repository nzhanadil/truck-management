import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const TrucksList = () => {
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },  
        { field: 'make', headerName: 'Make', width: 130 },
        { field: 'model', headerName: 'Model', width: 130 },
        { field: 'vin', headerName: 'VIN', width: 130 },
        { field: 'status', headerName: 'Status', width: 130 },
        { field: 'mileage', headerName: 'Mileage', width: 130 },
        { field: 'year', headerName: 'Year', width: 130 },
        { field: 'color', headerName: 'Color', width: 130 }
    ];

    const rows = [
        { id: 1, make: 'BMW', model: 'X5', vin: "NJKJ3432435", status: "Active", mileage: 1234124, year: 2020, color: 'blue' },
        { id: 2, make: 'vffg', model: 'X5', vin: "NJKJ3432435", status: "Active", mileage: 1234124, year: 2020, color: 'blue' },
        { id: 3, make: 'fdvf', model: 'X5', vin: "NJKJ3432435", status: "Active", mileage: 1234124, year: 2020, color: 'blue' },
        { id: 4, make: 'BMvfdvfW', model: 'X5', vin: "NJKJ3432435", status: "Active", mileage: 1234124, year: 2020, color: 'blue' },
    ];

  return (
    <div style={{ height: '90vh', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 15, 20, 25, 30]}
        checkboxSelection
      />
    </div>
  )
}

export default TrucksList

