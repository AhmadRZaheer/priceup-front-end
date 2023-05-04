import React from 'react'
import "./customerTable.scss"
import { userColumns , userRows } from '../../customerTableSource';
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';


import { DataGrid } from '@mui/x-data-grid';


const Customertable = () => {
    const actionColumn = [{
        field: "action" ,
        headerName: "Actions",
        width: 200,
        renderCell: () => {
            return(
                <div className="cellAction">
                    <div className="deleteButton"><DeleteIcon/></div>
                    <div className="viewButton"><ModeIcon/></div>
                </div>
            )
        }

    }]
  return (
    <>
    <div className="page-title">
          <h2>Customer List</h2>
        </div>
    <div className="CustomerTable">
        <DataGrid
        rows={userRows}
        columns={userColumns.concat(actionColumn)}
        paginationModel={{ page: 0, pageSize: 8 }}
        checkboxSelection
      />

    </div>
    </>
    
  )
}

export default Customertable