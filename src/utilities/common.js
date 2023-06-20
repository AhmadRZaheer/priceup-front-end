export const generateId = () => {
  return Date.now() + "";
};

export function createSlug(string) {
  return string
    .toLowerCase() // Convert the string to lowercase
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w-]+/g, "") // Remove non-word characters except hyphens
    .replace(/--+/g, "-") // Replace multiple hyphens with a single hyphen
    .replace(/^-+|-+$/g, ""); // Trim leading and trailing hyphens
}

export const backendURL = "http://localhost:5000";
