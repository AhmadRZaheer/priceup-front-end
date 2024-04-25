import { StyleSheet, Text, View } from "@react-pdf/renderer";

const BORDER_COLOR = "#bfbfbf";
const BORDER_STYLE = "solid";
const COL1_WIDTH = 60;
const COLN_WIDTH = (100 - COL1_WIDTH) / 3;
const styles = StyleSheet.create({
  table: {
    display: "table",
    width: "auto",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderRadius: "5px",
    marginTop: "10px",
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol1Header: {
    width: COL1_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: "#ccc",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#ccc",
    borderTopLeftRadius: "5px",
  },
  tableColHeader: {
    backgroundColor: "#ccc",
    width: COLN_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderBottomColor: "#ccc",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol1: {
    width: COL1_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol: {
    width: COLN_WIDTH + "%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: 8,
    fontSize: 14,
    fontWeight: "semibold",
    textTransform: "uppercase",
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
});

const PDFTable = ({ rows, viewQty, viewCostPerUnit }) => {
  return (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <View style={styles.tableCol1Header}>
          <Text style={styles.tableCellHeader}>Item</Text>
        </View>
        <View style={styles.tableColHeader}>
          <Text style={styles.tableCellHeader}>Type</Text>
        </View>
        {viewQty && (
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Qty</Text>
          </View>
        )}
        {viewCostPerUnit && (
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Cost</Text>
          </View>
        )}
        <View style={[styles.tableColHeader, { borderTopRightRadius: "5px" }]}>
          <Text style={styles.tableCellHeader}>Total</Text>
        </View>
      </View>
      {rows?.map((item, index) => (
        <View key={`row-item-${index}`} style={styles.tableRow}>
          <View style={styles.tableCol1}>
            <Text style={styles.tableCell}>{item?.name}</Text>
          </View>
          <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item?.type}</Text>
            </View>
          {viewQty && (
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item?.qty ?? 1}</Text>
            </View>
          )}
          {viewCostPerUnit && (
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>${item?.cost}</Text>
            </View>
          )}
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>${item?.cost * (item?.qty ?? 1) ?? 0}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default PDFTable;
