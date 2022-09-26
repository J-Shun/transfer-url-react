const url = "https://5193-218-161-104-220.jp.ngrok.io/";
const token = localStorage.getItem("token");
let headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export const userLogin = async (loginData) => {
  const rawData = await fetch(url + "user/sign_in", {
    method: "POST",
    headers,
    body: JSON.stringify(loginData),
  });
  const result = await rawData.json();
  return result;
};

export const userRegister = async (registerData) => {
  const rawData = await fetch(url + "user/sign_up", {
    method: "POST",
    headers,
    body: JSON.stringify(registerData),
  });
  const result = await rawData.json();
  return result;
};

export const userResetPassword = async (resetData) => {
  const rawData = await fetch(url + "user/reset_password", {
    method: "PATCH",
    headers,
    body: JSON.stringify(resetData),
  });
  const result = await rawData.json();
  return result;
};

export const userEditPassword = async (newPassword) => {
  const rawData = await fetch(url + "user/update_password", {
    method: "PATCH",
    headers,
    body: JSON.stringify(newPassword),
  });
  const result = await rawData.json();
  return result;
};
