export const toArray = (string) => {
  if (string.trim().length === 0) return [];
  return string.trim().split(" ");
};
