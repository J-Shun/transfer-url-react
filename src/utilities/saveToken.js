export const saveToken = (result) => {
  localStorage.setItem("token", result.token);
  localStorage.setItem("user", result.name);
  localStorage.setItem("email", result.email);
};
