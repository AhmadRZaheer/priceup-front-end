import React, { useEffect, useState } from "react";
import "./hardwareTable.scss";
import { userColumnsHardware } from "../../customerTableSource";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { deleteHardware } from "../../redux/hardwareSlice";
import { Add } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import axios from "axios";
import BasicModal from "../Model/Model";
import { backendURL } from "../../utilities/common";
const FinishesTable = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${backendURL}/finishes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response, "response form api");

        if (response.status === 200) {
          setData(response.data.data);
        } else {
          setError("An error occurred while fetching the data.");
        }
      } catch (error) {
        setError("An error occurred while fetching the data.");
        console.error(error);
      }
    };
    fetchData();
  }, []);
  console.log(data, "data form api");
  const hardwareData = useSelector((state) => state.hardware);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(null);
  const [isEdit, setIsEdit] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    setIsEdit(false);
  };
  const handleClose = () => setOpen(false);
  const handleOpenEdit = (data, isEditAble) => {
    setOpen(true);
    setEdit(data);
    setIsEdit(true);
  };
  const handleDelete = (id) => {
    console.log(id, "id for delelte");
    const token = localStorage.getItem("token");
    console.log(token, "token for delelte");

    axios
      .delete(
        `${backendURL}/finishes/${id}`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response, "put resp");
      })
      .catch((error) => {
        console.error("Update failed", error);
      });
    dispatch(deleteHardware(id));
  };

  const actionColumn = [
    {
      field: " ",
      // headerName: (
      //   // <div onClick={handleOpen}>
      //   //   <img src={plus} alt="Add More" />
      //   // </div>
      // ),
      width: 200,
      renderCell: (params) => {
        const id = params.row._id;
        return (
          <div className="cellAction">
            <div className="deleteButton" onClick={() => handleDelete(id)}>
              <DeleteIcon />
            </div>
            <div
              className="viewButton"
              onClick={() => handleOpenEdit(params.row)}
            >
              <ModeIcon />
            </div>
          </div>
        );
      },
    },
  ];
  if (error) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          width: "100%",
          height: "100vh",
          // background: "red",
          color: "red",
        }}
      >
        Error: {error}
      </div>
    );
  }

  return (
    <>
      <div className="page-title">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            paddingTop: 15,
            paddingBottom: 15,
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          {" "}
          <div
            style={{
              width: "250px",
              padding: 4,
              alignItems: "center",
            }}
          >
            Finishes
          </div>{" "}
          <div
            style={{
              padding: 4,
            }}
          >
            <IconButton onClick={handleOpen}>
              <Add style={{ color: "rgb(65, 106, 238)" }} />
            </IconButton>
          </div>{" "}
        </div>
      </div>
      <Box sx={{ border: "1px solid #EAECF0", margin: 2 }}>
        <div className="hardwareTable">
          <DataGrid
            getRowId={(row) => row._id}
            rows={data}
            columns={userColumnsHardware.concat(actionColumn)}
            paginationModel={{ page: 0, pageSize: 8 }}
            // checkboxSelection
          />
        </div>
      </Box>

      <BasicModal open={open} close={handleClose} data={edit} isEdit={isEdit} />
    </>
  );
};

export default FinishesTable;
