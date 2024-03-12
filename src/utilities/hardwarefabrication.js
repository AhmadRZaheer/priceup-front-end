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
  // for sliding door system
  if (selectedContent.slidingDoorSystem?.item){
    const slidingDoorSystemResult = getFabrication(
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
  if (selectedContent.slidingDoorSystem?.item){
    const headerResult = getFabrication(
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
        const hardwareAddonResult = getFabrication(
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
  if (selectedItem?.settings?.variant === layoutVariants.SINGLEBARN) {
    oneInchHoles += 6;
  }
  // if selected item is DOUBLE BARN
  if (selectedItem?.settings?.variant === layoutVariants.DOUBLEBARN) {
    oneInchHoles += 8;
  }
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

  hingeCut = selectedItemhingeCut;
  let selectedItemClampCut = item?.clampCut > 0 ? item?.clampCut : 0;

  clampCut = selectedItemClampCut;
  let selectedItemNotch = item?.notch > 0 ? item?.notch : 0;

  notch = selectedItemNotch;
  let selectedItemOutages = item?.outages > 0 ? item?.outages : 0;

  outages = selectedItemOutages;
  return { oneInchHoles, hingeCut, clampCut, notch, outages };
};

export const getHingeFabrication = (item, count) => {
  let oneInchHoles = 0;
  let hingeCut = 0;
  let clampCut = 0;
  let notch = 0;
  let outages = 0;
  let selectedItemHoles = item?.oneInchHoles > 0 ? item?.oneInchHoles : 0;

  oneInchHoles = selectedItemHoles;
  let selectedItemHingeCut = item?.hingeCut > 0 ? item?.hingeCut : 1;

  hingeCut = count * selectedItemHingeCut;
  let selectedItemClampCut = item?.clampCut > 0 ? item?.clampCut : 0;

  clampCut = selectedItemClampCut;
  let selectedItemNotch = item?.notch > 0 ? item?.notch : 0;

  notch = selectedItemNotch;
  let selectedItemOutages = item?.outages > 0 ? item?.outages : 0;

  outages = selectedItemOutages;
  return { oneInchHoles, hingeCut, clampCut, notch, outages };
};

export const getFabrication = (item, count) => {
    let oneInchHoles = 0;
    let hingeCut = 0;
    let clampCut = 0;
    let notch = 0;
    let outages = 0;
    let selectedItemHoles = item?.oneInchHoles > 0 ? item?.oneInchHoles : 0;
  
    oneInchHoles = selectedItemHoles;
    let selectedItemHingeCut = item?.hingeCut > 0 ? item?.hingeCut : 0;
  
    hingeCut = count * selectedItemHingeCut;
    let selectedItemClampCut = item?.clampCut > 0 ? item?.clampCut : 0;
  
    clampCut = selectedItemClampCut;
    let selectedItemNotch = item?.notch > 0 ? item?.notch : 0;
  
    notch = selectedItemNotch;
    let selectedItemOutages = item?.outages > 0 ? item?.outages : 0;
  
    outages = selectedItemOutages;
    return { oneInchHoles, hingeCut, clampCut, notch, outages };
};