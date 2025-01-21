import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Box,
  TextareaAutosize,
  FormControl,
  Select,
  MenuItem,
  TextField,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import {
  ContentCopy,
  DoneOutlined,
  HelpOutline as HelpOutlineIcon,
} from "@mui/icons-material";
import {
  useEditDocument,
  useFetchSingleDocument,
} from "@/utilities/ApiHooks/common";
import { backendURL, frontendURL } from "@/utilities/common";
import { useNavigate, useParams } from "react-router-dom";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { showSnackbar } from "@/redux/snackBarSlice";
import { getWineCellarsHardware } from "@/redux/wineCellarsHardwareSlice";
import { getMirrorsHardware } from "@/redux/mirrorsHardwareSlice";
import { getListData } from "@/redux/estimateCalculations";
import { generateInvoiceItemsFromEstimates } from "@/utilities/estimates";
import { useSelector } from "react-redux";

export default function InvoicePage() {
  return <InvoiceDetails />;
}

function InvoiceDetails() {
  const { id } = useParams();
  const { data, refetch, isSuccess } = useFetchSingleDocument(
    `${backendURL}/invoices/${id}`
  );
  const {
    mutate: editInvoiceDetails,
    isLoading: editLoading,
    isSuccess: editSuccess,
  } = useEditDocument();
  const [notes, setNotes] = useState(data?.description);
  const [editNotes, setEditNotes] = useState(true);
  const [status, setStatus] = useState(data?.status);
  const [editInvoiceDetail, setEditInvoiceDetail] = useState(true);
  const [dueDate, setDueDate] = useState(dayjs(data?.dueDate));
  const [isEdit, setIsEdit] = useState(false);
  const [copyLink, setCopyLink] = useState(false);
  const wineCellarHardwareList = useSelector(getWineCellarsHardware);
  const mirrorsHardwareList = useSelector(getMirrorsHardware);
  const showerHardwareList = useSelector(getListData);
  const companySettings = useSelector((state) => state.location);

  useEffect(() => {
    setIsEdit(false);
  }, [editSuccess]);
  const handleDateChange = (newDate) => {
    setDueDate(newDate);
    setIsEdit(true);
  };
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    setIsEdit(true);
  };
  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const handleUpdateInvoice = () => {
    const updateData = {
      dueDate: dueDate,
      status: status,
      notes: notes,
    };

    editInvoiceDetails({
      data: updateData,
      apiRoute: `${backendURL}/invoices/${id}`,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setCopyLink(false);
    }, 50000);
  }, [copyLink]);
  const handleCopyPreview = (value) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(value ?? "")
        .then(() => {
          setCopyLink(true);
          showSnackbar("Link Copied", "success");
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
        setCopyLink(true);
        showSnackbar("Link Copied", "success");
      } catch (err) {
        console.error("Fallback: Failed to copy text using execCommand:", err);
      } finally {
        document.body.removeChild(textarea);
      }
    }
  };
  useEffect(() => {
    setDueDate(dayjs(data?.dueDate));
    setStatus(data?.status);
    setNotes(data?.notes);
  }, [isSuccess]);

  useEffect(() => {
    refetch();
  }, []);

  const hardwaresList = {
    showers: showerHardwareList,
    mirrors: mirrorsHardwareList,
    wineCellars: wineCellarHardwareList,
  };
  const estimateListData = useMemo(() => {
    let result = [];
    if (
      data?.estimateDetailArray?.length > 0 &&
      hardwaresList.showers &&
      hardwaresList.mirrors &&
      hardwaresList.wineCellars
    ) {
      const EstimateDeatilsData = generateInvoiceItemsFromEstimates(
        data?.estimateDetailArray ?? [],
        hardwaresList,
        companySettings
      );
      result = EstimateDeatilsData ?? [];
    }
    return result;
  }, [data]);

  const InvoiceTotal = useMemo(() => {
    return estimateListData.reduce((total, data) => {
      if (!data.pricing) return total; 
      const price = data.pricing.discountTotal > 0
        ? data.pricing.discountTotal
        : data.pricing.totalPrice;
      return total + (price || 0);
    }, 0);
  }, [estimateListData,data]);

  console.log(estimateListData, data, "datadatadatadatadatadatadata");

  return (
    <Card sx={{ pb: 4 }}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          py: 2,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Typography variant="h5">Invoice {data?.invoiceId || ""}</Typography>
          <IconButton size="small">
            <HelpOutlineIcon />
          </IconButton>
        </div>
        <div style={{ display: "flex", gap: "16px" }}>
          {isEdit ? (
            <Button
              disabled={editLoading}
              onClick={handleUpdateInvoice}
              sx={{
                textTransform: "initial",
                backgroundColor: "#8477da",
                "&:hover": {
                  backgroundColor: "#8477da",
                },
              }}
              variant="contained"
            >
              {editLoading ? (
                <CircularProgress size={24} sx={{ color: "#8477DA" }} />
              ) : (
                "Update"
              )}
            </Button>
          ) : (
            ""
          )}
          {data?.customerPreview?.link ? (
            <Box>
              <div className="subscribe-box">
                <input
                  type="text"
                  className="email-input"
                  placeholder="Customer Preview Link"
                  value={`${frontendURL}/customer-landing-page-preview/${data?._id}`}
                  disabled
                />
                <Tooltip
                  placement="top"
                  title={copyLink ? "Copied" : "Copy Customer Preview Link"}
                >
                  <button
                    className="subscribe-btn"
                    onClick={() =>
                      handleCopyPreview(
                        `${frontendURL}/customer-landing-page-preview/${data?._id}`
                      )
                    }
                  >
                    {copyLink ? (
                      <DoneOutlined sx={{ fontSize: "19px" }} />
                    ) : (
                      <ContentCopy sx={{ fontSize: "19px" }} />
                    )}
                  </button>
                </Tooltip>
              </div>
            </Box>
          ) : (
            ""
          )}
        </div>
      </Box>
      {/* Company and Customer Info */}
      <Box
        sx={{
          display: "grid",
          gap: "24px",
          gridTemplateColumns: "1fr 1fr",
          mt: 1,
          mb: 3,
          px: 3,
        }}
      >
        <Box>
          <Typography variant="h6" gutterBottom>
            Company Information
          </Typography>
          <Typography sx={{ fontWeight: 500 }}>
            Company Name:{" "}
            <Box sx={{ fontWeight: 600 }} component="span">
              {data?.source?.companyName}
            </Box>
          </Typography>
          {data?.source?.companyAddress && (
            <Typography sx={{ fontWeight: 500 }}>
              Company Address:
              <Box sx={{ fontWeight: 600 }} component="span">
                {data?.source?.companyAddress}
              </Box>
            </Typography>
          )}
        </Box>
        <Box>
          <Typography variant="h6" gutterBottom>
            Customer & Project Information
          </Typography>
          <Typography sx={{ fontWeight: 500 }}>
            Project Name:{" "}
            <Box sx={{ fontWeight: 600 }} component="span">
              {data?.source?.projectName}
            </Box>
          </Typography>
          {data?.customer?.name && (
            <Typography sx={{ fontWeight: 500 }}>
              Customer Name:{" "}
              <Box sx={{ fontWeight: 600 }} component="span">
                {data?.customer?.name}
              </Box>
            </Typography>
          )}
          {data?.customer?.address !== "" ? (
            <Typography sx={{ fontWeight: 500 }}>
              Billing Address:{" "}
              <Box sx={{ fontWeight: 600 }} component="span">
                {data?.customer?.address}
              </Box>
            </Typography>
          ) : (
            ""
          )}
          {data?.customer?.email !== "" ? (
            <Typography sx={{ fontWeight: 500 }}>
              Customer Email:{" "}
              <Box sx={{ fontWeight: 600 }} component="span">
                {data?.customer?.email}
              </Box>
            </Typography>
          ) : (
            ""
          )}
          {data?.customer?.phone !== "" ? (
            <Typography sx={{ fontWeight: 500 }}>
              Customer Phone:{" "}
              <Box sx={{ fontWeight: 600 }} component="span">
                {data?.customer?.phone}
              </Box>
            </Typography>
          ) : (
            ""
          )}
          {data?.source?.country !== "" ? (
            <Typography sx={{ fontWeight: 500 }}>
              Project Address:{" "}
              <Box sx={{ fontWeight: 600 }} component="span">
                {data?.source?.city},{data?.source?.state}{" "}
                {data?.source?.postalCode}
              </Box>
            </Typography>
          ) : (
            ""
          )}
        </Box>
      </Box>
      <hr style={{ border: "1px solid rgb(209, 212, 219)" }} />
      <Box
        sx={{
          display: "grid",
          gap: "24px",
          my: 3,
          px: 3,
        }}
      >
        <Box>
          <Box
            sx={{
              display: "grid",
              gap: 3,
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <Box>
              <Typography variant="h6" gutterBottom>
                Description
                {editNotes ? (
                  <BorderColorOutlinedIcon
                    fontSize="20px"
                    sx={{ cursor: "pointer" }}
                    onClick={() => setEditNotes(!editNotes)}
                  />
                ) : (
                  <CheckOutlinedIcon
                    fontSize="20px"
                    sx={{ cursor: "pointer" }}
                    onClick={() => setEditNotes(!editNotes)}
                  />
                )}
                {/* </IconButton> */}
              </Typography>
              {editNotes ? (
                <Typography sx={{ fontSize: "14px", pr: 4 }}>
                  {notes || ""}
                </Typography>
              ) : (
                <TextareaAutosize
                  disabled={editNotes}
                  style={{
                    padding: "10px",
                    borderColor: "#cccc",
                    borderRadius: "5px",
                    width: "60%",
                  }}
                  className="custom-textfield"
                  color="neutral"
                  minRows={2}
                  maxRows={10}
                  id="notes"
                  name="notes"
                  placeholder="Enter Additional Notes"
                  size="large"
                  variant="outlined"
                  sx={{ padding: "10px", resize: "vertical" }}
                  value={notes || ""}
                  onChange={handleNotesChange}
                />
              )}
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>
                Quote Details{" "}
                {editInvoiceDetail ? (
                  <BorderColorOutlinedIcon
                    fontSize="20px"
                    sx={{ cursor: "pointer" }}
                    onClick={() => setEditInvoiceDetail(!editInvoiceDetail)}
                  />
                ) : (
                  <CheckOutlinedIcon
                    fontSize="20px"
                    sx={{ cursor: "pointer" }}
                    onClick={() => setEditInvoiceDetail(!editInvoiceDetail)}
                  />
                )}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography
                    sx={{ color: "#212528", fontSize: "14px", opacity: "70%" }}
                  >
                    Invoice Number
                  </Typography>
                  <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                    {data?.invoiceId}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{ color: "#212528", fontSize: "14px", opacity: "70%" }}
                  >
                    Invoice Status
                  </Typography>
                  {editInvoiceDetail ? (
                    <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                      {status}
                    </Typography>
                  ) : (
                    <FormControl
                      sx={{ width: "152px" }}
                      size="small"
                      className="custom-textfield"
                      fullWidth
                    >
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        size="small"
                        sx={{ height: "40px" }}
                        value={status} 
                        onChange={handleStatusChange} 
                        fullWidth
                      >
                        <MenuItem
                          value={"Paid"}
                          sx={{ textTransform: "capitalize" }}
                        >
                          Paid
                        </MenuItem>
                        <MenuItem
                          value={"Unpaid"}
                          sx={{ textTransform: "capitalize" }}
                        >
                          Unpaid
                        </MenuItem>
                        <MenuItem
                          value={"Voided"}
                          sx={{ textTransform: "capitalize" }}
                        >
                          Voided
                        </MenuItem>
                      </Select>
                    </FormControl>
                  )}
                </Box>
                <Box>
                  <Typography
                    sx={{ color: "#212528", fontSize: "14px", opacity: "70%" }}
                  >
                    Issues Date
                  </Typography>
                  <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                    {new Date(data?.createdAt)?.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{ color: "#212528", fontSize: "14px", opacity: "70%" }}
                  >
                    Due Date
                  </Typography>
                  {editInvoiceDetail ? (
                    <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                      {new Date(dueDate)?.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  ) : (
                    <Box>
                      <DesktopDatePicker
                        inputFormat="MM/DD/YYYY"
                        className="custom-textfield"
                        value={dueDate}
                        minDate={dayjs(data?.dueDate) || dayjs()}
                        onChange={handleDateChange}
                        sx={{
                          width: "152px",
                          "& .MuiInputBase-root": {
                            height: 40,
                            backgroundColor: "white",
                          },
                          "& .MuiInputBase-input": {
                            fontSize: "0.875rem",
                            padding: "8px 14px",
                          },
                          "& .MuiInputLabel-root": {
                            fontSize: "14px",
                            fontWeight: 400,
                            fontFamily: '"Roboto",sans-serif !important',
                            top: "-5px",
                            color: "#000000",
                          },
                        }}
                        renderInput={(params) => (
                          <TextField fullWidth {...params} size="small" />
                        )}
                      />
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <hr style={{ border: "1px solid rgb(209, 212, 219)" }} />
      {/* Description & Pricing */}
      <Box sx={{ mt: 3, px: 3 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <Typography variant="h6">Description & Pricing</Typography>
        </div>

        <TableContainer sx={{ borderRadius: 0.5 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>Layout</TableCell>
                <TableCell>Labor Cost</TableCell>
                <TableCell>Glass Cost</TableCell>
                <TableCell>Glass Addon Cost</TableCell>
                <TableCell>Fabrication Cost</TableCell>
                <TableCell>Hardware Cost</TableCell>
                <TableCell>Discount</TableCell>
                <TableCell>Profit</TableCell>
                <TableCell align="right">Item Total</TableCell>
                {/* <TableCell align="center"></TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {estimateListData?.map((item, index) => {
                const discountValue =
                  item?.config?.config?.discount?.value > 0
                    ? item?.config?.config?.discount?.value
                    : 0;
                const discountUnit =
                  item?.config?.config?.discount?.unit ??
                  item?.config?.config?.discount?.unit;
                return (
                  <TableRow key={index}>
                    <TableCell sx={{ textTransform: "capitalize" }}>
                      {item?.category}
                    </TableCell>
                    <TableCell sx={{ textTransform: "capitalize" }}>
                      {item?.layout}
                    </TableCell>
                    <TableCell>
                      $
                      {(
                        (item.pricing?.laborPrice ?? 0) +
                        (item.pricing?.doorLaborPrice ?? 0)
                      )?.toFixed(2) || 0}
                    </TableCell>
                    <TableCell>
                      ${item.pricing?.glassPrice?.toFixed(2) || 0}
                    </TableCell>
                    <TableCell>
                      ${item.pricing?.glassAddonPrice?.toFixed(2) || 0}
                    </TableCell>
                    <TableCell>
                      ${item.pricing?.fabricationPrice?.toFixed(2) || 0}
                    </TableCell>
                    <TableCell>
                      ${item.pricing?.hardwarePrice?.toFixed(2) || 0}
                    </TableCell>
                    <TableCell>
                      {discountValue > 0
                        ? `${discountUnit === "$" ? "$" : ""}${discountValue}${
                            discountUnit === "%" ? "%" : ""
                          }`
                        : "---"}
                    </TableCell>
                    <TableCell>
                      {item.pricing?.profit?.toFixed(2) || 0}%
                    </TableCell>
                    <TableCell align="right">
                      $
                      {(item.pricing?.discountTotal > 0
                        ? item.pricing?.discountTotal
                        : item.pricing?.totalPrice
                      )?.toFixed(2) || 0}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Totals */}
        <div
          style={{
            marginTop: "24px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <div style={{ width: "300px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "8px",
                fontSize: "1.2em",
                fontWeight: "bold",
              }}
            >
              <Typography>Invoice Total:</Typography>
              <Typography sx={{ pr: 2 }}>
                ${data?.grandTotal?.toLocaleString()}
              </Typography>
            </div>
          </div>
        </div>
      </Box>
    </Card>
  );
}
