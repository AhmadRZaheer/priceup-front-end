import { userRoles } from "./constants";

export const getAssignedLocationName = (row, locationsList) => {
    let matchingLocationNames = [];
  
    if (locationsList && locationsList.length > 0) {
      switch (row?.role) {
        case userRoles.STAFF:
          const { haveAccessTo } = row;
          matchingLocationNames = haveAccessTo
            ?.map((accessToID) =>
              locationsList?.find(
                (location) => location._id === accessToID
              )
            )
            ?.filter((match) => match)
            ?.map((match) => match.name);
          break;
        case userRoles.CUSTOM_ADMIN:
          const { locationsAccess } = row;
          matchingLocationNames = locationsAccess
            ?.map((accessToID) =>
              locationsList?.find(
                (location) => location._id === accessToID
              )
            )
            ?.filter((match) => match)
            ?.map((match) => match.name);
          break;
        default:
          matchingLocationNames = [];
          break;
      }
    }
    return matchingLocationNames?.length ? matchingLocationNames.join(", ") : "Not added to any location";
  }