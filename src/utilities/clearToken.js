export const clearToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("email");
};
