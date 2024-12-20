import { Close, ContentCopy, DoneOutlined } from "@mui/icons-material";
import DeleteIcon from "@/Assets/Delete-Icon.svg";
import EditIcon from "@/Assets/d.svg";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  useDeleteDocument,
  useFetchAllDocuments,
} from "@/utilities/ApiHooks/common";
import { backendURL } from "@/utilities/common";
import DeleteModal from "@/components/Modal/deleteModal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showSnackbar } from "@/redux/snackBarSlice";
import { useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Modal,
  IconButton,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Tooltip,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  bgcolor: "background.paper",
  p: 2,
  borderRadius: { sm: "4px", xs: "10px" },
  width: { sm: "880px", xs: "80%" },
};

const PreviewLinkList = ({ open, handleClose, projectId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null);
  const [copyLinkStates, setCopyLinkStates] = useState({});

  const routePrefix = `${backendURL}/projects`;
  const {
    data: listExistingData,
    refetch: listRefetch,
    isFetching,
  } = useFetchAllDocuments(
    `${routePrefix}/all-landing-page-preview/${projectId}`
  );

  const {
    mutate: deleteListItem,
    isLoading: deleteListItemLoading,
    isSuccess: deleteSuccess,
  } = useDeleteDocument();

  useEffect(() => {
    listRefetch();
    if (deleteSuccess) {
      setDeleteModalOpen(false);
    }
  }, [deleteSuccess]);

  const handleDeleteItem = () => {
    deleteListItem({
      apiRoute: `${routePrefix}/landing-page-preview/${deleteRecord}`,
    });
  };

  const handleOpenDeleteModal = (id) => {
    setDeleteRecord(id);
    setDeleteModalOpen(true);
  };

  const handleEditItem = (id) => {
    navigate(`/invoices/edit?item_id=${id}`);
  };

  const singleListData = (data) => {
    const noOfEstimate = data?.estimates?.length;
    const totalAmount = data?.estimates?.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.pricing.totalPrice;
    }, 0);
    return {
      noOfEstimate,
      totalAmount,
    };
  };

  const handleCopyPreview = (value, id) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(value ?? "")
        .then(() => {
          setCopyLinkStates((prev) => ({ ...prev, [id]: true }));
          dispatch(
            showSnackbar({ message: "Link Copied", severity: "success" })
          );
          setTimeout(() => {
            setCopyLinkStates((prev) => ({ ...prev, [id]: false }));
          }, 6000);
        })
        .catch((err) => {
          console.error("Failed to copy text using clipboard API:", err);
        });
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = value ?? "";
      textarea.style.position = "fixed";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      try {
        document.execCommand("copy");
        setCopyLinkStates((prev) => ({ ...prev, [id]: true }));
        dispatch(showSnackbar({ message: "Link Copied", severity: "success" }));
        setTimeout(() => {
          setCopyLinkStates((prev) => ({ ...prev, [id]: false }));
        }, 6000);
      } catch (err) {
        console.error("Fallback: Failed to copy text using execCommand:", err);
      } finally {
        document.body.removeChild(textarea);
      }
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-customer-select"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                p: 0.2,
                fontSize: "18px",
                fontWeight: 700,
              }}
            >
              Existing Landing Page List
            </Typography>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
          <Box sx={{ mt: 3, maxHeight: "70vh", overflowY: "auto" }}>
            {listExistingData?.length > 0 ? (
              <Table aria-label="simple table">
                <TableHead sx={{ backgroundColor: "#F3F5F6" }}>
                  <TableRow>
                    <TableCell>No. of Estimates</TableCell>
                    <TableCell align="center">Total Amount</TableCell>
                    <TableCell align="center">Date Added</TableCell>
                    <TableCell align="center">Expiry Date</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listExistingData?.map((row, index) => {
                    const data = singleListData(row);
                    return (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{data.noOfEstimate}</TableCell>
                        <TableCell align="center">
                          ${data.totalAmount.toFixed(2)}
                        </TableCell>
                        <TableCell align="center">
                          {new Date(row?.createdAt).toDateString()}
                        </TableCell>
                        <TableCell align="center">
                          {new Date(
                            row?.customerPreview?.expiresAt
                          ).toDateString()}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ display: "flex", gap: 1.5 }}
                        >
                          <Tooltip placement="top" title="View">
                          <IconButton
                            sx={{ width: 20, height: 20 }}
                            onClick={() =>
                              window.open(
                                `/invoices/${row?._id}/customer-preview`,
                                "_blank"
                              )
                            }
                          >
                            <RemoveRedEyeIcon />
                          </IconButton>
                          </Tooltip>
                       
                          <Tooltip placement="top" title="Delete">
                          <IconButton
                            sx={{ width: 20, height: 20 }}
                            onClick={() => handleOpenDeleteModal(row?._id)}
                          >
                            <img
                              src={DeleteIcon}
                              alt="delete icon"
                              style={{ width: "20px", height: "20px" }}
                            />
                          </IconButton>
                          </Tooltip>
                          <Tooltip placement="top" title="Edit">
                            <IconButton
                              sx={{ width: 20, height: 20 }}
                              onClick={() => handleEditItem(row?._id)}
                            >
                              <img
                                src={EditIcon}
                                alt="delete icon"
                                style={{ width: "20px", height: "20px" }}
                              />
                            </IconButton>
                          </Tooltip>

                          <Tooltip
                            placement="top"
                            title={
                              copyLinkStates[row?._id]
                                ? "Copied"
                                : "Copy Customer Preview Link"
                            }
                          >
                            <IconButton
                              sx={{ width: 20, height: 20 }}
                              onClick={() =>
                                handleCopyPreview(
                                  row?.customerPreview?.link,
                                  row?._id
                                )
                              }
                            >
                              {copyLinkStates[row?._id] ? (
                                <DoneOutlined sx={{ fontSize: "20px" }} />
                              ) : (
                                <ContentCopy sx={{ fontSize: "20px" }} />
                              )}
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <Typography
                sx={{
                  fontSize: "18px",
                  py: 2,
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                No landing Page Found!
              </Typography>
            )}
          </Box>
        </Box>
      </Modal>
      <DeleteModal
        open={deleteModalOpen}
        text={"List Item"}
        close={() => setDeleteModalOpen(false)}
        isLoading={deleteListItemLoading}
        handleDelete={handleDeleteItem}
      />
    </>
  );
};

export default PreviewLinkList;
