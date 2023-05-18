import React from "react";

const Table = () => {
  const data = [
    [
      "Row 1, Column 1",
      "Row 1, Column 2",
      "Row 1, Column 3",
      "Row 1, Column 4",
      "Row 1, Column 5",
      "Row 1, Column 6",
    ],
    [
      "Row 2, Column 1",
      "Row 2, Column 2",
      "Row 2, Column 3",
      "Row 2, Column 4",
      "Row 2, Column 5",
      "Row 2, Column 6",
    ],
    [
      "Row 3, Column 1",
      "Row 3, Column 2",
      "Row 3, Column 3",
      "Row 3, Column 4",
      "Row 3, Column 5",
      "Row 3, Column 6",
    ],
    [
      "Row 4, Column 1",
      "Row 4, Column 2",
      "Row 4, Column 3",
      "Row 4, Column 4",
      "Row 4, Column 5",
      "Row 4, Column 6",
    ],
    [
      "Row 5, Column 1",
      "Row 5, Column 2",
      "Row 5, Column 3",
      "Row 5, Column 4",
      "Row 5, Column 5",
      "Row 5, Column 6",
    ],
    [
      "Row 6, Column 1",
      "Row 6, Column 2",
      "Row 6, Column 3",
      "Row 6, Column 4",
      "Row 6, Column 5",
      "Row 6, Column 6",
    ],
    [
      "Row 7, Column 1",
      "Row 7, Column 2",
      "Row 7, Column 3",
      "Row 7, Column 4",
      "Row 7, Column 5",
      "Row 7, Column 6",
    ],
  ];

  return (
    <table>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, columnIndex) => (
              <td key={columnIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
