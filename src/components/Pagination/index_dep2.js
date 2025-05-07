import { MAX_PAGES_DISPLAYED, itemsPerPage } from "@/utilities/constants";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";

const NewPagination = ({ totalRecords, page, setPage,inputPage,setInputPage, isShowInput ,setIsShowInput }) => {
    // const [page, setPage] = useState(1);
    // const [inputPage, setInputPage] = useState("");
    // const [isShowInput, setIsShowInput] = useState(false);
  
    const totalPages = Math.ceil(totalRecords / itemsPerPage);
  
    const getPageNumbersToShow = () => {
      if (totalPages <= MAX_PAGES_DISPLAYED) {
        return Array.from({ length: totalPages }, (_, index) => index + 1);
      }
  
      const pagesToShow = [];
      const startPage = Math.max(1, page - 2); // Display three on the first side
      const endPage = Math.min(totalPages, startPage + MAX_PAGES_DISPLAYED - 1);
  
      if (startPage > 1) {
        pagesToShow.push(1);
        if (startPage > 2) {
          pagesToShow.push("..."); // Display ellipsis if there are skipped pages
        }
      }
  
      for (let i = startPage; i <= endPage; i++) {
        pagesToShow.push(i);
      }
  
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pagesToShow.push("..."); // Display ellipsis if there are skipped pages
        }
        pagesToShow.push(totalPages);
      }
  
      return pagesToShow;
    };
  
    const pageNumbersToShow = getPageNumbersToShow();
  
    const handlePreviousPage = () => {
      setPage((prevPage) => Math.max(prevPage - 1, 1));
      setIsShowInput(false);
    };
  
    const handleNextPage = () => {
      setPage((prevPage) => Math.min(prevPage + 1, totalPages));
      setIsShowInput(false);
    };
  
    const handleInputChange = (event) => {
      setInputPage(event.target.value);
    };
    const HandleShowInput = () => {
      setIsShowInput(true);
    };
    const HandleShowRemoveInput = () => {
      setIsShowInput(false);
    };
    const handleInputKeyPress = (event) => {
      if (event.key === "Enter") {
        const pageNumber = parseInt(inputPage, 10);
        if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
          setPage(pageNumber);
          setInputPage("");
          setIsShowInput(false);
        }
      }
    };
  
    const handleInputBlur = () => {
      setInputPage("");
    };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        borderTop: "1px solid #EAECF0",
        width: "96%",
      }}
    >
      <Button
        sx={{
          border: "1px solid #D0D5DD",
          color: "#344054",
          borderRadius: "8px",
          textTransform: "capitalize",
          fontWeight: 500,
          ":hover": {
            border: "1px solid #D0D5DD",
            color: "#344054",
          },
        }}
        variant="outlined"
        onClick={handlePreviousPage}
        disabled={page === 1}
      >
        <ArrowBack sx={{ color: "#344054", fontSize: 20, mr: 1 }} />
        Previous
      </Button>
      <Box sx={{ display: "flex", gap: 2 }}>
        {pageNumbersToShow.map((pagenumber, index) => (
          <Box
            key={index}
            onClick={() => {
              if (typeof pagenumber === "number") {
                setPage(pagenumber);
                HandleShowRemoveInput();
              }
            }}
            sx={{
              backgroundColor: page === pagenumber ? "#8477DA" : "white",
              color: page === pagenumber ? "white" : "#8477DA",
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #8477DA",
              cursor: typeof pagenumber === "number" ? "pointer" : "default",
            }}
          >
            {isShowInput && pagenumber === "..." ? (
              <TextField
                size="small"
                variant="outlined"
                type="text"
                value={inputPage}
                onChange={handleInputChange}
                onKeyPress={handleInputKeyPress}
                onBlur={handleInputBlur}
                inputProps={{
                  min: 1,
                  max: totalPages,
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
                sx={{ width: 60 }}
              />
            ) : pagenumber === "..." ? (
              <div onClick={HandleShowInput} style={{ cursor: "pointer" }}>
                {pagenumber}{" "}
              </div>
            ) : (
              pagenumber
            )}
          </Box>
        ))}
      </Box>
      <Button
        sx={{
          border: "1px solid #D0D5DD",
          color: "#344054",
          borderRadius: "8px",
          textTransform: "capitalize",
          fontWeight: 500,
          ":hover": {
            border: "1px solid #D0D5DD",
            color: "#344054",
          },
        }}
        onClick={handleNextPage}
        disabled={page === totalPages}
      >
        Next
        <ArrowForward sx={{ color: "#344054", fontSize: 20, ml: 1 }} />
      </Button>
    </Box>
  );
};

export default NewPagination;
