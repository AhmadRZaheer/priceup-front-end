import { Box } from "@mui/material";
import EstImage1 from "../../Assets/estimates/a.png";
import EstImage2 from "../../Assets/estimates/a5.png";
import EstImage3 from "../../Assets/estimates/a (1).png";
import EstImage4 from "../../Assets/estimates/a4.png";
import EstImage5 from "../../Assets/estimates/a3.png";

export const SelectedImage = ({ imageSides }) => {
  if (imageSides === 2) {
    return (
      <>
        <Box>
          <img
            width="300px"
            height="350px"
            src={EstImage1}
            alt="image of the layout"
          />
        </Box>
      </>
    );
  }
  if (imageSides === 3) {
    return (
      <>
        <Box>
          <img
            width="300px"
            height="350px"
            src={EstImage2}
            alt="image of the layout"
          />
        </Box>
      </>
    );
  }

  if (imageSides === 4) {
    return (
      <>
        <Box>
          <img
            width="300px"
            height="350px"
            src={EstImage3}
            alt="image of the layout"
          />
        </Box>
      </>
    );
  }

  if (imageSides === 5) {
    return (
      <>
        <Box>
          <img
            width="300px"
            height="350px"
            src={EstImage4}
            alt="image of the layout"
          />
        </Box>
      </>
    );
  }

  if (imageSides === 6) {
    return (
      <>
        <Box>
          <img
            width="300px"
            height="350px"
            src={EstImage5}
            alt="image of the layout"
          />
        </Box>
      </>
    );
  }
};
