import React, { useMemo, useState } from "react";
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
import { backendURL, estimateTotalWithCategory } from "../../utilities/common";
import { EstimateCategory } from "../../utilities/constants";
import {
  dimensionsSection,
  fabricationSection,
  pdfFields,
  pricingSection,
  summarySection,
} from "@/utilities/pdfConfigs";
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: "10px 20px",
    gap: 5,
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
    alignItems: "baseline",
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
const commaFn = (index, arrLength) => (index < arrLength - 1 ? ", " : "");

// Create Document Component
const LandingPDFFile = ({ controls, data }) => {
  const [loading, setLoading] = useState(true);
  const noOfEstimate = useMemo(()=>{
   const Estoimationdata = estimateTotalWithCategory(data?.quote ?? []);
   return Estoimationdata;
  },[data]);

  return (
    <Document
      onRender={() => {
        console.log("pdf rendered");
        setLoading(false);
      }}
    >
      {data?.quote?.length <= 0 && loading ? (
        "Loading..."
      ) : (
        <>
      <Page size="A4" style={styles.page} wrap>        
        {/** Section 1 */}
        <View style={styles.section_top}>
                <View style={styles.title_logo}>
                  <Image style={styles.logo} src={GCS_logo} alt="logo" />
                  <Text style={styles.title}> PRICE UP</Text>
                </View>
                <View style={styles.top_view_2}>
                  <View style={styles.top_view_2_container}>
                    <Text style={{fontWeight:"extrabold",fontSize:'14px'}}>Job ID:</Text>
                    <Text style={styles.top_view_2_value}>{data?.estimateData?.project_id}</Text>
                  </View>
                  <View style={styles.top_view_2_container}>
                    <Text style={{fontWeight:"extrabold",fontSize:'14px'}}> Date:</Text>
                    <Text style={styles.top_view_2_value}> {new Date(data?.estimateData?.createdAt)?.toLocaleDateString()}</Text>
                  </View>
                </View>
        </View>
        {/** Section 2 */}
        <View style={{display:'flex',flexDirection:'row',alignItems:'baseline',gap:'20px',width:'100%'}}>
                <View style={{flexGrow:0}}>
                  <Text style={{padding:'5px 10px',backgroundColor:'#ccc',borderRadius:'5px',fontSize:'15px',fontWeight:'semibold'}}>Customer</Text>
                  <View style={{padding:'5px'}}>
                  <Text style={{fontSize:'12px'}}>{data?.estimateData?.customer?.name}</Text>
                  <Text style={{fontSize:'12px'}}>{data?.estimateData?.customer?.phone}</Text>
                  <Text style={{fontSize:'12px'}}>{data?.estimateData?.customer?.email}</Text>
                  </View>
                </View>
                <View style={{flexGrow:1}}>
                  <Text style={{padding:'5px 10px',backgroundColor:'#ccc',borderRadius:'5px',fontSize:'15px',fontWeight:'semibold'}}>Job Info</Text>
                  <View style={{padding:'5px'}}>
                  {/* <Text style={{fontSize:'12px'}}>{item?.settings?.name ? item?.settings?.name : item?.category === EstimateCategory.MIRRORS ? 'Mirror' : 'Custom'} Layout - Estimate</Text> */}
                  <Text style={{fontSize:'12px'}}>{data?.estimateData?.project?.projectName ?? ''} - Project</Text>
                 {/* <Text style={{fontSize:'12px'}}>{item?.label}</Text> */}
                  </View>
                </View>
                <View style={{ width:'175px'}}>
                  <Text style={{padding:'5px 10px',backgroundColor:'#ccc',borderRadius:'5px',fontSize:'15px',fontWeight:'semibold'}}>{data?.location?.name}</Text>
                  <View style={{padding:'5px'}}>
                  <Text style={{fontSize:'12px'}}>{data?.location?.street}</Text>
                  <Text style={{fontSize:'12px'}}>{data?.location?.state}, {data?.location?.zipCode}</Text>
                  <Text style={{fontSize:'12px'}}>{data?.location?.website}</Text>
                  </View>
                </View>
        </View>
        <View style={{display:'flex',flexDirection:'row',justifyContent:'start',borderTop:'1px sloid #ccc',paddingTop:'10px'}}>
                <View style={{width:'100%'}} wrap>
                   <Text style={{fontSize:'18px',fontWeight:'extrabold', flexShrink: 1,flexWrap: 'wrap',width:'100%',textAlign:'center'}}>Overall Summary</Text>
                   {<View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}} wrap>
                    <Text style={{fontSize:'14px'}}>Total Estimates:</Text>
                    <Text style={{fontSize:'12px',wordWrap: "break-word",textAlign:'right'}} wrap>{noOfEstimate?.totalEstimate ?? 0}</Text>
                   </View>}
                   {<View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontSize:'14px'}}>Shower Estimates:</Text>
                    <Text style={{fontSize:'12px'}}>{noOfEstimate?.totalShowers?.length ?? 0}</Text>
                   </View>}
                   {<View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontSize:'14px'}}>Mirror Estimates:</Text>
                    <Text style={{fontSize:'12px'}}>{noOfEstimate?.totalMirrors.length ?? 0}</Text>
                   </View>}
                   {<View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontSize:'14px'}}>WineCaller Estimates:</Text>
                    <Text style={{fontSize:'12px'}}>{noOfEstimate?.totalWineCellar.length ?? 0}</Text>
                   </View>}
                   {<View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontSize:'14px'}}>Total Price:</Text>
                    <Text style={{fontSize:'12px'}}> ${noOfEstimate?.totalPrice?.toFixed(2) || 0}</Text>
                   </View>}
                </View>
              </View>

          {noOfEstimate?.totalShowers?.length > 0 && noOfEstimate?.totalShowers?.map((item, index) => {
            return (
             <>
              {/** Section 3 */}
              <View style={{borderTop: index === 0 ? '1px sloid #ccc': 'none',paddingTop:'10px'}}>
              <View wrap={false}>
              <Text style={{fontSize:'18px',fontWeight:'extrabold', flexShrink: 1,flexWrap: 'wrap',width:'100%',textAlign:'center',marginBottom:'10px'}}>Shower Estimate - {item?.settings?.name ? item?.settings?.name : item?.category === EstimateCategory.MIRRORS ? 'Mirror' : 'Custom'}</Text>
               <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                <View style={{width:'357px'}} wrap>
                   {dimensionsSection[item?.category]?.includes(pdfFields.MEASUREMENTS) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}} wrap>
                    <Text style={{fontSize:'14px'}}>Dimensions:</Text>
                    <Text style={{fontSize:'12px',wordWrap: "break-word",textAlign:'right',paddingLeft:'14px',width:'90%'}} wrap>{item?.measurements}</Text>
                   </View>}
                   {dimensionsSection[item?.category]?.includes(pdfFields.DOORWIDTH) && item?.doorWidth && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontSize:'14px'}}>Door Width:</Text>
                    <Text style={{fontSize:'12px'}}>{item?.doorWidth}</Text>
                   </View>}
                   {dimensionsSection[item?.category]?.includes(pdfFields.SQFTAREA) && item?.sqftArea && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontSize:'14px'}}>Square Foot:</Text>
                    <Text style={{fontSize:'12px'}}>{item?.sqftArea}</Text>
                   </View>}
                   {dimensionsSection[item?.category]?.includes(pdfFields.DOORWEIGHT) && item?.doorWeight && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontSize:'14px'}}>Door Weight:</Text>
                    <Text style={{fontSize:'12px'}}>{item?.doorWeight}</Text>
                   </View>}
                   {dimensionsSection[item?.category]?.includes(pdfFields.PANELWEIGHT) && item?.panelWeight && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontSize:'14px'}}>Panel Weight:</Text>
                    <Text style={{fontSize:'12px'}}>{item?.panelWeight}</Text>
                   </View>}
                   {dimensionsSection[item?.category]?.includes(pdfFields.RETURNWEIGHT) && item?.returnWeight && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontSize:'14px'}}>Return Weight:</Text>
                    <Text style={{fontSize:'12px'}}>{item?.returnWeight}</Text>
                   </View>}
                   {<View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontSize:'14px'}}>Total:</Text>
                    <Text style={{fontSize:'12px'}}> ${item?.cost?.toFixed(2) || 0}</Text>
                   </View>}
                          {/** undefined is used for custom layout  */}
                          {/* {![undefined].includes(item?.settings?.variant) && (
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
                {controls?.viewLayoutImage && <Image style={styles.logo2} src={ item?.layout_id ? `${backendURL}/${item?.settings?.image}` : CustomImage} alt="logo" />}
                {/* <Text style={{fontSize:'18px'}}>Total: ${item?.cost?.toFixed(2) || 0}</Text> */}
               </View>
               </View>
               <View wrap={false} style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:'10px', alignItems: 'stretch',gap:'10px'}}>
                {controls?.viewPricingSubCategory &&
                 <View style={{border:'1.5px solid #ccc',flexGrow:1,borderRadius:'5px',padding:'5px 10px',display: 'flex', flexDirection: 'column'}}>
                <Text style={{fontSize:'18px',fontWeight:'extrabold',marginBottom:'2px'}}>Pricing Sub Categories:</Text>
                  {pricingSection[item?.category]?.includes(pdfFields.HARDWAREPRICE) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px',fontWeight:'bold'}}>Hardware Price:</Text>
                  <Text style={{fontSize:'12px'}}>$ {item?.pricing?.hardwarePrice?.toFixed(2) || 0}</Text>
                  </View>}
                  {pricingSection[item?.category]?.includes(pdfFields.GLASSPRICE) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px',fontWeight:'bold'}}>Glass Price:</Text>
                  <Text style={{fontSize:'12px'}}>$ {item?.pricing?.glassPrice?.toFixed(2) || 0}</Text>
                  </View>}
                  {pricingSection[item?.category]?.includes(pdfFields.GLASSADDONSPRICE) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Glass Addons Price:</Text>
                  <Text style={{fontSize:'12px'}}>$ {item?.pricing?.glassAddonsPrice?.toFixed(2) || 0}</Text>
                  </View>}
                  {pricingSection[item?.category]?.includes(pdfFields.FABRICATIONPRICE) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Fabrication Price:</Text>
                  <Text style={{fontSize:'12px'}}>$ {item?.pricing?.fabricationPrice?.toFixed(2) || 0}</Text>
                  </View>}
                  {pricingSection[item?.category]?.includes(pdfFields.HARDWAREADDONSPRICE) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Hardware Addons Price:</Text>
                  <Text style={{fontSize:'12px'}}>$ {item?.pricing?.hardwareAddonsPrice?.toFixed(2) || 0}</Text>
                  </View>}
                  {item?.pdfSettings?.labor &&
                  <>
                  {pricingSection[item?.category]?.includes(pdfFields.LABORPRICE) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>{item?.category === EstimateCategory.WINECELLARS ? 'Layout Labor Price:' : 'Labor Price:' }</Text>
                  <Text style={{fontSize:'12px'}}>$ {item?.pricing?.laborPrice?.toFixed(2) || 0}</Text>
                  </View>}
                  {pricingSection[item?.category]?.includes(pdfFields.DOORLABORPRICE) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Door Labor Price:</Text>
                  <Text style={{fontSize:'12px'}}>$ {item?.pricing?.doorLaborPrice?.toFixed(2) || 0}</Text>
                  </View>}
                  </>
                  }        
                  {pricingSection[item?.category]?.includes(pdfFields.ADDITIONALFIELDSPRICE) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Additional Fields Price:</Text>
                  <Text style={{fontSize:'12px'}}>$ {item?.pricing?.additionalFieldPrice?.toFixed(2) || 0}</Text>
                  </View>}
                </View>}
                {controls?.viewGrossProfit && 
                <View style={{border:'1.5px solid #ccc',flexGrow:1,borderRadius:'5px',padding:'5px 10px',display: 'flex', flexDirection: 'column'}}>
                <Text style={{fontSize:'18px',fontWeight:'extrabold',marginBottom:'2px'}}>Gross {item?.pdfSettings?.profit ? 'Profit' : 'Total'}:</Text>
                  <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Gross Total:</Text>
                  <Text style={{fontSize:'12px'}}>$ {item?.pricing?.total?.toFixed(2) || 0}</Text>
                  </View>
                  {item?.pdfSettings?.cost && 
                   <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                   <Text style={{fontSize:'14px'}}>Actual Cost:</Text>
                   <Text style={{fontSize:'12px'}}>$ {item?.pricing?.cost?.toFixed(2) || 0}</Text>
                   </View> }   
                  {item?.pdfSettings?.profit && 
                   <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                   <Text style={{fontSize:'14px'}}>Profit:</Text>
                   <Text style={{fontSize:'12px'}}>{item?.pricing?.profit?.toFixed(2) || 0} %</Text>
                   </View>}           
                </View>
                }
               </View>
               <View wrap={false} style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:'10px',alignItems:'flex-start',gap:'10px'}}>
             
                {controls?.viewSummary && 
                <View style={{border:'1.5px solid #ccc',flexGrow:1,borderRadius:'5px',padding:'5px 10px'}}>
                <Text style={{fontSize:'18px',fontWeight:'extrabold',marginBottom:'2px'}}>Summary:</Text>
                {summarySection[item?.category]?.includes(pdfFields.HARDWAREFINISHES) && item?.hardwareFinishes && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Finish:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.hardwareFinishes?.name}</Text>
                  </View>}
                {summarySection[item?.category]?.includes(pdfFields.HANDLES) && item?.handles?.item && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Handles:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.handles?.item?.name} - ({item?.handles?.count})</Text>
                  </View>}
                {summarySection[item?.category]?.includes(pdfFields.DOORLOCK) && item?.doorLock?.item && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Door Lock:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.doorLock?.item?.name} - ({item?.doorLock?.count})</Text>
                  </View>}
                {summarySection[item?.category]?.includes(pdfFields.HINGES) && item?.hinges?.item &&  <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Hinges:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.hinges?.item?.name} - ({item?.hinges?.count})</Text>
                  </View>}
                  {["channel"].includes(item?.mountingState) ?
                <View>
                {summarySection[item?.category]?.includes(pdfFields.MOUNTINGCHANNEL) && item?.mountingChannel?.item && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                 <Text style={{fontSize:'14px'}}>Channel:</Text>
                 <Text style={{fontSize:'12px'}}>{item?.mountingChannel?.item?.name}</Text>
                 </View>}
                 </View> : <View>
                  {summarySection[item?.category]?.includes(pdfFields.WALLCLAMP) && item?.mountingClamps?.wallClamp?.length ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                 <Text style={{fontSize:'14px'}}>WallClamps:</Text>
                 <Text style={{fontSize:'12px'}}>
                  {item?.mountingClamps?.wallClamp?.map((row, index) => (
                  `${row.item.name} (${row.count})${commaFn(index, item.mountingClamps.wallClamp.length)}`
                   ))}
                 </Text>
                 </View> : ''}
                 {summarySection[item?.category]?.includes(pdfFields.SLEEVEOVER) && item?.mountingClamps?.sleeveOver?.length ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                 <Text style={{fontSize:'14px'}}>Sleeve Over:</Text>
                 <Text style={{fontSize:'12px'}}>
                  {item?.mountingClamps?.sleeveOver?.map(
                     (row,index) => (`${row.item.name} (${row.count})${commaFn(index, item?.mountingClamps?.sleeveOver.length)}`))}
                 </Text>
                 </View> : ''}
                 {summarySection[item?.category]?.includes(pdfFields.GLASSTOGLASS) && item?.mountingClamps?.glassToGlass?.length ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                 <Text style={{fontSize:'14px'}}>Glass To Glass:</Text>
                 <Text style={{fontSize:'12px'}}>
                  {item?.mountingClamps?.glassToGlass?.map(
                     (row,index) => (`${row.item.name} (${row.count})${commaFn(index, item?.mountingClamps?.glassToGlass.length)}`))}
                 </Text>
                 </View> : ''}
                
                  </View>}
                  {summarySection[item?.category]?.includes(pdfFields.CORNERWALLCLAMP) && item?.cornerClamps?.cornerWallClamp?.length ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                 <Text style={{fontSize:'14px'}}>Corner WallClamp:</Text>
                 <Text style={{fontSize:'12px'}}>
                  {item?.cornerClamps?.cornerWallClamp?.map(
                     (row,index) => (`${row.item.name} (${row.count})${commaFn(index, item?.cornerClamps?.cornerWallClamp.length)}`))}
                 </Text>
                 </View> : ''}
                 {summarySection[item?.category]?.includes(pdfFields.CORNERSLEEVEOVER) && item?.cornerClamps?.cornerSleeveOver?.length ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                 <Text style={{fontSize:'14px'}}>Corner Sleeve Over:</Text>
                 <Text style={{fontSize:'12px'}}>
                  {item?.cornerClamps?.cornerSleeveOver?.map(
                     (row,index) => (`${row.item.name} (${row.count})${commaFn(index, item?.cornerClamps?.cornerSleeveOver.length)}`))}
                 </Text>
                 </View> : ''}
                 {summarySection[item?.category]?.includes(pdfFields.CORNERGLASSTOGLASS) && item?.cornerClamps?.cornerGlassToGlass?.length ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                 <Text style={{fontSize:'14px'}}>Corner Glass To Glass:</Text>
                 <Text style={{fontSize:'12px'}}>
                  {item?.cornerClamps?.cornerGlassToGlass?.map(
                     (row,index) => (`${row.item.name} (${row.count})${commaFn(index, item?.cornerClamps?.cornerGlassToGlass.length)}`))}
                 </Text>
                 </View> : ''}
        
                {summarySection[item?.category]?.includes(pdfFields.GLASSTYPE) && item?.glassType?.item ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Glass Type:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.glassType?.item?.name} - ({item?.glassType?.thickness})</Text>
                  </View> : ''}
                {summarySection[item?.category]?.includes(pdfFields.EDGEWORK) && item?.edgeWork?.item ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Edge Work:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.edgeWork?.item?.name} - ({item?.edgeWork?.thickness})</Text>
                </View> : ''}
                {summarySection[item?.category]?.includes(pdfFields.SLIDINGDOORSYSTEM) && item?.slidingDoorSystem?.item ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Sliding Door System:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.slidingDoorSystem?.item?.name} - ({item?.slidingDoorSystem?.count})</Text>
                  </View> : ''}
                {summarySection[item?.category]?.includes(pdfFields.HEADER) && item?.header?.item ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Header:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.header?.item?.name} - ({item?.header?.count})</Text>
                  </View> : ''}
                {summarySection[item?.category]?.includes(pdfFields.GLASSADDONS) && item?.glassAddons?.length ? (
                  <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontSize:'14px'}}>Glass Addons:</Text>
                    <Text style={{fontSize:'12px'}}>
                    {item?.glassAddons?.map((item,index) => (`${item?.name}${commaFn(index, item?.glassAddons?.length)}`))}
                    </Text>
                  </View>
                  ) : (
                    ""
                  )}
                  {summarySection[item?.category]?.includes(pdfFields.HARDWARES) && item?.hardwares?.length ? (
                  <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontSize:'14px',flexShrink: 0}}>Hardwares:</Text>
                    <Text style={{fontSize:'12px',flexGrow: 1, wordWrap: 'break-word', whiteSpace: 'pre-wrap',width:'79%',paddingLeft:'12px'}}>
                    {item?.hardwares?.map((record,index) => (`${record?.item?.name} - (${record?.count})${commaFn(index, item?.hardwares?.length)}`))}
                    </Text>
                  </View>
                  ) : (
                    ""
                  )}
                  {summarySection[item?.category]?.includes(pdfFields.HARDWAREADDONS) && item?.hardwareAddons?.length ? (
                  <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontSize:'14px'}}>Hardware Addons:</Text>
                    {item?.hardwareAddons?.map((record,index) => (
                      <Text style={{fontSize:'12px'}}>{`${record?.item?.name} - (${record?.count})${commaFn(index, item?.hardwareAddons?.length)} `}</Text>))}
                  </View>
                  ) : (
                    ""
                  )}
                  {item?.pdfSettings?.people && 
                  <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>People:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.people}</Text>
                  </View>}
                  
                  {item?.pdfSettings?.hours && 
                  <>
                  <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>{item?.category === EstimateCategory.WINECELLARS ? 'Hours for layout:' : 'Hours'}</Text>
                  <Text style={{fontSize:'12px'}}>{item?.hours}</Text>
                  </View>
                  {pricingSection[item?.category]?.includes(pdfFields.DOORLABORPRICE) &&
                  <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Hours for door:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.laborHoursForDoor ?? 0}</Text>
                  </View>
                  }  
                  </>}
                        
                </View>}
               </View>
               <View wrap={false} style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:'10px',alignItems:'stretch',gap:'10px'}}>
               {controls?.viewFabrication && 
               <View style={{border:'1.5px solid #ccc',flexGrow:1,borderRadius:'5px',padding:'5px 10px',display:'flex',flexDirection:'column'}}>
                <Text style={{fontSize:'18px',fontWeight:'extrabold',marginBottom:'2px'}}>Fabrication:</Text>
                  {fabricationSection[item?.category]?.includes(pdfFields.ONEINCHHOLES) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>1" Holes:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.oneInchHoles ?? 0}</Text>
                  </View>}
                  {fabricationSection[item?.category]?.includes(pdfFields.HINGECUT) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Hinge Cut Out:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.hingeCut ?? 0}</Text>
                  </View>}
                  {fabricationSection[item?.category]?.includes(pdfFields.ClAMPCUT) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Clamp Cut:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.clampCut ?? 0}</Text>
                  </View>}
                  {fabricationSection[item?.category]?.includes(pdfFields.NOTCH) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Notch:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.notch ?? 0}</Text>
                  </View>}
                  {fabricationSection[item?.category]?.includes(pdfFields.OUTAGES) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Outages:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.outages ?? 0}</Text>
                  </View>}
                  {fabricationSection[item?.category]?.includes(pdfFields.MITRE) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Mitre:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.mitre ?? 0}</Text>
                  </View>}
                  {fabricationSection[item?.category]?.includes(pdfFields.POLISH) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Polish:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.polish ?? 0}</Text>
                  </View>}
                  {fabricationSection[item?.category]?.includes(pdfFields.SIMPLEHOLES) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Holes:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.simpleHoles ?? 0}</Text>
                  </View>}
                  {fabricationSection[item?.category]?.includes(pdfFields.LIGHTHOLES) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Light Holes:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.lightHoles ?? 0}</Text>
                  </View>}
                  {fabricationSection[item?.category]?.includes(pdfFields.SINGLEOUTLETCUTOUT) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Single Outlet Cutout:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.singleOutletCutout ?? 0}</Text>
                  </View>}
                  {fabricationSection[item?.category]?.includes(pdfFields.DOUBLEOUTLETCUTOUT) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Double Outlet Cutout:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.doubleOutletCutout ?? 0}</Text>
                  </View>}
                  {fabricationSection[item?.category]?.includes(pdfFields.TRIPLEOUTLETCUTOUT) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Triple Outlet Cutout:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.tripleOutletCutout ?? 0}</Text>
                  </View>}
                  {fabricationSection[item?.category]?.includes(pdfFields.QUADOUTLETCUTOUT) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Quad Outlet Cutout:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.quadOutletCutout ?? 0}</Text>
                  </View>}
                </View>}
                {controls?.viewAdditionalFields &&
                 <View style={{border:'1.5px solid #ccc',flexGrow:1,borderRadius:'5px',padding:'5px 10px',display:'flex',flexDirection:'column'}}>
                <Text style={{fontSize:'18px',fontWeight:'extrabold',marginBottom:'2px'}}>Additional Fields:</Text>
                  {item?.additionalFields?.map(
                    (item) => 
                      item.label !== "" && (
                        <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                          <Text style={{fontSize:'14px'}}>{item.label}:</Text>
                          <Text style={{fontSize:'12px'}}>{item.cost}</Text>
                        </View>
                      )
                  )}
                </View>}
               </View>
              </View>
             {data?.estimateData?.signature || data?.estimateData?.customerName  &&
            <View  wrap={false} style={{display:'flex',flexDirection:'row',justifyContent:'flex-end', width: '100%' }}>
             <View style={{ paddingTop: '10px', width: '150px', height: '150px' }}>
             {data?.estimateData?.signature && <Image style={styles.logo2} textAlign='center' src={`${backendURL}/${data?.estimateData?.signature}`} alt="logo" />} 
             {data?.estimateData?.customerName && <Text style={{ paddingTop: '6px', borderTop: '1px solid #ccc',textAlign:'center' }}>{data?.estimateData?.customerName}</Text>} 
              <Text style={{ paddingTop: '6px', borderTop: '1px solid #ccc',textAlign:'center' }}>Signature</Text>
            </View>
          </View>         
              }               
              {/** Pagination */}
              <View style={{borderTop:'1px solid #ccc',position:'absolute',bottom:'10px',left:'20px',right:'20px',padding:'5px'}} fixed>
              <Text style={{fontSize:'13px'}} render={({ pageNumber, totalPages }) => (
                `Page ${pageNumber} / ${totalPages}`
              )} />
              </View>
              </>
            );
          })}
          {noOfEstimate?.totalMirrors?.length > 0 && noOfEstimate?.totalMirrors?.map((item, index) => {
            return (
             <>
              {/** Section 3 */}
              <View style={{paddingTop:'10px'}}>
              <View wrap={false}>
               <Text style={{fontSize:'18px',fontWeight:'extrabold', flexShrink: 1,flexWrap: 'wrap',width:'100%',textAlign:'center',marginBottom:'10px'}}>Mirror Estimate - Custom</Text>
               <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                <View style={{width:'357px'}} wrap>
                   {dimensionsSection[item?.category]?.includes(pdfFields.MEASUREMENTS) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}} wrap>
                    <Text style={{fontSize:'14px'}}>Dimensions:</Text>
                    <Text style={{fontSize:'12px',wordWrap: "break-word",textAlign:'right',paddingLeft:'14px',width:'90%'}} wrap>{item?.measurements}</Text>
                   </View>}
                   {dimensionsSection[item?.category]?.includes(pdfFields.DOORWIDTH) && item?.doorWidth && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontSize:'14px'}}>Door Width:</Text>
                    <Text style={{fontSize:'12px'}}>{item?.doorWidth}</Text>
                   </View>}
                   {dimensionsSection[item?.category]?.includes(pdfFields.SQFTAREA) && item?.sqftArea && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontSize:'14px'}}>Square Foot:</Text>
                    <Text style={{fontSize:'12px'}}>{item?.sqftArea}</Text>
                   </View>}
                   {dimensionsSection[item?.category]?.includes(pdfFields.DOORWEIGHT) && item?.doorWeight && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontSize:'14px'}}>Door Weight:</Text>
                    <Text style={{fontSize:'12px'}}>{item?.doorWeight}</Text>
                   </View>}
                   {dimensionsSection[item?.category]?.includes(pdfFields.PANELWEIGHT) && item?.panelWeight && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontSize:'14px'}}>Panel Weight:</Text>
                    <Text style={{fontSize:'12px'}}>{item?.panelWeight}</Text>
                   </View>}
                   {dimensionsSection[item?.category]?.includes(pdfFields.RETURNWEIGHT) && item?.returnWeight && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontSize:'14px'}}>Return Weight:</Text>
                    <Text style={{fontSize:'12px'}}>{item?.returnWeight}</Text>
                   </View>}
                   {<View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontSize:'14px'}}>Total:</Text>
                    <Text style={{fontSize:'12px'}}> ${item?.cost?.toFixed(2) || 0}</Text>
                   </View>}
                </View>
                {controls?.viewLayoutImage && <Image style={styles.logo2} src={ item?.layout_id ? `${backendURL}/${item?.settings?.image}` : CustomImage} alt="logo" />}
               </View>
              </View>
               <View wrap={false} style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:'10px', alignItems: 'stretch',gap:'10px'}}>
                {controls?.viewPricingSubCategory &&
                 <View style={{border:'1.5px solid #ccc',flexGrow:1,borderRadius:'5px',padding:'5px 10px',display: 'flex', flexDirection: 'column'}}>
                <Text style={{fontSize:'18px',fontWeight:'extrabold',marginBottom:'2px'}}>Pricing Sub Categories:</Text>
                  {pricingSection[item?.category]?.includes(pdfFields.HARDWAREPRICE) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px',fontWeight:'bold'}}>Hardware Price:</Text>
                  <Text style={{fontSize:'12px'}}>$ {item?.pricing?.hardwarePrice?.toFixed(2) || 0}</Text>
                  </View>}
                  {pricingSection[item?.category]?.includes(pdfFields.GLASSPRICE) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px',fontWeight:'bold'}}>Glass Price:</Text>
                  <Text style={{fontSize:'12px'}}>$ {item?.pricing?.glassPrice?.toFixed(2) || 0}</Text>
                  </View>}
                  {pricingSection[item?.category]?.includes(pdfFields.GLASSADDONSPRICE) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Glass Addons Price:</Text>
                  <Text style={{fontSize:'12px'}}>$ {item?.pricing?.glassAddonsPrice?.toFixed(2) || 0}</Text>
                  </View>}
                  {pricingSection[item?.category]?.includes(pdfFields.FABRICATIONPRICE) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Fabrication Price:</Text>
                  <Text style={{fontSize:'12px'}}>$ {item?.pricing?.fabricationPrice?.toFixed(2) || 0}</Text>
                  </View>}
                  {pricingSection[item?.category]?.includes(pdfFields.HARDWAREADDONSPRICE) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Hardware Addons Price:</Text>
                  <Text style={{fontSize:'12px'}}>$ {item?.pricing?.hardwareAddonsPrice?.toFixed(2) || 0}</Text>
                  </View>}
                  {item?.pdfSettings?.labor &&
                  <>
                  {pricingSection[item?.category]?.includes(pdfFields.LABORPRICE) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>{item?.category === EstimateCategory.WINECELLARS ? 'Layout Labor Price:' : 'Labor Price:' }</Text>
                  <Text style={{fontSize:'12px'}}>$ {item?.pricing?.laborPrice?.toFixed(2) || 0}</Text>
                  </View>}
                  {pricingSection[item?.category]?.includes(pdfFields.DOORLABORPRICE) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Door Labor Price:</Text>
                  <Text style={{fontSize:'12px'}}>$ {item?.pricing?.doorLaborPrice?.toFixed(2) || 0}</Text>
                  </View>}
                  </>
                  }        
                  {pricingSection[item?.category]?.includes(pdfFields.ADDITIONALFIELDSPRICE) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Additional Fields Price:</Text>
                  <Text style={{fontSize:'12px'}}>$ {item?.pricing?.additionalFieldPrice?.toFixed(2) || 0}</Text>
                  </View>}
                </View>}
                {controls?.viewGrossProfit && 
                <View style={{border:'1.5px solid #ccc',flexGrow:1,borderRadius:'5px',padding:'5px 10px',display: 'flex', flexDirection: 'column'}}>
                <Text style={{fontSize:'18px',fontWeight:'extrabold',marginBottom:'2px'}}>Gross {item?.pdfSettings?.profit ? 'Profit' : 'Total'}:</Text>
                  <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Gross Total:</Text>
                  <Text style={{fontSize:'12px'}}>$ {item?.pricing?.total?.toFixed(2) || 0}</Text>
                  </View>
                  {item?.pdfSettings?.cost && 
                   <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                   <Text style={{fontSize:'14px'}}>Actual Cost:</Text>
                   <Text style={{fontSize:'12px'}}>$ {item?.pricing?.cost?.toFixed(2) || 0}</Text>
                   </View> }   
                  {item?.pdfSettings?.profit && 
                   <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                   <Text style={{fontSize:'14px'}}>Profit:</Text>
                   <Text style={{fontSize:'12px'}}>{item?.pricing?.profit?.toFixed(2) || 0} %</Text>
                   </View>}           
                </View>
                }
               </View>
               <View wrap={false} style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:'10px',alignItems:'flex-start',gap:'10px'}}>
             
                {controls?.viewSummary && 
                <View style={{border:'1.5px solid #ccc',flexGrow:1,borderRadius:'5px',padding:'5px 10px'}}>
                <Text style={{fontSize:'18px',fontWeight:'extrabold',marginBottom:'2px'}}>Summary:</Text>
                {summarySection[item?.category]?.includes(pdfFields.HARDWAREFINISHES) && item?.hardwareFinishes && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Finish:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.hardwareFinishes?.name}</Text>
                  </View>}
                {summarySection[item?.category]?.includes(pdfFields.HANDLES) && item?.handles?.item && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Handles:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.handles?.item?.name} - ({item?.handles?.count})</Text>
                  </View>}
                {summarySection[item?.category]?.includes(pdfFields.DOORLOCK) && item?.doorLock?.item && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Door Lock:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.doorLock?.item?.name} - ({item?.doorLock?.count})</Text>
                  </View>}
                {summarySection[item?.category]?.includes(pdfFields.HINGES) && item?.hinges?.item &&  <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Hinges:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.hinges?.item?.name} - ({item?.hinges?.count})</Text>
                  </View>}
                  {["channel"].includes(item?.mountingState) ?
                <View>
                {summarySection[item?.category]?.includes(pdfFields.MOUNTINGCHANNEL) && item?.mountingChannel?.item && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                 <Text style={{fontSize:'14px'}}>Channel:</Text>
                 <Text style={{fontSize:'12px'}}>{item?.mountingChannel?.item?.name}</Text>
                 </View>}
                 </View> : <View>
                  {summarySection[item?.category]?.includes(pdfFields.WALLCLAMP) && item?.mountingClamps?.wallClamp?.length ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                 <Text style={{fontSize:'14px'}}>WallClamps:</Text>
                 <Text style={{fontSize:'12px'}}>
                  {item?.mountingClamps?.wallClamp?.map((row, index) => (
                  `${row.item.name} (${row.count})${commaFn(index, item.mountingClamps.wallClamp.length)}`
                   ))}
                 </Text>
                 </View> : ''}
                 {summarySection[item?.category]?.includes(pdfFields.SLEEVEOVER) && item?.mountingClamps?.sleeveOver?.length ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                 <Text style={{fontSize:'14px'}}>Sleeve Over:</Text>
                 <Text style={{fontSize:'12px'}}>
                  {item?.mountingClamps?.sleeveOver?.map(
                     (row,index) => (`${row.item.name} (${row.count})${commaFn(index, item?.mountingClamps?.sleeveOver.length)}`))}
                 </Text>
                 </View> : ''}
                 {summarySection[item?.category]?.includes(pdfFields.GLASSTOGLASS) && item?.mountingClamps?.glassToGlass?.length ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                 <Text style={{fontSize:'14px'}}>Glass To Glass:</Text>
                 <Text style={{fontSize:'12px'}}>
                  {item?.mountingClamps?.glassToGlass?.map(
                     (row,index) => (`${row.item.name} (${row.count})${commaFn(index, item?.mountingClamps?.glassToGlass.length)}`))}
                 </Text>
                 </View> : ''}
                
                  </View>}
                  {summarySection[item?.category]?.includes(pdfFields.CORNERWALLCLAMP) && item?.cornerClamps?.cornerWallClamp?.length ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                 <Text style={{fontSize:'14px'}}>Corner WallClamp:</Text>
                 <Text style={{fontSize:'12px'}}>
                  {item?.cornerClamps?.cornerWallClamp?.map(
                     (row,index) => (`${row.item.name} (${row.count})${commaFn(index, item?.cornerClamps?.cornerWallClamp.length)}`))}
                 </Text>
                 </View> : ''}
                 {summarySection[item?.category]?.includes(pdfFields.CORNERSLEEVEOVER) && item?.cornerClamps?.cornerSleeveOver?.length ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                 <Text style={{fontSize:'14px'}}>Corner Sleeve Over:</Text>
                 <Text style={{fontSize:'12px'}}>
                  {item?.cornerClamps?.cornerSleeveOver?.map(
                     (row,index) => (`${row.item.name} (${row.count})${commaFn(index, item?.cornerClamps?.cornerSleeveOver.length)}`))}
                 </Text>
                 </View> : ''}
                 {summarySection[item?.category]?.includes(pdfFields.CORNERGLASSTOGLASS) && item?.cornerClamps?.cornerGlassToGlass?.length ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                 <Text style={{fontSize:'14px'}}>Corner Glass To Glass:</Text>
                 <Text style={{fontSize:'12px'}}>
                  {item?.cornerClamps?.cornerGlassToGlass?.map(
                     (row,index) => (`${row.item.name} (${row.count})${commaFn(index, item?.cornerClamps?.cornerGlassToGlass.length)}`))}
                 </Text>
                 </View> : ''}
        
                {summarySection[item?.category]?.includes(pdfFields.GLASSTYPE) && item?.glassType?.item ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Glass Type:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.glassType?.item?.name} - ({item?.glassType?.thickness})</Text>
                  </View> : ''}
                {summarySection[item?.category]?.includes(pdfFields.EDGEWORK) && item?.edgeWork?.item ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Edge Work:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.edgeWork?.item?.name} - ({item?.edgeWork?.thickness})</Text>
                </View> : ''}
                {summarySection[item?.category]?.includes(pdfFields.SLIDINGDOORSYSTEM) && item?.slidingDoorSystem?.item ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Sliding Door System:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.slidingDoorSystem?.item?.name} - ({item?.slidingDoorSystem?.count})</Text>
                  </View> : ''}
                {summarySection[item?.category]?.includes(pdfFields.HEADER) && item?.header?.item ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Header:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.header?.item?.name} - ({item?.header?.count})</Text>
                  </View> : ''}
                {summarySection[item?.category]?.includes(pdfFields.GLASSADDONS) && item?.glassAddons?.length ? (
                  <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontSize:'14px'}}>Glass Addons:</Text>
                    <Text style={{fontSize:'12px'}}>
                    {item?.glassAddons?.map((item,index) => (`${item?.name}${commaFn(index, item?.glassAddons?.length)}`))}
                    </Text>
                  </View>
                  ) : (
                    ""
                  )}
                  {summarySection[item?.category]?.includes(pdfFields.HARDWARES) && item?.hardwares?.length ? (
                  <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontSize:'14px',flexShrink: 0}}>Hardwares:</Text>
                    <Text style={{fontSize:'12px',flexGrow: 1, wordWrap: 'break-word', whiteSpace: 'pre-wrap',width:'79%',paddingLeft:'12px'}}>
                    {item?.hardwares?.map((record,index) => (`${record?.item?.name} - (${record?.count})${commaFn(index, item?.hardwares?.length)}`))}
                    </Text>
                  </View>
                  ) : (
                    ""
                  )}
                  {summarySection[item?.category]?.includes(pdfFields.HARDWAREADDONS) && item?.hardwareAddons?.length ? (
                  <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontSize:'14px'}}>Hardware Addons:</Text>
                    {item?.hardwareAddons?.map((record,index) => (
                      <Text style={{fontSize:'12px'}}>{`${record?.item?.name} - (${record?.count})${commaFn(index, item?.hardwareAddons?.length)} `}</Text>))}
                  </View>
                  ) : (
                    ""
                  )}
                  {item?.pdfSettings?.people && 
                  <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>People:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.people}</Text>
                  </View>}
                  
                  {item?.pdfSettings?.hours && 
                  <>
                  <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>{item?.category === EstimateCategory.WINECELLARS ? 'Hours for layout:' : 'Hours'}</Text>
                  <Text style={{fontSize:'12px'}}>{item?.hours}</Text>
                  </View>
                  {pricingSection[item?.category]?.includes(pdfFields.DOORLABORPRICE) &&
                  <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Hours for door:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.laborHoursForDoor ?? 0}</Text>
                  </View>
                  }  
                  </>}
                        
                </View>}
               </View>
               <View wrap={false} style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:'10px',alignItems:'stretch',gap:'10px'}}>
               {controls?.viewFabrication && 
               <View style={{border:'1.5px solid #ccc',flexGrow:1,borderRadius:'5px',padding:'5px 10px',display:'flex',flexDirection:'column'}}>
                <Text style={{fontSize:'18px',fontWeight:'extrabold',marginBottom:'2px'}}>Fabrication:</Text>
                  {fabricationSection[item?.category]?.includes(pdfFields.ONEINCHHOLES) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>1" Holes:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.oneInchHoles ?? 0}</Text>
                  </View>}
                  {fabricationSection[item?.category]?.includes(pdfFields.HINGECUT) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Hinge Cut Out:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.hingeCut ?? 0}</Text>
                  </View>}
                  {fabricationSection[item?.category]?.includes(pdfFields.ClAMPCUT) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Clamp Cut:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.clampCut ?? 0}</Text>
                  </View>}
                  {fabricationSection[item?.category]?.includes(pdfFields.NOTCH) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Notch:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.notch ?? 0}</Text>
                  </View>}
                  {fabricationSection[item?.category]?.includes(pdfFields.OUTAGES) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Outages:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.outages ?? 0}</Text>
                  </View>}
                  {fabricationSection[item?.category]?.includes(pdfFields.MITRE) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Mitre:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.mitre ?? 0}</Text>
                  </View>}
                  {fabricationSection[item?.category]?.includes(pdfFields.POLISH) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Polish:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.polish ?? 0}</Text>
                  </View>}
                  {fabricationSection[item?.category]?.includes(pdfFields.SIMPLEHOLES) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Holes:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.simpleHoles ?? 0}</Text>
                  </View>}
                  {fabricationSection[item?.category]?.includes(pdfFields.LIGHTHOLES) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Light Holes:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.lightHoles ?? 0}</Text>
                  </View>}
                  {fabricationSection[item?.category]?.includes(pdfFields.SINGLEOUTLETCUTOUT) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Single Outlet Cutout:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.singleOutletCutout ?? 0}</Text>
                  </View>}
                  {fabricationSection[item?.category]?.includes(pdfFields.DOUBLEOUTLETCUTOUT) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Double Outlet Cutout:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.doubleOutletCutout ?? 0}</Text>
                  </View>}
                  {fabricationSection[item?.category]?.includes(pdfFields.TRIPLEOUTLETCUTOUT) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Triple Outlet Cutout:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.tripleOutletCutout ?? 0}</Text>
                  </View>}
                  {fabricationSection[item?.category]?.includes(pdfFields.QUADOUTLETCUTOUT) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Quad Outlet Cutout:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.quadOutletCutout ?? 0}</Text>
                  </View>}
                </View>}
                {controls?.viewAdditionalFields &&
                 <View style={{border:'1.5px solid #ccc',flexGrow:1,borderRadius:'5px',padding:'5px 10px',display:'flex',flexDirection:'column'}}>
                <Text style={{fontSize:'18px',fontWeight:'extrabold',marginBottom:'2px'}}>Additional Fields:</Text>
                  {item?.additionalFields?.map(
                    (item) => 
                      item.label !== "" && (
                        <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                          <Text style={{fontSize:'14px'}}>{item.label}:</Text>
                          <Text style={{fontSize:'12px'}}>{item.cost}</Text>
                        </View>
                      )
                  )}
                </View>}
               </View>
              </View>
             {data?.estimateData?.signature || data?.estimateData?.customerName  &&
            <View  wrap={false} style={{display:'flex',flexDirection:'row',justifyContent:'flex-end', width: '100%' }}>
             <View style={{ paddingTop: '10px', width: '150px', height: '150px' }}>
             {data?.estimateData?.signature && <Image style={styles.logo2} textAlign='center' src={`${backendURL}/${data?.estimateData?.signature}`} alt="logo" />} 
             {data?.estimateData?.customerName && <Text style={{ paddingTop: '6px', borderTop: '1px solid #ccc',textAlign:'center' }}>{data?.estimateData?.customerName}</Text>} 
              <Text style={{ paddingTop: '6px', borderTop: '1px solid #ccc',textAlign:'center' }}>Signature</Text>
            </View>
          </View>         
              }               
              {/** Pagination */}
              <View style={{borderTop:'1px solid #ccc',position:'absolute',bottom:'10px',left:'20px',right:'20px',padding:'5px'}} fixed>
              <Text style={{fontSize:'13px'}} render={({ pageNumber, totalPages }) => (
                `Page ${pageNumber} / ${totalPages}`
              )} />
              </View>
              </>
            );
          })}
          {noOfEstimate?.totalWineCellar?.length > 0 && noOfEstimate?.totalWineCellar?.map((item, index) => {
            return (
             <>
              {/** Section 3 */}
              <View style={{paddingTop:'10px'}}>
              <View  wrap={false} >
              <Text style={{fontSize:'18px',fontWeight:'extrabold', flexShrink: 1,flexWrap: 'wrap',width:'100%',textAlign:'center',marginBottom:'10px'}}>WineCaller Estimate - {item?.settings?.name ? item?.settings?.name : item?.category === EstimateCategory.MIRRORS ? 'Mirror' : 'Custom'}</Text>
               <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                <View style={{width:'357px'}} wrap>
                   {dimensionsSection[item?.category]?.includes(pdfFields.MEASUREMENTS) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}} wrap>
                    <Text style={{fontSize:'14px'}}>Dimensions:</Text>
                    <Text style={{fontSize:'12px',wordWrap: "break-word",textAlign:'right',paddingLeft:'14px',width:'90%'}} wrap>{item?.measurements}</Text>
                   </View>}
                   {dimensionsSection[item?.category]?.includes(pdfFields.DOORWIDTH) && item?.doorWidth && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontSize:'14px'}}>Door Width:</Text>
                    <Text style={{fontSize:'12px'}}>{item?.doorWidth}</Text>
                   </View>}
                   {dimensionsSection[item?.category]?.includes(pdfFields.SQFTAREA) && item?.sqftArea && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontSize:'14px'}}>Square Foot:</Text>
                    <Text style={{fontSize:'12px'}}>{item?.sqftArea}</Text>
                   </View>}
                   {dimensionsSection[item?.category]?.includes(pdfFields.DOORWEIGHT) && item?.doorWeight && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontSize:'14px'}}>Door Weight:</Text>
                    <Text style={{fontSize:'12px'}}>{item?.doorWeight}</Text>
                   </View>}
                   {dimensionsSection[item?.category]?.includes(pdfFields.PANELWEIGHT) && item?.panelWeight && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontSize:'14px'}}>Panel Weight:</Text>
                    <Text style={{fontSize:'12px'}}>{item?.panelWeight}</Text>
                   </View>}
                   {dimensionsSection[item?.category]?.includes(pdfFields.RETURNWEIGHT) && item?.returnWeight && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontSize:'14px'}}>Return Weight:</Text>
                    <Text style={{fontSize:'12px'}}>{item?.returnWeight}</Text>
                   </View>}
                   {<View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontSize:'14px'}}>Total:</Text>
                    <Text style={{fontSize:'12px'}}> ${item?.cost?.toFixed(2) || 0}</Text>
                   </View>}
                </View>
                {controls?.viewLayoutImage && <Image style={styles.logo2} src={ item?.layout_id ? `${backendURL}/${item?.settings?.image}` : CustomImage} alt="logo" />}
               </View>
               </View>
               <View wrap={false} style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:'10px', alignItems: 'stretch',gap:'10px'}}>
                {controls?.viewPricingSubCategory &&
                 <View style={{border:'1.5px solid #ccc',flexGrow:1,borderRadius:'5px',padding:'5px 10px',display: 'flex', flexDirection: 'column'}}>
                <Text style={{fontSize:'18px',fontWeight:'extrabold',marginBottom:'2px'}}>Pricing Sub Categories:</Text>
                  {pricingSection[item?.category]?.includes(pdfFields.HARDWAREPRICE) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px',fontWeight:'bold'}}>Hardware Price:</Text>
                  <Text style={{fontSize:'12px'}}>$ {item?.pricing?.hardwarePrice?.toFixed(2) || 0}</Text>
                  </View>}
                  {pricingSection[item?.category]?.includes(pdfFields.GLASSPRICE) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px',fontWeight:'bold'}}>Glass Price:</Text>
                  <Text style={{fontSize:'12px'}}>$ {item?.pricing?.glassPrice?.toFixed(2) || 0}</Text>
                  </View>}
                  {pricingSection[item?.category]?.includes(pdfFields.GLASSADDONSPRICE) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Glass Addons Price:</Text>
                  <Text style={{fontSize:'12px'}}>$ {item?.pricing?.glassAddonsPrice?.toFixed(2) || 0}</Text>
                  </View>}
                  {pricingSection[item?.category]?.includes(pdfFields.FABRICATIONPRICE) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Fabrication Price:</Text>
                  <Text style={{fontSize:'12px'}}>$ {item?.pricing?.fabricationPrice?.toFixed(2) || 0}</Text>
                  </View>}
                  {pricingSection[item?.category]?.includes(pdfFields.HARDWAREADDONSPRICE) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Hardware Addons Price:</Text>
                  <Text style={{fontSize:'12px'}}>$ {item?.pricing?.hardwareAddonsPrice?.toFixed(2) || 0}</Text>
                  </View>}
                  {item?.pdfSettings?.labor &&
                  <>
                  {pricingSection[item?.category]?.includes(pdfFields.LABORPRICE) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>{item?.category === EstimateCategory.WINECELLARS ? 'Layout Labor Price:' : 'Labor Price:' }</Text>
                  <Text style={{fontSize:'12px'}}>$ {item?.pricing?.laborPrice?.toFixed(2) || 0}</Text>
                  </View>}
                  {pricingSection[item?.category]?.includes(pdfFields.DOORLABORPRICE) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Door Labor Price:</Text>
                  <Text style={{fontSize:'12px'}}>$ {item?.pricing?.doorLaborPrice?.toFixed(2) || 0}</Text>
                  </View>}
                  </>
                  }        
                  {pricingSection[item?.category]?.includes(pdfFields.ADDITIONALFIELDSPRICE) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Additional Fields Price:</Text>
                  <Text style={{fontSize:'12px'}}>$ {item?.pricing?.additionalFieldPrice?.toFixed(2) || 0}</Text>
                  </View>}
                </View>}
                {controls?.viewGrossProfit && 
                <View style={{border:'1.5px solid #ccc',flexGrow:1,borderRadius:'5px',padding:'5px 10px',display: 'flex', flexDirection: 'column'}}>
                <Text style={{fontSize:'18px',fontWeight:'extrabold',marginBottom:'2px'}}>Gross {item?.pdfSettings?.profit ? 'Profit' : 'Total'}:</Text>
                  <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Gross Total:</Text>
                  <Text style={{fontSize:'12px'}}>$ {item?.pricing?.total?.toFixed(2) || 0}</Text>
                  </View>
                  {item?.pdfSettings?.cost && 
                   <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                   <Text style={{fontSize:'14px'}}>Actual Cost:</Text>
                   <Text style={{fontSize:'12px'}}>$ {item?.pricing?.cost?.toFixed(2) || 0}</Text>
                   </View> }   
                  {item?.pdfSettings?.profit && 
                   <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                   <Text style={{fontSize:'14px'}}>Profit:</Text>
                   <Text style={{fontSize:'12px'}}>{item?.pricing?.profit?.toFixed(2) || 0} %</Text>
                   </View>}           
                </View>
                }
               </View>
               <View wrap={false} style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:'10px',alignItems:'flex-start',gap:'10px'}}>
             
                {controls?.viewSummary && 
                <View style={{border:'1.5px solid #ccc',flexGrow:1,borderRadius:'5px',padding:'5px 10px'}}>
                <Text style={{fontSize:'18px',fontWeight:'extrabold',marginBottom:'2px'}}>Summary:</Text>
                {summarySection[item?.category]?.includes(pdfFields.HARDWAREFINISHES) && item?.hardwareFinishes && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Finish:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.hardwareFinishes?.name}</Text>
                  </View>}
                {summarySection[item?.category]?.includes(pdfFields.HANDLES) && item?.handles?.item && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Handles:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.handles?.item?.name} - ({item?.handles?.count})</Text>
                  </View>}
                {summarySection[item?.category]?.includes(pdfFields.DOORLOCK) && item?.doorLock?.item && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Door Lock:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.doorLock?.item?.name} - ({item?.doorLock?.count})</Text>
                  </View>}
                {summarySection[item?.category]?.includes(pdfFields.HINGES) && item?.hinges?.item &&  <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Hinges:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.hinges?.item?.name} - ({item?.hinges?.count})</Text>
                  </View>}
                  {["channel"].includes(item?.mountingState) ?
                <View>
                {summarySection[item?.category]?.includes(pdfFields.MOUNTINGCHANNEL) && item?.mountingChannel?.item && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                 <Text style={{fontSize:'14px'}}>Channel:</Text>
                 <Text style={{fontSize:'12px'}}>{item?.mountingChannel?.item?.name}</Text>
                 </View>}
                 </View> : <View>
                  {summarySection[item?.category]?.includes(pdfFields.WALLCLAMP) && item?.mountingClamps?.wallClamp?.length ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                 <Text style={{fontSize:'14px'}}>WallClamps:</Text>
                 <Text style={{fontSize:'12px'}}>
                  {item?.mountingClamps?.wallClamp?.map((row, index) => (
                  `${row.item.name} (${row.count})${commaFn(index, item.mountingClamps.wallClamp.length)}`
                   ))}
                 </Text>
                 </View> : ''}
                 {summarySection[item?.category]?.includes(pdfFields.SLEEVEOVER) && item?.mountingClamps?.sleeveOver?.length ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                 <Text style={{fontSize:'14px'}}>Sleeve Over:</Text>
                 <Text style={{fontSize:'12px'}}>
                  {item?.mountingClamps?.sleeveOver?.map(
                     (row,index) => (`${row.item.name} (${row.count})${commaFn(index, item?.mountingClamps?.sleeveOver.length)}`))}
                 </Text>
                 </View> : ''}
                 {summarySection[item?.category]?.includes(pdfFields.GLASSTOGLASS) && item?.mountingClamps?.glassToGlass?.length ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                 <Text style={{fontSize:'14px'}}>Glass To Glass:</Text>
                 <Text style={{fontSize:'12px'}}>
                  {item?.mountingClamps?.glassToGlass?.map(
                     (row,index) => (`${row.item.name} (${row.count})${commaFn(index, item?.mountingClamps?.glassToGlass.length)}`))}
                 </Text>
                 </View> : ''}
                
                  </View>}
                  {summarySection[item?.category]?.includes(pdfFields.CORNERWALLCLAMP) && item?.cornerClamps?.cornerWallClamp?.length ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                 <Text style={{fontSize:'14px'}}>Corner WallClamp:</Text>
                 <Text style={{fontSize:'12px'}}>
                  {item?.cornerClamps?.cornerWallClamp?.map(
                     (row,index) => (`${row.item.name} (${row.count})${commaFn(index, item?.cornerClamps?.cornerWallClamp.length)}`))}
                 </Text>
                 </View> : ''}
                 {summarySection[item?.category]?.includes(pdfFields.CORNERSLEEVEOVER) && item?.cornerClamps?.cornerSleeveOver?.length ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                 <Text style={{fontSize:'14px'}}>Corner Sleeve Over:</Text>
                 <Text style={{fontSize:'12px'}}>
                  {item?.cornerClamps?.cornerSleeveOver?.map(
                     (row,index) => (`${row.item.name} (${row.count})${commaFn(index, item?.cornerClamps?.cornerSleeveOver.length)}`))}
                 </Text>
                 </View> : ''}
                 {summarySection[item?.category]?.includes(pdfFields.CORNERGLASSTOGLASS) && item?.cornerClamps?.cornerGlassToGlass?.length ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                 <Text style={{fontSize:'14px'}}>Corner Glass To Glass:</Text>
                 <Text style={{fontSize:'12px'}}>
                  {item?.cornerClamps?.cornerGlassToGlass?.map(
                     (row,index) => (`${row.item.name} (${row.count})${commaFn(index, item?.cornerClamps?.cornerGlassToGlass.length)}`))}
                 </Text>
                 </View> : ''}
        
                {summarySection[item?.category]?.includes(pdfFields.GLASSTYPE) && item?.glassType?.item ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Glass Type:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.glassType?.item?.name} - ({item?.glassType?.thickness})</Text>
                  </View> : ''}
                {summarySection[item?.category]?.includes(pdfFields.EDGEWORK) && item?.edgeWork?.item ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Edge Work:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.edgeWork?.item?.name} - ({item?.edgeWork?.thickness})</Text>
                </View> : ''}
                {summarySection[item?.category]?.includes(pdfFields.SLIDINGDOORSYSTEM) && item?.slidingDoorSystem?.item ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Sliding Door System:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.slidingDoorSystem?.item?.name} - ({item?.slidingDoorSystem?.count})</Text>
                  </View> : ''}
                {summarySection[item?.category]?.includes(pdfFields.HEADER) && item?.header?.item ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Header:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.header?.item?.name} - ({item?.header?.count})</Text>
                  </View> : ''}
                {summarySection[item?.category]?.includes(pdfFields.GLASSADDONS) && item?.glassAddons?.length ? (
                  <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontSize:'14px'}}>Glass Addons:</Text>
                    <Text style={{fontSize:'12px'}}>
                    {item?.glassAddons?.map((item,index) => (`${item?.name}${commaFn(index, item?.glassAddons?.length)}`))}
                    </Text>
                  </View>
                  ) : (
                    ""
                  )}
                  {summarySection[item?.category]?.includes(pdfFields.HARDWARES) && item?.hardwares?.length ? (
                  <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontSize:'14px',flexShrink: 0}}>Hardwares:</Text>
                    <Text style={{fontSize:'12px',flexGrow: 1, wordWrap: 'break-word', whiteSpace: 'pre-wrap',width:'79%',paddingLeft:'12px'}}>
                    {item?.hardwares?.map((record,index) => (`${record?.item?.name} - (${record?.count})${commaFn(index, item?.hardwares?.length)}`))}
                    </Text>
                  </View>
                  ) : (
                    ""
                  )}
                  {summarySection[item?.category]?.includes(pdfFields.HARDWAREADDONS) && item?.hardwareAddons?.length ? (
                  <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontSize:'14px'}}>Hardware Addons:</Text>
                    {item?.hardwareAddons?.map((record,index) => (
                      <Text style={{fontSize:'12px'}}>{`${record?.item?.name} - (${record?.count})${commaFn(index, item?.hardwareAddons?.length)} `}</Text>))}
                  </View>
                  ) : (
                    ""
                  )}
                  {item?.pdfSettings?.people && 
                  <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>People:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.people}</Text>
                  </View>}
                  
                  {item?.pdfSettings?.hours && 
                  <>
                  <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>{item?.category === EstimateCategory.WINECELLARS ? 'Hours for layout:' : 'Hours'}</Text>
                  <Text style={{fontSize:'12px'}}>{item?.hours}</Text>
                  </View>
                  {pricingSection[item?.category]?.includes(pdfFields.DOORLABORPRICE) &&
                  <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Hours for door:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.laborHoursForDoor ?? 0}</Text>
                  </View>
                  }  
                  </>}
                        
                </View>}
               </View>
               <View wrap={false} style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:'10px',alignItems:'stretch',gap:'10px'}}>
               {controls?.viewFabrication && 
               <View style={{border:'1.5px solid #ccc',flexGrow:1,borderRadius:'5px',padding:'5px 10px',display:'flex',flexDirection:'column'}}>
                <Text style={{fontSize:'18px',fontWeight:'extrabold',marginBottom:'2px'}}>Fabrication:</Text>
                  {fabricationSection[item?.category]?.includes(pdfFields.ONEINCHHOLES) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>1" Holes:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.oneInchHoles ?? 0}</Text>
                  </View>}
                  {fabricationSection[item?.category]?.includes(pdfFields.HINGECUT) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Hinge Cut Out:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.hingeCut ?? 0}</Text>
                  </View>}
                  {fabricationSection[item?.category]?.includes(pdfFields.ClAMPCUT) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Clamp Cut:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.clampCut ?? 0}</Text>
                  </View>}
                  {fabricationSection[item?.category]?.includes(pdfFields.NOTCH) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Notch:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.notch ?? 0}</Text>
                  </View>}
                  {fabricationSection[item?.category]?.includes(pdfFields.OUTAGES) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Outages:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.outages ?? 0}</Text>
                  </View>}
                  {fabricationSection[item?.category]?.includes(pdfFields.MITRE) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Mitre:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.mitre ?? 0}</Text>
                  </View>}
                  {fabricationSection[item?.category]?.includes(pdfFields.POLISH) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Polish:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.polish ?? 0}</Text>
                  </View>}
                  {fabricationSection[item?.category]?.includes(pdfFields.SIMPLEHOLES) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Holes:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.simpleHoles ?? 0}</Text>
                  </View>}
                  {fabricationSection[item?.category]?.includes(pdfFields.LIGHTHOLES) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Light Holes:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.lightHoles ?? 0}</Text>
                  </View>}
                  {fabricationSection[item?.category]?.includes(pdfFields.SINGLEOUTLETCUTOUT) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Single Outlet Cutout:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.singleOutletCutout ?? 0}</Text>
                  </View>}
                  {fabricationSection[item?.category]?.includes(pdfFields.DOUBLEOUTLETCUTOUT) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Double Outlet Cutout:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.doubleOutletCutout ?? 0}</Text>
                  </View>}
                  {fabricationSection[item?.category]?.includes(pdfFields.TRIPLEOUTLETCUTOUT) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Triple Outlet Cutout:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.tripleOutletCutout ?? 0}</Text>
                  </View>}
                  {fabricationSection[item?.category]?.includes(pdfFields.QUADOUTLETCUTOUT) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:'14px'}}>Quad Outlet Cutout:</Text>
                  <Text style={{fontSize:'12px'}}>{item?.quadOutletCutout ?? 0}</Text>
                  </View>}
                </View>}
                {controls?.viewAdditionalFields &&
                 <View style={{border:'1.5px solid #ccc',flexGrow:1,borderRadius:'5px',padding:'5px 10px',display:'flex',flexDirection:'column'}}>
                <Text style={{fontSize:'18px',fontWeight:'extrabold',marginBottom:'2px'}}>Additional Fields:</Text>
                  {item?.additionalFields?.map(
                    (item) => 
                      item.label !== "" && (
                        <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                          <Text style={{fontSize:'14px'}}>{item.label}:</Text>
                          <Text style={{fontSize:'12px'}}>{item.cost}</Text>
                        </View>
                      )
                  )}
                </View>}
               </View>
              </View>
             {data?.estimateData?.signature || data?.estimateData?.customerName  &&
            <View  wrap={false} style={{display:'flex',flexDirection:'row',justifyContent:'flex-end', width: '100%' }}>
             <View style={{ paddingTop: '10px', width: '150px', height: '150px' }}>
             {data?.estimateData?.signature && <Image style={styles.logo2} textAlign='center' src={`${backendURL}/${data?.estimateData?.signature}`} alt="logo" />} 
             {data?.estimateData?.customerName && <Text style={{ paddingTop: '6px', borderTop: '1px solid #ccc',textAlign:'center' }}>{data?.estimateData?.customerName}</Text>} 
              <Text style={{ paddingTop: '6px', borderTop: '1px solid #ccc',textAlign:'center' }}>Signature</Text>
            </View>
          </View>         
              }               
              {/** Pagination */}
              <View style={{borderTop:'1px solid #ccc',position:'absolute',bottom:'10px',left:'20px',right:'20px',padding:'5px'}} fixed>
              <Text style={{fontSize:'13px'}} render={({ pageNumber, totalPages }) => (
                `Page ${pageNumber} / ${totalPages}`
              )} />
              </View>
              </>
            );
          })}
          </Page>
        </>
      )}
    </Document>
  );
};

export default LandingPDFFile;
