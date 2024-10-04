import React, { useState } from "react";
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
import { EstimateCategory, quoteState } from "../../utilities/constants";
import { dimensionsSection, fabricationSection, pdfFields, pricingSection, summarySection } from "@/utilities/pdfConfigs";
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
const commaFn = (index, arrLength) => index < arrLength - 1 ? ", " : "";

// Create Document Component

const PDFFile = ({controls,data}) => {
  const [loading,setLoading] = useState(true);
  return (<Document onRender={()=>{console.log('pdf rendered');setLoading(false)}}>
    {loading ? "Loading..." : <Page size="A4" style={styles.page} wrap>
      {/** Section 1 */}
      <View style={styles.section_top}>
        <View style={styles.title_logo}>
          <Image style={styles.logo} src={GCS_logo} alt="logo" />
          <Text style={styles.title}> PRICE UP</Text>
        </View>
        <View style={styles.top_view_2}>
          <View style={styles.top_view_2_container}>
            <Text style={{fontWeight:"extrabold",fontSize:'14px'}}>Job ID:</Text>
            <Text style={styles.top_view_2_value}>{data?.quote?.id}</Text>
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
          <Text style={{fontSize:'12px'}}>{data?.quote?.settings?.name ? data?.quote?.settings?.name : data?.quote?.category === EstimateCategory.MIRRORS ? 'Mirror' : 'Custom'} Layout - Estimate</Text>
          <Text style={{fontSize:'12px'}}>{data?.quote?.label}</Text>
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
      {/** Section 3 */}
      <View style={{borderTop:'1px sloid #ccc',paddingTop:'10px'}}>
       <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{width:'357px'}} wrap>
           <Text style={{fontSize:'18px',fontWeight:'extrabold', flexShrink: 1,flexWrap: 'wrap',width:'357px'}}>{data?.quote?.settings?.name ? data?.quote?.settings?.name : data?.quote?.category === EstimateCategory.MIRRORS ? 'Mirror' : 'Custom'} Layout - Estimate</Text>
           {dimensionsSection[data?.quote?.category]?.includes(pdfFields.MEASUREMENTS) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}} wrap>
            <Text style={{fontSize:'14px'}}>Dimensions:</Text>
            <Text style={{fontSize:'12px',wordWrap: "break-word",textAlign:'right'}} wrap>{data?.quote?.measurements}</Text>
           </View>}
           {dimensionsSection[data?.quote?.category]?.includes(pdfFields.DOORWIDTH) && data?.quote?.doorWidth && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{fontSize:'14px'}}>Door Width:</Text>
            <Text style={{fontSize:'12px'}}>{data?.quote?.doorWidth}</Text>
           </View>}
           {dimensionsSection[data?.quote?.category]?.includes(pdfFields.SQFTAREA) && data?.quote?.sqftArea && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{fontSize:'14px'}}>Square Foot:</Text>
            <Text style={{fontSize:'12px'}}>{data?.quote?.sqftArea}</Text>
           </View>}
           {dimensionsSection[data?.quote?.category]?.includes(pdfFields.DOORWEIGHT) && data?.quote?.doorWeight && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{fontSize:'14px'}}>Door Weight:</Text>
            <Text style={{fontSize:'12px'}}>{data?.quote?.doorWeight}</Text>
           </View>}
           {dimensionsSection[data?.quote?.category]?.includes(pdfFields.PANELWEIGHT) && data?.quote?.panelWeight && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{fontSize:'14px'}}>Panel Weight:</Text>
            <Text style={{fontSize:'12px'}}>{data?.quote?.panelWeight}</Text>
           </View>}
           {dimensionsSection[data?.quote?.category]?.includes(pdfFields.RETURNWEIGHT) && data?.quote?.returnWeight && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{fontSize:'14px'}}>Return Weight:</Text>
            <Text style={{fontSize:'12px'}}>{data?.quote?.returnWeight}</Text>
           </View>}
           {<View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{fontSize:'14px'}}>Total:</Text>
            <Text style={{fontSize:'12px'}}> ${data?.quote?.cost?.toFixed(2) || 0}</Text>
           </View>}
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
        {controls?.viewLayoutImage && <Image style={styles.logo2} src={ data?.quote?.layout_id ? `${backendURL}/${data?.quote?.settings?.image}` : CustomImage} alt="logo" />}
        {/* <Text style={{fontSize:'18px'}}>Total: ${data?.quote?.cost?.toFixed(2) || 0}</Text> */}
       </View>
       <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:'10px', alignItems: 'stretch',gap:'10px'}}>
        {controls?.viewPricingSubCategory &&
         <View style={{border:'1.5px solid #ccc',flexGrow:1,borderRadius:'5px',padding:'5px 10px',display: 'flex', flexDirection: 'column'}}>
        <Text style={{fontSize:'18px',fontWeight:'extrabold',marginBottom:'2px'}}>Pricing Sub Categories:</Text>
          {pricingSection[data?.quote?.category]?.includes(pdfFields.HARDWAREPRICE) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px',fontWeight:'bold'}}>Hardware Price:</Text>
          <Text style={{fontSize:'12px'}}>$ {data?.quote?.pricing?.hardwarePrice?.toFixed(2) || 0}</Text>
          </View>}
          {pricingSection[data?.quote?.category]?.includes(pdfFields.GLASSPRICE) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px',fontWeight:'bold'}}>Glass Price:</Text>
          <Text style={{fontSize:'12px'}}>$ {data?.quote?.pricing?.glassPrice?.toFixed(2) || 0}</Text>
          </View>}
          {pricingSection[data?.quote?.category]?.includes(pdfFields.GLASSADDONSPRICE) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px'}}>Glass Addons Price:</Text>
          <Text style={{fontSize:'12px'}}>$ {data?.quote?.pricing?.glassAddonsPrice?.toFixed(2) || 0}</Text>
          </View>}
          {pricingSection[data?.quote?.category]?.includes(pdfFields.FABRICATIONPRICE) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px'}}>Fabrication Price:</Text>
          <Text style={{fontSize:'12px'}}>$ {data?.quote?.pricing?.fabricationPrice?.toFixed(2) || 0}</Text>
          </View>}
          {pricingSection[data?.quote?.category]?.includes(pdfFields.HARDWAREADDONSPRICE) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px'}}>Hardware Addons Price:</Text>
          <Text style={{fontSize:'12px'}}>$ {data?.quote?.pricing?.hardwareAddonsPrice?.toFixed(2) || 0}</Text>
          </View>}
          {pricingSection[data?.quote?.category]?.includes(pdfFields.LABORPRICE) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px'}}>{data?.quote?.category === EstimateCategory.WINECELLARS ? 'Layout Labor Price:' : 'Labor Price:' }</Text>
          <Text style={{fontSize:'12px'}}>$ {data?.quote?.pricing?.laborPrice?.toFixed(2) || 0}</Text>
          </View>}
          {pricingSection[data?.quote?.category]?.includes(pdfFields.DOORLABORPRICE) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px'}}>Door Labor Price:</Text>
          <Text style={{fontSize:'12px'}}>$ {data?.quote?.pricing?.doorLaborPrice?.toFixed(2) || 0}</Text>
          </View>}
          {pricingSection[data?.quote?.category]?.includes(pdfFields.ADDITIONALFIELDSPRICE) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px'}}>Additional Fields Price:</Text>
          <Text style={{fontSize:'12px'}}>$ {data?.quote?.pricing?.additionalFieldPrice?.toFixed(2) || 0}</Text>
          </View>}
        </View>}
        {controls?.viewGrossProfit && 
        <View style={{border:'1.5px solid #ccc',flexGrow:1,borderRadius:'5px',padding:'5px 10px',display: 'flex', flexDirection: 'column'}}>
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
          <Text style={{fontSize:'12px'}}>{data?.quote?.pricing?.profit?.toFixed(2) || 0} %</Text>
          </View>
        </View>}
       </View>
       <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:'10px',alignItems:'flex-start',gap:'10px'}}>
     
        {controls?.viewSummary && 
        <View style={{border:'1.5px solid #ccc',flexGrow:1,borderRadius:'5px',padding:'5px 10px'}}>
        <Text style={{fontSize:'18px',fontWeight:'extrabold',marginBottom:'2px'}}>Summary:</Text>
        {summarySection[data?.quote?.category]?.includes(pdfFields.HARDWAREFINISHES) && data?.quote?.hardwareFinishes && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px'}}>Finish:</Text>
          <Text style={{fontSize:'12px'}}>{data?.quote?.hardwareFinishes?.name}</Text>
          </View>}
        {summarySection[data?.quote?.category]?.includes(pdfFields.HANDLES) && data?.quote?.handles?.item && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px'}}>Handles:</Text>
          <Text style={{fontSize:'12px'}}>{data?.quote?.handles?.item?.name} - ({data?.quote?.handles?.count})</Text>
          </View>}
        {summarySection[data?.quote?.category]?.includes(pdfFields.DOORLOCK) && data?.quote?.doorLock?.item && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px'}}>Door Lock:</Text>
          <Text style={{fontSize:'12px'}}>{data?.quote?.doorLock?.item?.name} - ({data?.quote?.doorLock?.count})</Text>
          </View>}
        {summarySection[data?.quote?.category]?.includes(pdfFields.HINGES) && data?.quote?.hinges?.item &&  <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px'}}>Hinges:</Text>
          <Text style={{fontSize:'12px'}}>{data?.quote?.hinges?.item?.name} - ({data?.quote?.hinges?.count})</Text>
          </View>}
          {["channel"].includes(data?.quote?.mountingState) ?
        <View>
        {summarySection[data?.quote?.category]?.includes(pdfFields.MOUNTINGCHANNEL) && data?.quote?.mountingChannel?.item && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
         <Text style={{fontSize:'14px'}}>Channel:</Text>
         <Text style={{fontSize:'12px'}}>{data?.quote?.mountingChannel?.item?.name}</Text>
         </View>}
         </View> : <View>
          {summarySection[data?.quote?.category]?.includes(pdfFields.WALLCLAMP) && data?.quote?.mountingClamps?.wallClamp?.length ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
         <Text style={{fontSize:'14px'}}>WallClamps:</Text>
         <Text style={{fontSize:'12px'}}>
          {data?.quote?.mountingClamps?.wallClamp?.map((row, index) => (
          `${row.item.name} (${row.count})${commaFn(index, data.quote.mountingClamps.wallClamp.length)}`
           ))}
         </Text>
         </View> : ''}
         {summarySection[data?.quote?.category]?.includes(pdfFields.SLEEVEOVER) && data?.quote?.mountingClamps?.sleeveOver?.length ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
         <Text style={{fontSize:'14px'}}>Sleeve Over:</Text>
         <Text style={{fontSize:'12px'}}>
          {data?.quote?.mountingClamps?.sleeveOver?.map(
             (row,index) => (`${row.item.name} (${row.count})${commaFn(index, data?.quote?.mountingClamps?.sleeveOver.length)}`))}
         </Text>
         </View> : ''}
         {summarySection[data?.quote?.category]?.includes(pdfFields.GLASSTOGLASS) && data?.quote?.mountingClamps?.glassToGlass?.length ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
         <Text style={{fontSize:'14px'}}>Glass To Glass:</Text>
         <Text style={{fontSize:'12px'}}>
          {data?.quote?.mountingClamps?.glassToGlass?.map(
             (row,index) => (`${row.item.name} (${row.count})${commaFn(index, data?.quote?.mountingClamps?.glassToGlass.length)}`))}
         </Text>
         </View> : ''}
        
          </View>}
          {summarySection[data?.quote?.category]?.includes(pdfFields.CORNERWALLCLAMP) && data?.quote?.cornerClamps?.cornerWallClamp?.length ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
         <Text style={{fontSize:'14px'}}>Corner WallClamp:</Text>
         <Text style={{fontSize:'12px'}}>
          {data?.quote?.cornerClamps?.cornerWallClamp?.map(
             (row,index) => (`${row.item.name} (${row.count})${commaFn(index, data?.quote?.cornerClamps?.cornerWallClamp.length)}`))}
         </Text>
         </View> : ''}
         {summarySection[data?.quote?.category]?.includes(pdfFields.CORNERSLEEVEOVER) && data?.quote?.cornerClamps?.cornerSleeveOver?.length ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
         <Text style={{fontSize:'14px'}}>Corner Sleeve Over:</Text>
         <Text style={{fontSize:'12px'}}>
          {data?.quote?.cornerClamps?.cornerSleeveOver?.map(
             (row,index) => (`${row.item.name} (${row.count})${commaFn(index, data?.quote?.cornerClamps?.cornerSleeveOver.length)}`))}
         </Text>
         </View> : ''}
         {summarySection[data?.quote?.category]?.includes(pdfFields.CORNERGLASSTOGLASS) && data?.quote?.cornerClamps?.cornerGlassToGlass?.length ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
         <Text style={{fontSize:'14px'}}>Corner Glass To Glass:</Text>
         <Text style={{fontSize:'12px'}}>
          {data?.quote?.cornerClamps?.cornerGlassToGlass?.map(
             (row,index) => (`${row.item.name} (${row.count})${commaFn(index, data?.quote?.cornerClamps?.cornerGlassToGlass.length)}`))}
         </Text>
         </View> : ''}

        {summarySection[data?.quote?.category]?.includes(pdfFields.GLASSTYPE) && data?.quote?.glassType?.item ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px'}}>Glass Type:</Text>
          <Text style={{fontSize:'12px'}}>{data?.quote?.glassType?.item?.name} - ({data?.quote?.glassType?.thickness})</Text>
          </View> : ''}
        {summarySection[data?.quote?.category]?.includes(pdfFields.EDGEWORK) && data?.quote?.edgeWork?.item ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px'}}>Edge Work:</Text>
          <Text style={{fontSize:'12px'}}>{data?.quote?.edgeWork?.item?.name} - ({data?.quote?.edgeWork?.thickness})</Text>
        </View> : ''}
        {summarySection[data?.quote?.category]?.includes(pdfFields.SLIDINGDOORSYSTEM) && data?.quote?.slidingDoorSystem?.item ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px'}}>Sliding Door System:</Text>
          <Text style={{fontSize:'12px'}}>{data?.quote?.slidingDoorSystem?.item?.name} - ({data?.quote?.slidingDoorSystem?.count})</Text>
          </View> : ''}
        {summarySection[data?.quote?.category]?.includes(pdfFields.HEADER) && data?.quote?.header?.item ? <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px'}}>Header:</Text>
          <Text style={{fontSize:'12px'}}>{data?.quote?.header?.item?.name} - ({data?.quote?.header?.count})</Text>
          </View> : ''}
        {summarySection[data?.quote?.category]?.includes(pdfFields.GLASSADDONS) && data?.quote?.glassAddons?.length ? (
          <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{fontSize:'14px'}}>Glass Addons:</Text>
            <Text style={{fontSize:'12px'}}>
            {data?.quote?.glassAddons?.map((item,index) => (`${item?.name}${commaFn(index, data?.quote?.glassAddons?.length)}`))}
            </Text>
          </View>
          ) : (
            ""
          )}
          {summarySection[data?.quote?.category]?.includes(pdfFields.HARDWARES) && data?.quote?.hardwares?.length ? (
          <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{fontSize:'14px'}}>Hardwares:</Text>
            <Text style={{fontSize:'12px'}}>
            {data?.quote?.hardwares?.map((record,index) => (`${record?.item?.name} - (${record?.count})${commaFn(index, data?.quote?.hardwares?.length)}`))}
            </Text>
          </View>
          ) : (
            ""
          )}
          {summarySection[data?.quote?.category]?.includes(pdfFields.HARDWAREADDONS) && data?.quote?.hardwareAddons?.length ? (
          <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{fontSize:'14px'}}>Hardware Addons:</Text>
            {data?.quote?.hardwareAddons?.map((record,index) => (
              <Text style={{fontSize:'12px'}}>{`${record?.item?.name} - (${record?.count})${commaFn(index, data?.quote?.hardwareAddons?.length)} `}</Text>))}
          </View>
          ) : (
            ""
          )}
          <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px'}}>People:</Text>
          <Text style={{fontSize:'12px'}}>{data?.quote?.people}</Text>
          </View>
          <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px'}}>{data?.quote?.category === EstimateCategory.WINECELLARS ? 'Hours for layout:' : 'Hours'}</Text>
          <Text style={{fontSize:'12px'}}>{data?.quote?.hours}</Text>
          </View>
          {pricingSection[data?.quote?.category]?.includes(pdfFields.DOORLABORPRICE) &&
          <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px'}}>Hours for door:</Text>
          <Text style={{fontSize:'12px'}}>{data?.quote?.laborHoursForDoor ?? 0}</Text>
          </View>
          }          
        </View>}
       </View>
       <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:'10px',alignItems:'stretch',gap:'10px'}}>
       {controls?.viewFabrication && 
       <View style={{border:'1.5px solid #ccc',flexGrow:1,borderRadius:'5px',padding:'5px 10px',display:'flex',flexDirection:'column'}}>
        <Text style={{fontSize:'18px',fontWeight:'extrabold',marginBottom:'2px'}}>Fabrication:</Text>
          {fabricationSection[data?.quote?.category]?.includes(pdfFields.ONEINCHHOLES) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px'}}>1" Holes:</Text>
          <Text style={{fontSize:'12px'}}>{data?.quote?.oneInchHoles}</Text>
          </View>}
          {fabricationSection[data?.quote?.category]?.includes(pdfFields.HINGECUT) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px'}}>Hinge Cut Out:</Text>
          <Text style={{fontSize:'12px'}}>{data?.quote?.hingeCut}</Text>
          </View>}
          {fabricationSection[data?.quote?.category]?.includes(pdfFields.ClAMPCUT) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px'}}>Clamp Cut:</Text>
          <Text style={{fontSize:'12px'}}>{data?.quote?.clampCut}</Text>
          </View>}
          {fabricationSection[data?.quote?.category]?.includes(pdfFields.NOTCH) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px'}}>Notch:</Text>
          <Text style={{fontSize:'12px'}}>{data?.quote?.notch}</Text>
          </View>}
          {fabricationSection[data?.quote?.category]?.includes(pdfFields.OUTAGES) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px'}}>Outages:</Text>
          <Text style={{fontSize:'12px'}}>{data?.quote?.outages}</Text>
          </View>}
          {fabricationSection[data?.quote?.category]?.includes(pdfFields.MITRE) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px'}}>Mitre:</Text>
          <Text style={{fontSize:'12px'}}>{data?.quote?.mitre}</Text>
          </View>}
          {fabricationSection[data?.quote?.category]?.includes(pdfFields.POLISH) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px'}}>Polish:</Text>
          <Text style={{fontSize:'12px'}}>{data?.quote?.polish}</Text>
          </View>}
          {fabricationSection[data?.quote?.category]?.includes(pdfFields.SIMPLEHOLES) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px'}}>Holes:</Text>
          <Text style={{fontSize:'12px'}}>{data?.quote?.simpleHoles}</Text>
          </View>}
          {fabricationSection[data?.quote?.category]?.includes(pdfFields.LIGHTHOLES) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px'}}>Light Holes:</Text>
          <Text style={{fontSize:'12px'}}>{data?.quote?.lightHoles}</Text>
          </View>}
          {fabricationSection[data?.quote?.category]?.includes(pdfFields.SINGLEOUTLETCUTOUT) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px'}}>Single Outlet Cutout:</Text>
          <Text style={{fontSize:'12px'}}>{data?.quote?.singleOutletCutout}</Text>
          </View>}
          {fabricationSection[data?.quote?.category]?.includes(pdfFields.DOUBLEOUTLETCUTOUT) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px'}}>Double Outlet Cutout:</Text>
          <Text style={{fontSize:'12px'}}>{data?.quote?.doubleOutletCutout}</Text>
          </View>}
          {fabricationSection[data?.quote?.category]?.includes(pdfFields.TRIPLEOUTLETCUTOUT) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px'}}>Triple Outlet Cutout:</Text>
          <Text style={{fontSize:'12px'}}>{data?.quote?.tripleOutletCutout}</Text>
          </View>}
          {fabricationSection[data?.quote?.category]?.includes(pdfFields.QUADOUTLETCUTOUT) && <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontSize:'14px'}}>Quad Outlet Cutout:</Text>
          <Text style={{fontSize:'12px'}}>{data?.quote?.quadOutletCutout}</Text>
          </View>}
        </View>}
        {controls?.viewAdditionalFields &&
         <View style={{border:'1.5px solid #ccc',flexGrow:1,borderRadius:'5px',padding:'5px 10px',display:'flex',flexDirection:'column'}}>
        <Text style={{fontSize:'18px',fontWeight:'extrabold',marginBottom:'2px'}}>Additional Fields:</Text>
          {data?.quote?.additionalFields?.map(
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
      {/** Pagination */}
      <View style={{borderTop:'1px solid #ccc',position:'absolute',bottom:'10px',left:'20px',right:'20px',padding:'5px'}} fixed>
      <Text style={{fontSize:'13px'}} render={({ pageNumber, totalPages }) => (
        `Page ${pageNumber} / ${totalPages}`
      )} />
      </View>
    </Page>}
  </Document>);
};

export default PDFFile;
