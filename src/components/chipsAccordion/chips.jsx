import * as React from "react";
import Chip from "@mui/material/Chip";
import { Box } from "@mui/material";

export default function ChipsArray() {
  const [chipData, setChipData] = React.useState([
    { key: 0, label: "Angular", active: true },
    { key: 1, label: "jQuery", active: false },
    { key: 2, label: "Polymer", active: true },
    { key: 3, label: "React", active: true },
    { key: 4, label: "Vue.js", active: false },
  ]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "baseline",
        gap: "4px",
      }}
      component="ul"
    >
      {chipData.map((data) => {
        return (
          <Box sx={{ padding: "10px", borderRadius: "7px" }} key={data.key}>
            <Chip
              label={data.label}
              onDelete={data.active ? handleDelete(data) : undefined}
            />
          </Box>
        );
      })}
    </Box>
  );
}
