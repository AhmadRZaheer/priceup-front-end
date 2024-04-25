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
import CustomImage from "../../Assets/customlayoutimage.png";
import { backendURL } from "../../utilities/common";
import { renderMeasurementSides } from "../../utilities/estimates";
import { quoteState } from "../../utilities/constants";
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
  logo2: {
    width: 125,
    height: 150,
  },
  title: {
    color: "#000",
    fontSize: "20px",
    fontWeight: "bold",
  },
});

// Create Document Component

const PDFFile = ({controls,data}) => (
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
            <Text style={styles.top_view_2_value}> #{data?.quote?._id}</Text>
          </View>
          <View style={styles.top_view_2_container}>
            <Text style={{fontWeight:"extrabold",fontSize:'14px'}}> Date:</Text>
            <Text style={styles.top_view_2_value}> {new Date(data?.quote?.updatedAt)?.toLocaleDateString()}</Text>
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
          <Text style={{fontSize:'12px'}}>{data?.quote?.customerData?.name}</Text>
          <Text style={{fontSize:'12px'}}>{data?.quote?.customerData?.phone}</Text>
          <Text style={{fontSize:'12px'}}>{data?.quote?.customerData?.email}</Text>
          </View>
        </View>
        <View style={{flexGrow:1}}>
          <Text style={{padding:'5px 10px',backgroundColor:'#ccc',borderRadius:'5px',fontSize:'15px',fontWeight:'semibold'}}>Job Info</Text>
          <View style={{padding:'5px'}}>
          <Text style={{fontSize:'12px'}}>{data?.quote?.settings?.name ?? 'Custom'} Layout - Estimate</Text>
          <Text style={{fontSize:'12px'}}>{data?.quote?.label}</Text>
          </View>
        </View>
        <View style={{flexGrow:1}}>
          <Text style={{padding:'5px 10px',backgroundColor:'#ccc',borderRadius:'5px',fontSize:'15px',fontWeight:'semibold'}}>{data?.location?.name}</Text>
          <View style={{padding:'5px'}}>
          <Text style={{fontSize:'12px'}}>{data?.location?.street}</Text>
          <Text style={{fontSize:'12px'}}>{data?.location?.state}, {data?.location?.zipCode}</Text>
          <Text style={{fontSize:'12px'}}>{data?.location?.website}</Text>
          </View>
        </View>
      </View>
      {/** Section 3 */}
      <View style={{borderTop:'1px sloid #ccc',paddingTop:'10px'}}>
       <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
        <View>
           <Text style={{fontSize:'18px',fontWeight:'extrabold'}}>{data?.quote?.settings?.name ?? 'Custom'} Layout  - Estimate</Text>
           <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{fontSize:'14px'}}>Dimensions:</Text>
            <Text style={{fontSize:'12px'}}>{data?.quote?.measurements}</Text>
           </View>
           <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{fontSize:'14px'}}>Door Width:</Text>
            <Text style={{fontSize:'12px'}}>{data?.quote?.doorWidth}</Text>
           </View>
           <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{fontSize:'14px'}}>Square Foot:</Text>
            <Text style={{fontSize:'12px'}}>{data?.quote?.sqftArea}</Text>
           </View>
                  {/** undefined is used for custom layout  */}
                  {/* {![undefined].includes(data?.quote?.settings?.variant) && (
                    <Text style={{fontSize:'12px'}}>
                      Door Weight: {doorWeight}
                    </Text>
                  )}
                  {![
                    layoutVariants.DOOR,
                    layoutVariants.DOUBLEBARN,
                    layoutVariants.DOUBLEDOOR,
                  ].includes(selectedData?.settings?.variant) && (
                    <Typography>
                      <span style={{ fontWeight: "bold" }}>Panel Weight: </span>{" "}
                      {panelWeight}
                    </Typography>
                  )}
                  {[
                    layoutVariants.DOORNOTCHEDPANELANDRETURN,
                    layoutVariants.DOORPANELANDRETURN,
                  ].includes(selectedData?.settings?.variant) && (
                    <Typography>
                      <span style={{ fontWeight: "bold" }}>
                        Return Weight:{" "}
                      </span>{" "}
                      {returnWeight}
                    </Typography>
                  )} */}
        </View>
        <Text style={{fontSize:'18px'}}>Total: ${data?.quote?.cost?.toFixed(2) || 0}</Text>
       </View>
       <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:'10px',alignItems:'flex-start',gap:'10px'}}>
        <View style={{border:'1.5px solid #ccc',flexGrow:1,borderRadius:'5px',padding:'5px 10px'}}>
        <Text style={{fontSize:'18px',fontWeight:'extrabold',marginBottom:'2px'}}>Pricing Sub Categories:</Text>
          <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px',fontWeight:'bold'}}>Hardware Price:</Text>
          <Text style={{fontSize:'12px'}}>$ {data?.quote?.pricing?.hardwarePrice?.toFixed(2) || 0}</Text>
          </View>
          <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px',fontWeight:'bold'}}>Glass Price:</Text>
          <Text style={{fontSize:'12px'}}>$ {data?.quote?.pricing?.glassPrice?.toFixed(2) || 0}</Text>
          </View>
          <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px'}}>Glass Addons Price:</Text>
          <Text style={{fontSize:'12px'}}>$ {data?.quote?.pricing?.glassAddonsPrice?.toFixed(2) || 0}</Text>
          </View>
          <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px'}}>Fabrication Price:</Text>
          <Text style={{fontSize:'12px'}}>$ {data?.quote?.pricing?.fabricationPrice?.toFixed(2) || 0}</Text>
          </View>
          <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px'}}>Hardware Addons Price:</Text>
          <Text style={{fontSize:'12px'}}>$ {data?.quote?.pricing?.hardwareAddonsPrice?.toFixed(2) || 0}</Text>
          </View>
          <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px'}}>Labor Price:</Text>
          <Text style={{fontSize:'12px'}}>$ {data?.quote?.pricing?.laborPrice?.toFixed(2) || 0}</Text>
          </View>
          <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px'}}>Additional Fields Price:</Text>
          <Text style={{fontSize:'12px'}}>$ {data?.quote?.pricing?.additionalFieldsPrice?.toFixed(2) || 0}</Text>
          </View>
        </View>
        <View style={{border:'1.5px solid #ccc',flexGrow:1,borderRadius:'5px',padding:'5px 10px'}}>
        <Text style={{fontSize:'18px',fontWeight:'extrabold',marginBottom:'2px'}}>Gross Profit:</Text>
          <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px'}}>Gross Total:</Text>
          <Text style={{fontSize:'12px'}}>$ {data?.quote?.pricing?.total?.toFixed(2) || 0}</Text>
          </View>
          <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px'}}>Actual Cost:</Text>
          <Text style={{fontSize:'12px'}}>$ {data?.quote?.pricing?.cost?.toFixed(2) || 0}</Text>
          </View>
          <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px'}}>Profit:</Text>
          <Text style={{fontSize:'12px'}}>$ {data?.quote?.pricing?.profit?.toFixed(2) || 0} %</Text>
          </View>
        </View>
       </View>
       <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:'10px',alignItems:'flex-start',gap:'10px'}}>
       <Image style={styles.logo2} src={ data?.quote?.layout_id ? `${backendURL}/${data?.quote?.settings?.image}` : CustomImage} alt="logo" />
        <View style={{border:'1.5px solid #ccc',flexGrow:1,borderRadius:'5px',padding:'5px 10px'}}>
        <Text style={{fontSize:'18px',fontWeight:'extrabold',marginBottom:'2px'}}>Summary:</Text>
        {data?.quote?.hardwareFinishes?.name ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px'}}>Finish:</Text>
          <Text style={{fontSize:'12px'}}>{data?.quote?.hardwareFinishes?.name}</Text>
          </View> : ''}
        {data?.quote?.handles?.item ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px'}}>Handle:</Text>
          <Text style={{fontSize:'12px'}}>{data?.quote?.handles?.item?.name} - ({data?.quote?.handles?.count})</Text>
          </View> : ''}
        </View>
       </View>
      </View>
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
