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
import PDFTable from "../PDFTable";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: "10px 20px",
    gap:5
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
    alignItems:'baseline'
  },
  top_view_2_title: {
    fontSize: 12,
    fontWeight: 900,
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

const PDFFile = ({props}) => (
  <Document onRender={()=>{console.log('pdf rendered')}}>
    <Page size="A4" style={styles.page} wrap>
      {/** Section 1 */}
      <View style={styles.section_top}>
        <View style={styles.title_logo}>
          <Image style={styles.logo} src={GCS_logo} alt="logo" />
          <Text style={styles.title}> PRICE UP</Text>
        </View>
        <View style={styles.top_view_2}>
          <View style={styles.top_view_2_container}>
            <Text style={{fontWeight:"extrabold",fontSize:'14px'}}>Quote:</Text>
            <Text style={styles.top_view_2_value}> #21334-1</Text>
          </View>
          <View style={styles.top_view_2_container}>
            <Text style={{fontWeight:"extrabold",fontSize:'14px'}}> Date:</Text>
            <Text style={styles.top_view_2_value}> {props?.quoteInfo?.name}</Text>
          </View>
          {/* <View style={styles.top_view_2_container}>
            <Text style={{fontWeight:"extrabold",fontSize:'15px'}}> Expiration Date:</Text>
            <Text style={styles.top_view_2_value}> 2/29/2024</Text>
          </View> */}
        </View>
      </View>
      {/** Section 2 */}
      <View style={{display:'flex',flexDirection:'row',alignItems:'baseline',gap:'20px',width:'100%'}}>
        <View style={{flexGrow:0}}>
          <Text style={{padding:'5px 10px',backgroundColor:'#ccc',borderRadius:'5px',fontSize:'15px',fontWeight:'semibold'}}>Customer</Text>
          <View style={{padding:'5px'}}>
          <Text style={{fontSize:'12px'}}>{props?.customerContact?.name}</Text>
          <Text style={{fontSize:'12px'}}>{props?.customerContact?.phone}</Text>
          <Text style={{fontSize:'12px'}}>{props?.customerContact?.email}</Text>
          </View>
        </View>
        <View style={{flexGrow:1}}>
          <Text style={{padding:'5px 10px',backgroundColor:'#ccc',borderRadius:'5px',fontSize:'15px',fontWeight:'semibold'}}>Job Info</Text>
          <View style={{padding:'5px'}}>
          <Text style={{fontSize:'12px'}}>{props?.quoteInfo?.layoutName} - estimate</Text>
          <Text style={{fontSize:'12px'}}>{props?.quoteInfo?.label}</Text>
          </View>
        </View>
        <View style={{flexGrow:1}}>
          <Text style={{padding:'5px 10px',backgroundColor:'#ccc',borderRadius:'5px',fontSize:'15px',fontWeight:'semibold'}}>{props?.locationInfo?.name}</Text>
          <View style={{padding:'5px'}}>
          <Text style={{fontSize:'12px'}}>{props?.locationInfo?.street}</Text>
          <Text style={{fontSize:'12px'}}>{props?.locationInfo?.state}, {props?.locationInfo?.zipCode}</Text>
          <Text style={{fontSize:'12px'}}>{props?.locationInfo?.website}</Text>
          </View>
        </View>
      </View>
      {/** Section 3 */}
      <View style={{borderTop:'1px sloid #ccc',paddingTop:'10px'}}>
       <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
        <View>
           <Text style={{fonrSize:'16px',fontWeight:'semibold'}}>{props?.quoteInfo?.layoutName} - estimate</Text>
           <Text style={{fontSize:'12px'}}>Description to show</Text>
        </View>
        <Text style={{fontWeight:'16px',fontWeight:'semibold'}}>Total: ${'2,343,32.00'}</Text>
       </View>
       <PDFTable viewQty={props?.viewQty} viewCostPerUnit={props?.viewCostPerUnit} rows={props?.tableRows}/>
       {/* <View style={{border:'1px solid #ccc',borderRadius:'5px'}}>
        <View style={{backgroundColor:'#ccc',padding:'5px 10px',}}>
          <Text>Items</Text>
          <Text></Text>
          <Text></Text>
        </View>
       </View> */}
      </View>
      {props?.check && <View style={styles.section}>
        <Text>{props?.text}</Text>
      </View>}
      {/** Pagination */}
      <View style={{borderTop:'1px solid #ccc',position:'absolute',bottom:'10px',left:'20px',right:'20px',padding:'5px'}} fixed>
      <Text style={{fontSize:'13px'}} render={({ pageNumber, totalPages }) => (
        `Page ${pageNumber} / ${totalPages}`
      )} />
      </View>
    </Page>
  </Document>
);

export default PDFFile;
