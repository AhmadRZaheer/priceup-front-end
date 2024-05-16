import { layoutVariants, quoteState } from "./constants";

export const getHardwareFabricationQuantity = (
  selectedContent,
  currentQuoteState,
  selectedItem
) => {
  let oneInchHoles = 0;
  let hingeCut = 0;
  let clampCut = 0;
  let notch = 0;
  let outages = 0;
  // for handles
  if (selectedContent.handles?.item) {
    const handleResult = getHandleFabrication(
      selectedContent.handles?.item,
      selectedContent.handles?.count
    );
    oneInchHoles += handleResult.oneInchHoles;
    hingeCut += handleResult.hingeCut;
    clampCut += handleResult.clampCut;
    notch += handleResult.notch;
    outages += handleResult.outages;
  }
  // for hinges
  if (selectedContent.hinges?.item) {
    const hingeResult = getHingeFabrication(
      selectedContent.hinges?.item,
      selectedContent.hinges?.count
    );
    oneInchHoles += hingeResult.oneInchHoles;
    hingeCut += hingeResult.hingeCut;
    clampCut += hingeResult.clampCut;
    notch += hingeResult.notch;
    outages += hingeResult.outages;
  }
  // for mounting channel
  if(selectedContent.mountingState === 'channel' && selectedContent.mountingChannel?.item){
    const mountingChannelResult = getMountingFabrication(
      selectedContent.mountingChannel.item,
      selectedContent.mountingChannel.count
    );
    oneInchHoles += mountingChannelResult.oneInchHoles;
    hingeCut += mountingChannelResult.hingeCut;
    clampCut += mountingChannelResult.clampCut;
    notch += mountingChannelResult.notch;
    outages += mountingChannelResult.outages;
  }
  else if(selectedContent.mountingState === 'clamps'){
    // for wall clamp
    if(selectedContent.mountingClamps.wallClamp?.length){
      selectedContent.mountingClamps.wallClamp.forEach((record)=>{
      const wallClampResult = getMountingFabrication(
        record.item,
        record.count
      );
      console.log(wallClampResult,'wall clamp result');
      oneInchHoles += wallClampResult.oneInchHoles;
      hingeCut += wallClampResult.hingeCut;
      clampCut += wallClampResult.clampCut;
      notch += wallClampResult.notch;
      outages += wallClampResult.outages;
      });
      
    }
    // for sleeve over
    if(selectedContent.mountingClamps.sleeveOver?.length){
      selectedContent.mountingClamps.sleeveOver.forEach((record)=>{
      const sleeveOverResult = getMountingFabrication(
        record.item,
        record.count
      );
      oneInchHoles += sleeveOverResult.oneInchHoles;
      hingeCut += sleeveOverResult.hingeCut;
      clampCut += sleeveOverResult.clampCut;
      notch += sleeveOverResult.notch;
      outages += sleeveOverResult.outages;
      });
    }
    // for glass to glass
    if(selectedContent.mountingClamps.glassToGlass?.length){
      selectedContent.mountingClamps.glassToGlass.forEach((record)=>{
      const glassToGlassResult = getMountingFabrication(
        record.item,
        record.count
      );
      oneInchHoles += glassToGlassResult.oneInchHoles;
      hingeCut += glassToGlassResult.hingeCut;
      clampCut += glassToGlassResult.clampCut;
      notch += glassToGlassResult.notch;
      outages += glassToGlassResult.outages;
      });
    }
  }
  // for corner wall clamps
  if(selectedContent.cornerClamps.cornerWallClamp?.length){
    selectedContent.cornerClamps.cornerWallClamp.forEach((record)=>{
    const cornerWallClampResult = getMountingFabrication(
      record.item,
      record.count
    );
    oneInchHoles += cornerWallClampResult.oneInchHoles;
    hingeCut += cornerWallClampResult.hingeCut;
    clampCut += cornerWallClampResult.clampCut;
    notch += cornerWallClampResult.notch;
    outages += cornerWallClampResult.outages;
    });
  }
  // for corner sleeve over
  if(selectedContent.cornerClamps.cornerSleeveOver?.length){
    selectedContent.cornerClamps.cornerSleeveOver.forEach((record)=>{
      const cornerSleeveOverResult = getMountingFabrication(
        record.item,
        record.count
      );
      oneInchHoles += cornerSleeveOverResult.oneInchHoles;
      hingeCut += cornerSleeveOverResult.hingeCut;
      clampCut += cornerSleeveOverResult.clampCut;
      notch += cornerSleeveOverResult.notch;
      outages += cornerSleeveOverResult.outages;
      });
  }
  // for corner glass to glass
  if(selectedContent.cornerClamps.cornerGlassToGlass?.length){
    selectedContent.cornerClamps.cornerGlassToGlass.forEach((record)=>{
      const cornerGlassToGlassResult = getMountingFabrication(
        record.item,
        record.count
      );
      oneInchHoles += cornerGlassToGlassResult.oneInchHoles;
      hingeCut += cornerGlassToGlassResult.hingeCut;
      clampCut += cornerGlassToGlassResult.clampCut;
      notch += cornerGlassToGlassResult.notch;
      outages += cornerGlassToGlassResult.outages;
      });
  }
  // for sliding door system
  if (selectedContent.slidingDoorSystem?.item){
    const slidingDoorSystemResult = getGenericFabrication(
        selectedContent.slidingDoorSystem?.item,
        selectedContent.slidingDoorSystem?.count
      );
      oneInchHoles += slidingDoorSystemResult.oneInchHoles;
      hingeCut += slidingDoorSystemResult.hingeCut;
      clampCut += slidingDoorSystemResult.clampCut;
      notch += slidingDoorSystemResult.notch;
      outages += slidingDoorSystemResult.outages;
  }
  // for header
  if (selectedContent.header?.item){
    const headerResult = getGenericFabrication(
        selectedContent.header?.item,
        selectedContent.header?.count
      );
      oneInchHoles += headerResult.oneInchHoles;
      hingeCut += headerResult.hingeCut;
      clampCut += headerResult.clampCut;
      notch += headerResult.notch;
      outages += headerResult.outages;
  }
  // for hardware addons
  if(selectedContent.hardwareAddons.length){
    selectedContent.hardwareAddons.forEach((record)=>{
        const hardwareAddonResult = getGenericFabrication(
            record.item,
            record.count
          );
          oneInchHoles += hardwareAddonResult.oneInchHoles;
          hingeCut += hardwareAddonResult.hingeCut;
          clampCut += hardwareAddonResult.clampCut;
          notch += hardwareAddonResult.notch;
          outages += hardwareAddonResult.outages;
    })
  }
  // for create quote
  if (currentQuoteState === quoteState.CREATE) {
    let layoutNotchValue = selectedItem?.settings?.notch;
    notch += layoutNotchValue;
    let layoutOutageValue = selectedItem?.settings?.outages;
    outages += layoutOutageValue;
  }
  // if selected item is SINGLE BARN
  // if (selectedItem?.settings?.variant === layoutVariants.SINGLEBARN) {
  //   oneInchHoles += 6;
  // }
  // if selected item is DOUBLE BARN
  // if (selectedItem?.settings?.variant === layoutVariants.DOUBLEBARN) {
  //   oneInchHoles += 8;
  // }
  return { oneInchHoles, hingeCut, clampCut, notch, outages };
};

