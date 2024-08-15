import React, { useEffect, useState } from "react";
import {
    Box,
    CircularProgress,
    useMediaQuery,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import CustomIconButton from "@/components/ui-components/CustomButton";
import { useCreateDocument, useDeleteDocument, useDeleteDocumentProp, useEditDocument, useFetchAllDocuments } from "@/utilities/ApiHooks/common";
import { backendURL, createSlug, getDecryptedToken } from "@/utilities/common";
import HardwareItem from "@/components/common/HardwareItem";
import DeleteModal from "@/components/Modal/deleteModal";
import HardwareEditModal from "@/components/common/HardwareEditModal";
import HardwareCreateModal from "@/components/common/HardwareCreateModal";
import { setMirrorsHardwareRefetch } from "@/redux/refetch";
import { useDispatch } from "react-redux";

const MirrorsEdgeWorkComponent = () => {
    const dispatch = useDispatch();
    const routePrefix = `${backendURL}/mirrors/edgeWorks`;
    const decodedToken = getDecryptedToken();
    const {
        data: edgeWorksList,
        refetch: refetchEdgeWorksList,
        isFetching: fetchingEdgeWorksList,
    } = useFetchAllDocuments(routePrefix);
    const { mutate: deleteGlassType, isLoading: deleteEdgeWorkLoading, isSuccess: deleteSuccess } =
        useDeleteDocument();
    const { mutate: deleteGlassTypeOption, isLoading: deleteEdgeWorkOptionLoading, isSuccess: deleteOptionSuccess } =
        useDeleteDocumentProp();
    const { mutate: editGlassType, isLoading: editEdgeWorkLoading, isSuccess: editSuccess } =
        useEditDocument();
    const { mutate: createGlassType, isLoading: createEdgeWorkLoading, isSuccess: createSuccess } =
        useCreateDocument();
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [itemToModify, setItemToModify] = useState(null);
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
    useEffect(() => {
        refetchEdgeWorksList();
        if (editSuccess) {
            setUpdateModalOpen(false);
            dispatch(setMirrorsHardwareRefetch());
        }
        if (createSuccess) {
            setCreateModalOpen(false);
            dispatch(setMirrorsHardwareRefetch());
        }
        if (deleteSuccess) {
            setDeleteModalOpen(false);
            dispatch(setMirrorsHardwareRefetch());
        }
    }, [deleteSuccess, editSuccess, createSuccess, deleteOptionSuccess]);


    const miniTab = useMediaQuery("(max-width: 1280px)");
    return (
        <>
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
                        textTransform: "uppercase",
                    }}
                >
                    <p style={{ fontWeight: "bold", paddingTop: 10, paddingBottom: 10 }}>
                        {'Edge Works'}
                    </p>
                </div>
                <div
                    style={{
                        padding: 4,
                    }}
                >
                    <CustomIconButton
                        handleClick={handleOpenCreateModal}
                        icon={<Add style={{ color: "white" }} />}
                        buttonText=" Add"
                    />
                </div>{" "}
            </div>
            <div
                style={{
                    display: "flex",
                    gap: 4,
                    alignContent: "center",
                    backgroundColor: "rgb(232, 232, 232)",
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
                    Name
                </div>{" "}

                <div
                    style={{
                        width: "250px",

                        padding: 4,
                    }}
                >
                    Cost
                </div>
                <div
                    style={{
                        width: "250px",

                        padding: 4,
                    }}
                >
                    Status
                </div>{" "}
            </div>
            {fetchingEdgeWorksList ? (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "20px",
                        alignItems: "center",
                        height: "56vh",
                        background:'#FFFF'
                    }}
                >
                    <CircularProgress size={24} sx={{ color: "#8477DA" }} />
                </Box>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        height: miniTab ? "69vh" : "76vh",
                        overflowY: "scroll",
                        background:'#FFFF'
                    }}
                >
                    {edgeWorksList?.length !== 0 ? (
                        edgeWorksList?.map((entry, mainIndex) => (
                            <HardwareItem entry={entry} key={mainIndex}
                                mainIndex={mainIndex} handleOpenDeleteModal={handleOpenDeleteModal}
                                handleOpenUpdateModal={handleOpenUpdateModal}
                                handleHardwareOptionDelete={handleHardwareOptionDelete}
                                handleUpdateItem={handleUpdateItem} itemToModify={itemToModify}
                                setItemToModify={setItemToModify} />
                        ))
                    ) : (
                        <Box sx={{ color: "#667085" }}>No Edge Work Found</Box>
                    )}
                </Box>
            )}

            <DeleteModal
                open={deleteModalOpen}
                close={() => { setDeleteModalOpen(false) }}
                isLoading={deleteEdgeWorkLoading}
                handleDelete={handleHardwareDelete}
            />
            <HardwareEditModal
                open={updateModalOpen}
                close={() => { setUpdateModalOpen(false) }}
                data={itemToModify}
                isLoading={editEdgeWorkLoading}
                handleEdit={handleUpdateItem}
                hardwareType={'Edge Work'}
            />
            <HardwareCreateModal
                open={createModalOpen}
                close={() => { setCreateModalOpen(false) }}
                isLoading={createEdgeWorkLoading}
                handleCreate={handleCreateItem}
                hardwareType={'Edge Work'}
            />
        </>
    );
};

export default MirrorsEdgeWorkComponent;
