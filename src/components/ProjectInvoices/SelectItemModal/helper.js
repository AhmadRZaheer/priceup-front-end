export const searchItems = (list, search, type) => {
  let result = [];

  switch (type) {
    case "project":
      result = searchCustomers(list, search);
      break;
    case "customer":
      result = searchProjects(list, search);
      break;
    case "preview":
      result = searchPreviews(list, search);
      break;
    default:
      result = [];
  }

  return result;
};

const searchCustomers = (list, search) => {
  return list?.filter(
    (item) =>
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.email?.toLowerCase().includes(search.toLowerCase())
  );
};

const searchProjects = (list, search) => {
  return list?.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase())
  );
};

const searchPreviews = (list, search) => {
  return list;
};