export const getHandleFabrication = (item, count) => {
  let oneInchHoles = 0;
  let hingeCut = 0;
  let clampCut = 0;
  let notch = 0;
  let outages = 0;
  let selectedItemHoles = item?.oneInchHoles > 0 ? item?.oneInchHoles : 2;

  oneInchHoles = count * selectedItemHoles;
  let selectedItemhingeCut = item?.hingeCut > 0 ? item?.hingeCut : 0;

  hingeCut = count * selectedItemhingeCut;
  let selectedItemClampCut = item?.clampCut > 0 ? item?.clampCut : 0;

  clampCut = count * selectedItemClampCut;
  let selectedItemNotch = item?.notch > 0 ? item?.notch : 0;

  notch = count * selectedItemNotch;
  let selectedItemOutages = item?.outages > 0 ? item?.outages : 0;

  outages = count * selectedItemOutages;
  return { oneInchHoles, hingeCut, clampCut, notch, outages };
};

export const getHingeFabrication = (item, count) => {
  let oneInchHoles = 0;
  let hingeCut = 0;
  let clampCut = 0;
  let notch = 0;
  let outages = 0;
  let selectedItemHoles = item?.oneInchHoles > 0 ? item?.oneInchHoles : 0;

  oneInchHoles = count * selectedItemHoles;
  let selectedItemHingeCut = item?.hingeCut > 0 ? item?.hingeCut : 1;

  hingeCut = count * selectedItemHingeCut;
  let selectedItemClampCut = item?.clampCut > 0 ? item?.clampCut : 0;

  clampCut = count * selectedItemClampCut;
  let selectedItemNotch = item?.notch > 0 ? item?.notch : 0;

  notch = count * selectedItemNotch;
  let selectedItemOutages = item?.outages > 0 ? item?.outages : 0;

  outages = count * selectedItemOutages;
  return { oneInchHoles, hingeCut, clampCut, notch, outages };
};

export const getMountingFabrication = (item, count) => {
  let oneInchHoles = 0;
  let hingeCut = 0;
  let clampCut = 0;
  let notch = 0;
  let outages = 0;
  let selectedItemHoles = item?.oneInchHoles > 0 ? item?.oneInchHoles : 0;

  oneInchHoles = count * selectedItemHoles;
  let selectedItemHingeCut = item?.hingeCut > 0 ? item?.hingeCut : 0;

  hingeCut = count * selectedItemHingeCut;
  let selectedItemClampCut = item?.clampCut > 0 ? item?.clampCut : 0;

  clampCut = count * selectedItemClampCut;
  let selectedItemNotch = item?.notch > 0 ? item?.notch : 0;

  notch = count * selectedItemNotch;
  let selectedItemOutages = item?.outages > 0 ? item?.outages : 0;

  outages = count * selectedItemOutages;
  return { oneInchHoles, hingeCut, clampCut, notch, outages };
};

export const getGenericFabrication = (item, count) => {
    let oneInchHoles = 0;
    let hingeCut = 0;
    let clampCut = 0;
    let notch = 0;
    let outages = 0;
    let selectedItemHoles = item?.oneInchHoles > 0 ? item?.oneInchHoles : 0;
  
    oneInchHoles = count * selectedItemHoles;
    let selectedItemHingeCut = item?.hingeCut > 0 ? item?.hingeCut : 0;
  
    hingeCut = count * selectedItemHingeCut;
    let selectedItemClampCut = item?.clampCut > 0 ? item?.clampCut : 0;
  
    clampCut = count * selectedItemClampCut;
    let selectedItemNotch = item?.notch > 0 ? item?.notch : 0;
  
    notch = count * selectedItemNotch;
    let selectedItemOutages = item?.outages > 0 ? item?.outages : 0;
  
    outages = count * selectedItemOutages;
    return { oneInchHoles, hingeCut, clampCut, notch, outages };
};