import { HardWareColumns } from '@/utilities/DataGridColumns'
import { DeleteOutlineOutlined, EditOutlined, KeyboardArrowDown } from '@mui/icons-material'
import { Box, Button, Menu, MenuItem, Typography, CircularProgress, Stack } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState, useCallback, useMemo } from 'react'
import CustomToggle from '../ui-components/Toggle'
import CustomInputField from '../ui-components/CustomInput'
import DeleteModal from '../Modal/deleteModal'
import { useDeleteHardwares, useEditFullHardware } from '@/utilities/ApiHooks/hardware'
// import AddEditHardware from '../Modal/addEditHardware'
import AddEditModelHardware from '../Modal/AddEditModelHardware'
import DefaultImage from '../ui-components/defaultImage'

const HardwareTable = React.memo(({ data, refetchData, selectedSlug }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [finishes, setFinishes] = useState(data.finishes);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  const open = Boolean(anchorEl);
  const { mutate: editFinish, isSuccess: hardwareEditSuccess } = useEditFullHardware();
  const { mutate: deleteHardware, isSuccess: deleteSuccess, isLoading: LoadingForDelete } = useDeleteHardwares();

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (deleteSuccess) {
      refetchData();
    }
  }, [deleteSuccess]);

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleHardwareDelete = useCallback(() => {
    deleteHardware(deleteRecord);
    setDeleteModalOpen(false);
  }, [deleteHardware, deleteRecord]);

  const handleOpenDeleteModal = useCallback((id) => {
    setDeleteRecord(id);
    setDeleteModalOpen(true);
    setAnchorEl(null);
  }, []);

  const handleUpdate = useCallback(() => {
    setAnchorEl(null);
    const selectedData = {
      id: data._id,
      finishesData: finishes,
    };
    editFinish({ DataFinishes: selectedData });
  }, [data._id, finishes, editFinish]);

  const handleStatusChange = useCallback(
    (id) => {
      setFinishes((prevFinishes) =>
        prevFinishes.map((item) => (item._id === id ? { ...item, status: !item.status } : item))
      );
    },
    []
  );
  //Open Model
  const [openModel, setOpenModel] = useState(false);
  const handleCloseModel = () => {
    setOpenModel(false);
  };

  const handleOpenEdit = () => {
    setOpenModel(true);
    setAnchorEl(null);
  };

  const handleCostChange = useCallback(
    (event, id) => {
      const value = event.target.value;
      setFinishes((prevFinishes) =>
        prevFinishes.map((item) => (item._id === id ? { ...item, cost: value } : item))
      );
    },
    []
  );

  const actionColumns = useMemo(
    () => [
      {
        field: 'Cost',
        headerClassName: 'ProjectsColumnsHeaderClass',
        flex: 1.6,
        sortable: false,
        renderCell: (params) => (
          <Box sx={{ width: '101px' }}>
            <CustomInputField
              size="small"
              variant="outlined"
              type="number"
              inputProps={{ min: 0 }}
              name="cost"
              placeholder="Cost"
              value={params?.row?.cost}
              onChange={(event) => handleCostChange(event, params.row._id)}
            />
          </Box>
        ),
      },
      {
        field: 'Status',
        headerClassName: 'ProjectsColumnsHeaderClass',
        flex: 2.5,
        sortable: false,
        renderCell: (params) => (
          <Box
            sx={{
              bgcolor: params.row?.status ? '#EFECFF' : '#F3F5F6',
              borderRadius: '70px',
              p: '6px 8px',
              display: 'grid',
              gap: '7px',
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 500,
                lineHeight: '21px',
                color: params?.row.status ? '#8477DA' : '#5D6164',
              }}
            >
              {params?.row.status ? 'Active' : 'Inactive'}
            </Typography>
          </Box>
        ),
      },
      {
        field: '',
        headerClassName: 'ProjectsColumnsHeaderClass',
        flex: 0.7,
        sortable: false,
        renderCell: (params) => (
          <CustomToggle
            checked={params.row.status}
            onChange={() => handleStatusChange(params.row._id)}
            isText={false}
            name="action"
          />
        ),
      },
    ],
    [handleCostChange, handleStatusChange]
  );

  return (
    <>
      <Box
        sx={{
          border: '1px solid #D0D5DD',
          borderRadius: '8px',
          overflow: 'hidden',
          width: "99.88%",
          m: 'auto',
          mt: 1.5,
          background: '#FFFF',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            py: '15px',
            px: 4,
          }}
        >
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <DefaultImage image={data?.image} type={5} name={data?.name} />
            <Typography className="tableHeader">{data?.name}</Typography>
          </Box>
          <Box>
            <Button
              id="demo-customized-button"
              aria-controls={open ? 'demo-customized-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              variant="outlined"
              disableElevation
              onClick={handleClick}
              className="actionBtn"
            >
              Actions
              <KeyboardArrowDown sx={{ width: '16px', height: '16px' }} />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              elevation={0}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'none',
                    boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
                    border: '1px solid #D0D5DD',
                    p: 0,
                    width: '171px',
                    '& .MuiList-padding': {
                      p: 0,
                    },
                  },
                },
              }}
            >
              <MenuItem onClick={handleUpdate} sx={{ p: '12px', ':hover': { background: '#EDEBFA' } }}>
                <Typography className="dropTxt">Update</Typography>
              </MenuItem>
              <MenuItem onClick={handleOpenEdit} sx={{ p: '12px', ':hover': { background: '#EDEBFA' } }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <Typography className="dropTxt" >Edit</Typography>
                  <EditOutlined sx={{ color: '#5D6164', height: '20px', width: '20px' }} />
                </Box>
              </MenuItem>
              <MenuItem onClick={() => handleOpenDeleteModal(data._id)} sx={{ p: '12px', ':hover': { background: '#EDEBFA' } }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <Typography className="dropTxt">Delete</Typography>
                  <DeleteOutlineOutlined sx={{ color: '#E22A2D', height: '20px', width: '20px' }} />
                </Box>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        <DataGrid
          loading={loading}
          style={{ border: 'none' }}
          getRowId={(row) => row._id}
          rows={finishes}
          columns={HardWareColumns.concat(actionColumns)}
          rowHeight={70.75}
          sx={{ width: '100%', minHeight: '500px' }}
          hideFooter
          disableColumnMenu
        />
      </Box>

      <DeleteModal
        text="Hardware"
        open={deleteModalOpen}
        close={() => setDeleteModalOpen(false)}
        isLoading={LoadingForDelete}
        handleDelete={handleHardwareDelete}
      />

      <AddEditModelHardware
        open={openModel}
        close={handleCloseModel}
        data={data}
        isEdit={true}
        refetch={refetchData}
        categorySlug={selectedSlug}
      />
    </>
  );
});
export default HardwareTable