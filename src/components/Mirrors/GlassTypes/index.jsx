import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    CircularProgress,
    IconButton,
    Menu,
    MenuItem,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { Add, ArrowForward } from "@mui/icons-material";
import CustomIconButton from "@/components/ui-components/CustomButton";
import { useCreateDocument, useDeleteDocument, useDeleteDocumentProp, useEditDocument, useFetchAllDocuments } from "@/utilities/ApiHooks/common";
import { backendURL, createSlug, getDecryptedToken } from "@/utilities/common";
import HardwareItem from "@/components/common/HardwareItem";
import DeleteModal from "@/components/Modal/deleteModal";
import HardwareEditModal from "@/components/common/HardwareEditModal";
import HardwareCreateModal from "@/components/common/HardwareCreateModal";
import { setMirrorsHardwareRefetch } from "@/redux/refetch";
import { useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { MirrorsGlassType } from "@/utilities/DataGridColumns";
import CustomInputField from "@/components/ui-components/CustomInput";
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { CustomSmallSwtich } from "@/components/common/CustomSmallSwitch";

const MirrorsGlassTypeComponent = () => {
    const dispatch = useDispatch();
    const routePrefix = `${backendURL}/mirrors/glassTypes`;
    const decodedToken = getDecryptedToken();
    const {
        data: glassTypesList,
        isLoading,
        refetch: refetchGlassTypesList,
        isFetching: fetchingGlassTypesList,
    } = useFetchAllDocuments(routePrefix);
    const { mutate: deleteGlassType, isLoading: deleteGlassTypeLoading, isSuccess: deleteSuccess } =
        useDeleteDocument();
    const { mutate: deleteGlassTypeOption, isLoading: deleteGlassTypeOptionLoading, isSuccess: deleteOptionSuccess } =
        useDeleteDocumentProp();
    const { mutate: editGlassType, isLoading: editGlassTypeLoading, isSuccess: editSuccess } =
        useEditDocument();
    const { mutate: createGlassType, isLoading: createGlassTypeLoading, isSuccess: createSuccess } =
        useCreateDocument();
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [itemToModify, setItemToModify] = useState(null);
    const [updateRefetch, setUpdateRefetch] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [activeRow, setActiveRow] = useState(null);
    const [rowCosts, setRowCosts] = useState({});

    const handleOpenDeleteModal = () => {
        setDeleteModalOpen(true);
    }

    const handleHardwareDelete = () => {
        deleteGlassType({ apiRoute: `${routePrefix}/${itemToModify?._id}` });
    };

    const handleHardwareOptionDelete = (itemId, optionId) => {
        deleteGlassTypeOption({ apiRoute: `${routePrefix}/${itemId}/${optionId}` });
    };

    const handleOpenUpdateModal = () => {
        setUpdateModalOpen(true);
    };

    const handleUpdateItem = (props) => {
        console.log(props, 'item modified')
        const isFile = typeof props?.image === 'object';
        if (props?.options) {
            editGlassType({ data: { options: props.options }, apiRoute: `${routePrefix}/${props.id}` });
            setUpdateRefetch(true);
        } else {

            const formData = new FormData();
            if (props?.name) {
                formData.append("name", props.name);
            }
            if (props?.image && isFile) {
                formData.append("image", props.image);
            }
            if (props?.options) {
                formData.append("options", props.options);
            }
            console.log(formData, 'form data')
            editGlassType({ data: formData, apiRoute: `${routePrefix}/${props.id}` });
            setUpdateRefetch(true);
        }
        localStorage.setItem("scrollToIndex", props.id);
    };

    const handleOpenCreateModal = () => {
        setCreateModalOpen(true);
    };

    const handleCreateItem = (props) => {
        const slug = createSlug(props.name);
        const formData = new FormData();
        if (props.image) {
            formData.append("image", props.image);
        }
        formData.append("name", props.name);
        formData.append("company_id", decodedToken?.company_id);
        formData.append("slug", slug);
        createGlassType({ data: formData, apiRoute: `${routePrefix}/save` });
    }

    const miniTab = useMediaQuery("(max-width: 1280px)");
    // Data Grid
   
    const handleClickAction = (event, row) => {
        setAnchorEl(event.currentTarget);
        setActiveRow(row); // Set the current row when the menu is triggered
    };
    const handleClose = () => {
        setAnchorEl(null);
        setActiveRow(null);
    };
    const handleUpdateCost = (data) => {
        handleClose();
        const updatedOptions = data.options.map((option) => ({
            ...option,
            cost: rowCosts[`${data._id}-${option.thickness}`] !== undefined
                ? parseFloat(rowCosts[`${data._id}-${option.thickness}`])
                : option.cost,
        }));
        setUpdateRefetch(false);
        editGlassType({
            data: { options: updatedOptions },
            apiRoute: `${routePrefix}/${data._id}`,
        });
    };
    const handleStatusChange = (row, optionIndex) => {
        const updatedOptions = row.options.map((option, index) => {
            // Only toggle the status of the option at the specified index
            if (index === optionIndex) {
                return {
                    ...option,
                    status: !option.status, // Toggle the status
                };
            }
            return option;
        });
        editGlassType({ data: { options: updatedOptions }, apiRoute: `${routePrefix}/${row._id}` });
        setUpdateRefetch(true);
    };

    useEffect(() => {
        refetchGlassTypesList();
       
        if (createSuccess) {
            setCreateModalOpen(false);
            dispatch(setMirrorsHardwareRefetch());
            setRowCosts({})
        }
        if (deleteSuccess) {
            setDeleteModalOpen(false);
            dispatch(setMirrorsHardwareRefetch());
            setRowCosts({})
        }
    }, [deleteSuccess,  createSuccess, deleteOptionSuccess]);

    useEffect(()=>{
        if (editSuccess) {
            if (updateRefetch) {
                refetchGlassTypesList();
              }
            setUpdateModalOpen(false);
            dispatch(setMirrorsHardwareRefetch());
        }
    },[editSuccess])

    const thicknessOptions = [{ id: 0, name: 'Thickness 1/4' }, { id: 1, name: 'Thickness 1/8' }]

    const actionColumn = [
        {
            field: "Cost (Thickness 1/4)",
            headerClassName: "ProjectsColumnsHeaderClass",
            flex: 1.5,
            sortable: false,
            renderCell: (params) => (
                <Box sx={{ width: "101px" }}>
                    <CustomInputField
                        size="small"
                        variant="outlined"
                        type="number"
                        inputProps={{ min: 0 }}
                        name={`cost-${params.row._id}-1/4`}
                        placeholder="Cost"
                        value={rowCosts[`${params.row._id}-1/4`] || params.row.options.find(o => o.thickness === '1/4')?.cost || 0}
                        onChange={(e) => setRowCosts({
                            ...rowCosts,
                            [`${params.row._id}-1/4`]: e.target.value,
                        })}
                    />
                </Box>
            ),
        },
        {
            field: "Cost (Thickness 1/8)",
            headerClassName: "ProjectsColumnsHeaderClass",
            flex: 1.5,
            sortable: false,
            renderCell: (params) => (
                <Box sx={{ width: "101px" }}>
                    <CustomInputField
                        size="small"
                        variant="outlined"
                        type="number"
                        inputProps={{ min: 0 }}
                        name={`cost-${params.row._id}-1/8`}
                        placeholder="Cost"
                        value={rowCosts[`${params.row._id}-1/8`] || params.row.options.find(o => o.thickness === '1/8')?.cost || 0}
                        onChange={(e) => setRowCosts({
                            ...rowCosts,
                            [`${params.row._id}-1/8`]: e.target.value,
                        })}
                    />
                </Box>
            ),
        },

        {
            field: "Status  (Thickness 1/4)",
            headerClassName: "ProjectsColumnsHeaderClass",
            flex: 1.5,
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Box
                            sx={{
                                // height: "21px",
                                bgcolor: params?.row?.options[0]?.status === true ? "#EFECFF" : '#F3F5F6',
                                borderRadius: "70px",
                                p: "6px 8px",
                                display: "grid",
                                gap: '7px',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    fontWeight: 500,
                                    lineHeight: "21px",
                                    color: params?.row?.options[0]?.status === true ? '#8477DA' : '#5D6164',
                                }}
                            >
                                {params?.row?.options[0]?.status === true ? 'Active' : 'Inactive'}
                            </Typography>
                        </Box>
                    </>
                );
            },
        },
        {
            field: "Status  (Thickness 1/8)",
            headerClassName: "ProjectsColumnsHeaderClass",
            flex: 1.5,
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Box
                            sx={{
                                // height: "21px",
                                bgcolor: params?.row?.options[1]?.status === true ? "#EFECFF" : '#F3F5F6',
                                borderRadius: "70px",
                                p: "6px 8px",
                                display: "grid",
                                gap: '7px',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    fontWeight: 500,
                                    lineHeight: "21px",
                                    color: params?.row?.options[1]?.status === true ? '#8477DA' : '#5D6164',
                                }}
                            >
                                {params?.row?.options[1]?.status === true ? 'Active' : 'Inactive'}
                            </Typography>
                        </Box>
                    </>
                );
            },
        },
        {
            field: "Actions",
            headerClassName: "ProjectsColumnsHeaderClass",
            flex: 0.7,
            sortable: false,
            renderCell: (params) => {
                const id = params.row._id;
                const data = params.row;
                return (
                    <>
                        <IconButton aria-haspopup="true"
                            onClick={(event) => { handleClickAction(event, data); setItemToModify(data); }}>
                            <ArrowForward sx={{ color: "#8477DA" }} />
                        </IconButton>
                        <Menu
                            // id={params.row._id}
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl && activeRow === data)} // Check if the active row matches the current row
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            MenuListProps={{
                                "aria-labelledby": "basic-button",
                            }}
                            slotProps={{
                                paper: {
                                    elevation: 0,
                                    sx: {
                                        overflow: "visible",
                                        filter: "none",
                                        boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                                        border: "1px solid #D0D5DD",
                                        p: 0,
                                        width: "183px",
                                        "& .MuiList-padding": {
                                            p: 0,
                                        },
                                    },
                                },
                            }}
                        >
                            <MenuItem onClick={() => handleUpdateCost(data)} className='mirror-meun-item'><Typography className='dropTxt'>Update</Typography></MenuItem>

                            <MenuItem
                                onClick={() => { setItemToModify(params?.row); handleOpenUpdateModal(); handleClose() }}
                                className='mirror-meun-item'>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        width: "100%",
                                    }}
                                >
                                    <Typography className='dropTxt'>Edit</Typography>
                                    <EditOutlinedIcon sx={{ color: "#5D6164", height: '20px', width: '20px' }} />
                                </Box>
                            </MenuItem>
                            {thicknessOptions.map((data) => (
                                <MenuItem key={data.id} className='mirror-meun-item' onClick={() => handleStatusChange(params.row, data.id)}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            width: "100%",
                                        }}
                                    >
                                        <Typography className='dropTxt'>{data.name}</Typography>
                                        <CustomSmallSwtich
                                            inputProps={{ 'aria-label': 'ant design' }}
                                            checked={params?.row?.options[data.id]?.status}
                                        //  onChange={() => handleStatusChange(params.row, data.id)} 
                                        />
                                    </Box>
                                </MenuItem>
                            ))}

                            <MenuItem onClick={() => { setItemToModify(params?.row); handleOpenDeleteModal(); handleClose() }} sx={{
                                p: '12px', ':hover': {
                                    background: '#EDEBFA'
                                }
                            }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        width: "100%",
                                    }}
                                >
                                    <Typography className='dropTxt'>Delete</Typography>
                                    <DeleteOutlineOutlinedIcon sx={{ color: "#E22A2D", height: '20px', width: '20px' }} />
                                </Box>
                            </MenuItem>
                        </Menu>

                    </>
                );
            },
        },
    ]
    const columns = MirrorsGlassType().concat(actionColumn);

    console.log(glassTypesList, 'glassTypesListglassTypesList')

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        pb: 1.5,
                    }}
                >
                    <Typography
                        className='headingTxt'
                        sx={{
                            color: "#5D6164",
                            display: 'flex',
                            alignSelf: 'center'
                        }}
                    >
                        Mirrors &nbsp;
                        <Box
                            className='headingTxt'
                            sx={{
                                color: "#000000",
                            }}
                        >
                            / Glass Types
                        </Box>
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={handleOpenCreateModal}
                        sx={{
                            background: "#8477DA",
                            color: "#FFFFFF",
                            fontWeight: 600,
                            fontSize: 16,
                            letterSpacing: '0px',
                            ':hover': {
                                background: "#8477DA",
                            }
                        }}
                    >
                        Add New
                    </Button>
                </Box>

                <Box sx={{
                    border: "1px solid #D0D5DD",
                    borderRadius: "8px",
                    overflow: "hidden",
                    width: "99.88%",
                    m: "auto",
                    mt: 1.5,
                    background: '#FFFF'
                }}>

                    {isLoading ? (
                        <Box
                            sx={{
                                width: 40,
                                m: "auto",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                maxHeight: "70vh",
                                minHeight: "20vh",
                            }}
                        >
                            <CircularProgress sx={{ color: "#8477DA" }} />
                        </Box>
                    ) :
                        glassTypesList?.length === 0 && !fetchingGlassTypesList ? (
                            <Typography sx={{ color: "#667085", p: 2, textAlign: "center", background: '#FFFF' }}>
                                No Hardwear Found
                            </Typography>
                        ) :
                            (<Box>
                                <DataGrid
                                    loading={fetchingGlassTypesList}
                                    style={{
                                        border: "none",
                                    }}
                                    getRowId={(row) => row._id}
                                    rows={glassTypesList}
                                    columns={columns}
                                    rowHeight={70.75}
                                    sx={{
                                        width: "100%", '.MuiDataGrid-virtualScroller': {
                                            overflow: "hidden !important",
                                        }
                                    }}
                                    hideFooter
                                    disableColumnMenu
                                />
                            </Box>
                            )}
                </Box>
                <DeleteModal
                    open={deleteModalOpen}
                    close={() => { setDeleteModalOpen(false) }}
                    isLoading={deleteGlassTypeLoading}
                    handleDelete={handleHardwareDelete}
                    text={"Glass Type"}
                />
                <HardwareEditModal
                    open={updateModalOpen}
                    close={() => { setUpdateModalOpen(false) }}
                    data={itemToModify}
                    isLoading={editGlassTypeLoading}
                    handleEdit={handleUpdateItem}
                    hardwareType={'Glass Type'}
                />
                <HardwareCreateModal
                    open={createModalOpen}
                    close={() => { setCreateModalOpen(false) }}
                    isLoading={createGlassTypeLoading}
                    handleCreate={handleCreateItem}
                    hardwareType={'Glass Type'}
                />
            </Box>
        </>
    );
};

export default MirrorsGlassTypeComponent;
