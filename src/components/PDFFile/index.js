import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import GCS_logo from "../../Assets/GCS-logo.png";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: "10px 20px",
  },
  section_top: {
    display: "flex",
    flexDirection: "row",
    gap: 40,
    height: "32px",
    alignItems: "center",
  },
  top_view_2: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  top_view_2_container: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  top_view_2_title: {
    fontSize: 12,
    fontWeight: "bold",
  },
  top_view_2_value: {
    fontSize: 12,
  },
  title_logo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 30,
    height: 30,
  },
  title: {
    color: "#000",
    fontSize: "20px",
    fontWeight: "bold",
  },
});

// Create Document Component
const PDFFile = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section_top}>
        <View style={styles.title_logo}>
          <Image style={styles.logo} src={GCS_logo} alt="logo" />
          <Text style={styles.title}> PRICE UP</Text>
        </View>
        <View style={styles.top_view_2}>
          <View style={styles.top_view_2_container}>
            <Text style={styles.top_view_2_title}> Quote</Text>
            <Text style={styles.top_view_2_value}> #21334-1</Text>
          </View>
          <View style={styles.top_view_2_container}>
            <Text style={styles.top_view_2_title}> Date</Text>
            <Text style={styles.top_view_2_value}> 2/29/2024</Text>
          </View>
          <View style={styles.top_view_2_container}>
            <Text style={styles.top_view_2_title}> Expiration date</Text>
            <Text style={styles.top_view_2_value}> 2/29/2024</Text>
          </View>
        </View>
      </View>
      {/* <View style={styles.section}>
        <Text>Section #2</Text>
      </View> */}
    </Page>
  </Document>
);

export default PDFFile;
