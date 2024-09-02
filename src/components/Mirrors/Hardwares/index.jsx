import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    CircularProgress,
    IconButton,
    Menu,
    MenuItem,
    styled,

    Typography,
    useMediaQuery,
} from "@mui/material";
import { useCreateDocument, useDeleteDocument, useDeleteDocumentProp, useEditDocument, useFetchAllDocuments } from "@/utilities/ApiHooks/common";
import { backendURL, createSlug, getDecryptedToken } from "@/utilities/common";
import HardwareItem from "@/components/common/HardwareItem";
import DeleteModal from "@/components/Modal/deleteModal";
import HardwareEditModal from "@/components/common/HardwareEditModal";
import HardwareCreateModal from "@/components/common/HardwareCreateModal";
import { setMirrorsHardwareRefetch } from "@/redux/refetch";
import { useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { HardWareColumns, MirrorsHardWareColumns } from "@/utilities/DataGridColumns";
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import CustomToggle from "@/components/ui-components/Toggle";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CustomInputField from "@/components/ui-components/CustomInput";
import { CustomSmallSwtich } from "@/components/common/CustomSmallSwitch";
import { ArrowForward } from "@mui/icons-material";

const MirrorsHardwareComponent = () => {
    const dispatch = useDispatch();
    const routePrefix = `${backendURL}/mirrors/hardwares`;
    const decodedToken = getDecryptedToken();
    const {
        data: hardwaresList,
        refetch: refetchHardwaresList,
        isFetching: fetchingHardwaresList,
        isLoading
    } = useFetchAllDocuments(routePrefix);
    const { mutate: deleteHardware, isLoading: deleteHardwareLoading, isSuccess: deleteSuccess } =
        useDeleteDocument();
    const { mutate: deleteHardwareOption, isLoading: deleteHardwareOptionLoading, isSuccess: deleteOptionSuccess } =
        useDeleteDocumentProp();
    const { mutate: editHardware, isLoading: editHardwareLoading, isSuccess: editSuccess } =
        useEditDocument();
    const { mutate: createHardware, isLoading: createHardwareLoading, isSuccess: createSuccess } =
        useCreateDocument();
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [itemToModify, setItemToModify] = useState(null);
    const [rowCosts, setRowCosts] = useState({}); // State for individual row costs
    const handleOpenDeleteModal = () => {
        setDeleteModalOpen(true);
    }

    const handleHardwareDelete = () => {
        deleteHardware({ apiRoute: `${routePrefix}/${itemToModify?._id}` });
    };

    // const handleHardwareOptionDelete = (itemId, optionId) => {
    //     deleteHardwareOption({ apiRoute: `${routePrefix}/${itemId}/${optionId}` });
    // };

    const handleOpenUpdateModal = () => {
        setUpdateModalOpen(true);
    };

    const handleUpdateItem = (props) => {
        console.log(props, 'item modified')
        const isFile = typeof props?.image === 'object';
        if (props?.options) {
            editHardware({ data: { options: props.options }, apiRoute: `${routePrefix}/${props.id}` });
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
            editHardware({ data: formData, apiRoute: `${routePrefix}/${props.id}` });
        }
        localStorage.setItem("scrollToIndex", props.id);
    };

    const handleOpenCreateModal = () => {
        setItemToModify(null);
        setCreateModalOpen(true);
    };
    const handleOpenModifyModal = (record) => {
        setItemToModify(record);
        setUpdateModalOpen(true);
        handleClose();
    }

    const handleCreateItem = (props) => {
        const slug = createSlug(props.name);
        const formData = new FormData();
        if (props.image) {
            formData.append("image", props.image);
        }
        formData.append("name", props.name);
        formData.append("company_id", decodedToken?.company_id);
        formData.append("slug", slug);
        createHardware({ data: formData, apiRoute: `${routePrefix}/save` });
    }
    useEffect(() => {
        refetchHardwaresList();
        if (editSuccess) {
            setUpdateModalOpen(false);
            dispatch(setMirrorsHardwareRefetch());
            setRowCosts({})
        }
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
    }, [deleteSuccess, editSuccess, createSuccess, deleteOptionSuccess]);

    //Drop Down
    const [anchorEl, setAnchorEl] = useState(null);
    const [activeRow, setActiveRow] = useState(null);

    const handleClickAction = (event, row) => {
        setAnchorEl(event.currentTarget);
        setActiveRow(row); // Set the current row when the menu is triggered
    };

    const handleClose = () => {
        setAnchorEl(null);
        setActiveRow(null);
    };

    const open = Boolean(anchorEl);
    //Status   
    const handleStatusChange = (row) => {
        handleClose();
        const updatedOptions = row.options.map((option) => ({
            ...option,
            status: !option.status, // Toggle the status
        }));
        // Update the backend with the new status
        editHardware({ data: { options: updatedOptions }, apiRoute: `${routePrefix}/${row._id}` });
    };

    //Cost and status
   
    // Handle the cost update
    const handleUpdateCost = (data) => {
        handleClose();
        const updatedOptions = data.options.map((option) => ({
            ...option,
            cost:
                rowCosts[data._id] !== undefined
                    ? parseFloat(rowCosts[data._id])
                    : option.cost,
        }));
        editHardware({ data: { options: updatedOptions }, apiRoute: `${routePrefix}/${data._id}` });
    };


    const actionColumn = [
        {
            field: "Cost",
            headerClassName: "ProjectsColumnsHeaderClass",
            flex: 1.6,
            sortable: false,
            renderCell: (params) => {
                console.log(params, 'ffffprams')
                return (
                    <>
                        <Box
                            sx={{
                                width: "101px",
                            }}
                        >
                            <CustomInputField
                                size="small"
                                variant="outlined"
                                type="number"
                                inputProps={{
                                    min: 0,
                                }}
                                name="cost"
                                placeholder="Cost"
                                value={
                                    rowCosts[params.row._id] !== undefined
                                        ? rowCosts[params.row._id]
                                        : params.row.options[0].cost
                                }
                                onChange={(e) =>
                                    setRowCosts({
                                        ...rowCosts,
                                        [params.row._id]: e.target.value,
                                    })
                                }
                            />
                        </Box>
                    </>
                );
            },
        },
        {
            field: "Status",
            headerClassName: "ProjectsColumnsHeaderClass",
            flex: 2.5,
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
                            onClick={(event) => {
                                handleClickAction(event, data);
                                setItemToModify(params.row);
                            }}>
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
                            <MenuItem className='mirror-meun-item' onClick={() => handleUpdateCost(data)} >
                                <Typography className='dropTxt'>Update</Typography>
                            </MenuItem>
                            <MenuItem
                                onClick={() => handleOpenModifyModal(params.row)}
                                // onClick={() => { setItemToModify(params?.row); handleOpenUpdateModal(); handleClose() }}
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
                            <MenuItem className='mirror-meun-item' onClick={() => handleStatusChange(params.row)}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        width: "100%",
                                    }}
                                >
                                    <Typography className='dropTxt'>Change Status</Typography>
                                    <CustomSmallSwtich checked={params?.row?.options[0]?.status}
                                        //  onChange={() => handleStatusChange(params.row)}
                                        inputProps={{ 'aria-label': 'ant design' }} />
                                </Box>
                            </MenuItem>
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

    const columns = MirrorsHardWareColumns().concat(actionColumn);

    const miniTab = useMediaQuery("(max-width: 1280px)");
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
                        pt: 1.5,
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
                            / Hardware
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

                {/* // <Box sx={{
            //     border: "1px solid #EAECF0",
            //     borderRadius: "8px",
            //     width: "99.5%",
            //     m: "auto",
            //     overflow: "hidden",
            //     mt: 2,
            //     background: '#FFFF'
            // }}> */}

                <Box
                    sx={{
                        border: "1px solid #EAECF0",
                        borderRadius: "8px",
                        overflow: "hidden",
                        width: "99.5%",
                        m: "auto",
                        mt: 1.5,
                        background: '#FFFF'
                    }}
                >
                    {isLoading ? (
                        <Box
                            sx={{
                                width: "100%",
                                textAlign: "center",
                                display: "flex",
                                justifyContent: "center",
                                height: "300px",
                                alignItems: "center",
                                background: "#FFFF",
                            }}
                        >
                            <CircularProgress sx={{ color: "#8477DA" }} />
                        </Box>
                    ) : hardwaresList?.length === 0 && !fetchingHardwaresList ? (
                        <Typography sx={{ color: "#667085", p: 2, textAlign: "center", background: '#FFFF' }}>
                            No Hardwear Found
                        </Typography>
                    ) : (
                        <Box> <DataGrid
                            loading={fetchingHardwaresList}
                            style={{
                                border: "none",
                            }}
                            getRowId={(row) => row._id}
                            rows={hardwaresList}
                            columns={columns}
                            rowHeight={70.75}
                            sx={{
                                width: "100%", '.MuiDataGrid-virtualScroller': {
                                    overflow: "hidden !important",
                                }
                            }}
                            hideFooter
                            disableColumnMenu
                        /></Box>
                    )}
                </Box>

                <DeleteModal
                    open={deleteModalOpen}
                    text={"Hardware"}
                    close={() => { setDeleteModalOpen(false) }}
                    isLoading={deleteHardwareLoading}
                    handleDelete={handleHardwareDelete}
                />
                <HardwareEditModal
                    open={updateModalOpen}
                    close={() => { setUpdateModalOpen(false) }}
                    data={itemToModify}
                    isLoading={editHardwareLoading}
                    handleEdit={handleUpdateItem}
                    hardwareType={'Hardware'}
                />
                <HardwareCreateModal
                    open={createModalOpen}
                    close={() => { setCreateModalOpen(false) }}
                    isLoading={createHardwareLoading}
                    handleCreate={handleCreateItem}
                    hardwareType={'Hardware'}
                />
            </Box>
        </>
    );
};

export default MirrorsHardwareComponent;