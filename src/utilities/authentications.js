import { userRoles } from "./constants";

export const isAuthenticated = (decodedToken) => {
  return !!decodedToken;
};

export const isSuperAdmin = (decodedToken) => {
  return decodedToken?.role === userRoles.SUPER_ADMIN;
};

export const isAdmin = (decodedToken) => {
  return decodedToken?.role === userRoles.ADMIN;
};

export const isStaff = (decodedToken) => {
  return decodedToken?.role === userRoles.STAFF;
};

export const isCustomAdmin = (decodedToken) => {
  return decodedToken?.role === userRoles.CUSTOM_ADMIN;
};

export const getHomepageURL = (decodedToken) => {
  if (isSuperAdmin(decodedToken)) {
    return "/admin";
  } else if (isAdmin(decodedToken)) {
    return "/overview";
  } else if (isCustomAdmin(decodedToken)) {
    return "/locations";
  } else if (isStaff(decodedToken)) {
    return "/staff";
  } else {
    return "/";
  }
};
