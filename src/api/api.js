// import { useEffect, useState } from "react";
const url = "https://transport-url.herokuapp.com/";
const token = localStorage.getItem("token");
let headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

// POST, PATCH
export const sendData = async (method, route, data) => {
  const rawData = await fetch(url + route, {
    method: method.toUpperCase(),
    headers,
    body: JSON.stringify(data),
  });
  const result = await rawData.json();
  return result;
};

export const createShortLink = async (data) => {
  const rawData = await fetch(url + "user/shortUrl", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  const result = await rawData.json();
  return result;
};

export const getShortLinkList = async () => {
  const rawData = await fetch(url + "user/shortUrl", {
    method: "GET",
    headers,
  });
  const result = await rawData.json();
  return result;
};

// "user/shortUrl"

// export function useFetch() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [data, setData] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     setIsLoading(true);
//     console.log(headers);
//     fetch(url + "user/shortUrl", {
//       method: "GET",
//       headers,
//     })
//       .then((res) => res.json())
//       .then((json) => setData(json))
//       .catch((err) => setError(err))
//       .finally((result) => {
//         setIsLoading(false);
//         console.log(result);
//       });
//   }, []);

//   return { data, error, isLoading };
// }
