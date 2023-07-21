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

export const evaluateFormula = (
  formulaString,
  a = 0,
  b = 0,
  c = 0,
  d = 0,
  e = 0,
  f = 0
) => {
  try {
    if (formulaString.length) {
      // Replace 'a', 'b', and 'c' in the formula string with their respective values
      const substitutedFormula = formulaString
        .replace(/a/g, a)
        .replace(/b/g, b)
        .replace(/c/g, c)
        .replace(/d/g, d)
        .replace(/e/g, e)
        .replace(/f/g, f);

      // Evaluate the formula using eval()
      const result = eval(substitutedFormula);
      return result;
    } else {
      return 0;
    }
  } catch (error) {
    console.error("Error evaluating formula:", error);
    return 0;
  }
};
