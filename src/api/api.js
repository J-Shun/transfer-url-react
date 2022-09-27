import { useEffect, useState } from "react";
const url = "https://transport-url.herokuapp.com/";
const token = localStorage.getItem("token");
let headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

// POST, PATCH
export const sendData = async (method, route, data) => {
  const rawData = await fetch(route, {
    method: method.toUpperCase(),
    headers,
    body: JSON.stringify(data),
  });
  const result = await rawData.json();
  return result;
};

// get data
export function useFetch(route) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetch(route, {
      method: "GET",
      headers,
    })
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => setError(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { data, error, isLoading };
}
