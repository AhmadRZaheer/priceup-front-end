import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  useDeleteSuper_SuperAdmin,
  useFetchSuperSuperAdmin,
} from "../../utilities/ApiHooks/super_superAdmins";
import { parseJwt } from "../ProtectedRoute/authVerify";
import { Search } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import Pagination from "../Pagination/index";
import { Super_SuperColumns } from "../../customerTableSource";
import "./super_superAdmins.scss";
import CustomToggle from "../ui-components/Toggle";
import TableRow from "../SuperAdmin/tableRow";
import DeleteIcon from "../../Assets/Delete-Icon.svg";
import EditIcon from "../../Assets/d.svg";
import Create_Edit_SuperSuperAdmin from "../Modal/editSuper_SuperAdmin";
import CustomIconButton from "../ui-components/CustomButton";

const Super_SuperAdminsTable = () => {
  const { data: SuperData, isLoading, refetch } = useFetchSuperSuperAdmin();
  const { mutate: DeleteSuper_SuperAdmin, isSuccess: DeletedSuccessfully } =
    useDeleteSuper_SuperAdmin();
  const [Super_SuperData, setSuper_SuperData] = useState([]);
  const [Super_ModalOpen, setSuper_ModalOpen] = useState(false);
  const [Super_isEdit, setSuper_isEdit] = useState(false);
  const [Super_SelectedData, setSuper_SelectedData] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filteredData = Super_SuperData?.filter((item) =>
    item?.name.toLowerCase().includes(search.toLowerCase())
  );
  const itemsPerPage = 10;

  const token = localStorage.getItem("token");
  const decodedToken = parseJwt(token);

  const handldeEditClose = () => {
    setSuper_ModalOpen(false);
    setSuper_isEdit(false);
  };

  const handleOpenEdit = (data) => {
    setSuper_ModalOpen(true);
    setSuper_isEdit(true);
    setSuper_SelectedData(data);
  };
  const handleOpenAdd = () => {
    setSuper_ModalOpen(true);
    setSuper_isEdit(false);
  };

  const handleDeleteAdmin = (id) => {
    DeleteSuper_SuperAdmin(id);
  };
  useEffect(() => {
    if (DeletedSuccessfully) {
      refetch();
    }
  }, [DeletedSuccessfully]);
  useEffect(() => {
    const filterLoginUser = async () => {
      let filterUsers = await SuperData?.filter(
        (item) => item?.email !== decodedToken?.email
      );
      setSuper_SuperData(filterUsers);
    };
    filterLoginUser();
  }, [SuperData]);

  useEffect(() => {
    refetch();
  }, []);

  const actionColumn = [
    {
      field: "Status",
      align: "left",
      headerClassName: "customHeaderClass",
      flex: 1.3,
      renderCell: (params) => {
        return (
          <>
            <TableRow
              row={params.row}
              refetch={refetch}
              type={"super_superadmin"}
            />
          </>
        );
      },
    },
    {
      align: "right",
      headerClassName: "customHeaderClass",
      flex: 1.3,
      renderCell: (params) => {
        return (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <IconButton
                sx={{
                  p: 0,
                  borderRadius: "100%",
                  width: 28,
                  height: 28,
                }}
                onClick={() => handleDeleteAdmin(params.row?._id)}
              >
                <img src={DeleteIcon} alt="delete icon" />
              </IconButton>
              <IconButton
                onClick={() => handleOpenEdit(params.row)}
                sx={{
                  p: 0,
                  borderRadius: "100%",
                  width: 28,
                  height: 28,
                }}
              >
                <img src={EditIcon} alt="delete icon" />
              </IconButton>
            </Box>
          </>
        );
      },
    },
  ];
  return (
    <>
      <Box sx={{ m: "auto", width: "95%", py: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            m: "auto",
            alignItems: "center",
            pb: 3,
          }}
        >
          <Typography variant="h5">Super Admins</Typography>
          <CustomIconButton
            buttonText="Add Super Admin"
            handleClick={handleOpenAdd}
          />
        </Box>
        <Box sx={{ border: "1px solid #EAECF0", borderRadius: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "94%",
              m: "auto",
              alignItems: "center",
              py: 1,
            }}
          >
            <Typography variant="h5">Super Admins</Typography>
            <TextField
              placeholder="Search by Name"
              value={search}
              variant="standard"
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                mb: 2,
                ".MuiInputBase-root:after": {
                  border: "1px solid #8477DA",
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search sx={{ color: "#8477DA" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box>
            {isLoading ? (
              <Box
                sx={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <CircularProgress size={24} />
              </Box>
            ) : filteredData?.length === 0 ? (
              <Typography sx={{ color: "#667085", p: 2, textAlign: "center" }}>
                No Super Admins Found
              </Typography>
            ) : (
              <Box>
                <DataGrid
                  style={{
                    border: "none",
                  }}
                  getRowId={(row) => row?._id}
                  rows={filteredData?.slice(
                    (page - 1) * itemsPerPage,
                    page * itemsPerPage
                  )}
                  columns={Super_SuperColumns.concat(actionColumn)}
                  page={page}
                  pageSize={itemsPerPage}
                  rowCount={filteredData ? filteredData?.length : 0}
                  sx={{ width: "100%" }}
                  hideFooter
                />
                <Pagination
                  rows={filteredData}
                  itemsPerPage={itemsPerPage}
                  page={page}
                  setPage={setPage}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Create_Edit_SuperSuperAdmin
        open={Super_ModalOpen}
        close={handldeEditClose}
        data={Super_SelectedData}
        isEdit={Super_isEdit}
        refetch={refetch}
      />
    </>
  );
};

export default Super_SuperAdminsTable;
