import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Box, Button, useMediaQuery } from "@mui/material";

const Pagination = ({ totalRecords, itemsPerPage, page, setPage }) => {
  const isMobile =  useMediaQuery('(max-width:600px)');
  const totalPages = Math.ceil(totalRecords / itemsPerPage);
  const MAX_PAGES_DISPLAYED = isMobile ? 3 : 5; // Display fewer pages on mobile
  const placeHolder = '...';
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
        pagesToShow.push(placeHolder); // Display ellipsis if there are skipped pages
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pagesToShow.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pagesToShow.push(placeHolder); // Display ellipsis if there are skipped pages
      }
      pagesToShow.push(totalPages);
    }

    return pagesToShow;
  };

  const pageNumbersToShow = getPageNumbersToShow();

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleSetPageNumber = (pageNumber) => {
   if(pageNumber !== placeHolder){
    setPage(pageNumber);
   }
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: isMobile ? "5px" : "10px",
        borderTop: "1px solid #EAECF0",
      }}
    >
      <Button
        sx={{
          border: "1px solid #D0D5DD",
          color: "#344054",
          borderRadius: "8px",
          textTransform: "capitalize",
          fontWeight: 500,
          background:'white',
          minWidth: isMobile ? '0px' : 'auto',
          padding: isMobile ? '6px' : '5px 15px',
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
       {isMobile ? '' : 'Previous'}
      </Button>
      <Box sx={{ display: "flex", gap: isMobile ? "5px" : 2, }}>
        {pageNumbersToShow.map((pagenumber, index) => (
          <Box
            key={index}
            onClick={() => handleSetPageNumber(pagenumber)}
            sx={{
              backgroundColor:
              page === pagenumber ? "#8477DA" : "white",
              color: page === pagenumber ? "white" : "#8477DA",
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: pagenumber !== placeHolder ? "pointer" : 'text',
              border: page === pagenumber ? "1px solid #8477DA" : "1px solid #D0D5DD"
            }}
          >
            {pagenumber}
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
          background:'white',
          minWidth: isMobile ? '0px' : 'auto',
          padding: isMobile ? '6px' : '5px 15px',
          ":hover": {
            border: "1px solid #D0D5DD",
            color: "#344054",
          },
        }}
        onClick={handleNextPage}
        disabled={pageNumbersToShow?.length > page ? false : true}
      >
        {isMobile ? '' : 'Next'}
        <ArrowForward sx={{ color: "#344054", fontSize: 20, ml: 1 }} />
      </Button>
    </Box>
  );
};

export default Pagination;
