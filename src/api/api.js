const url = "https://5193-218-161-104-220.jp.ngrok.io/";
let headers = { "Content-Type": "application/json" };

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
