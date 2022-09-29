import { useEffect, useState } from "react";

// POST, PATCH
export const sendData = async (method, route, data) => {
  const rawData = await fetch(route, {
    method: method.toUpperCase(),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
  const result = await rawData.json();
  return result;
};

export const deleteData = async (method, route) => {
  const rawData = await fetch(route, {
    method: method.toUpperCase(),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const result = await rawData.json();
  return result;
};

// get data
export function useFetch(route, renderTrigger) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetch(route, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => setError(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, [route, renderTrigger]);

  return { data, error, isLoading };
}

// upload image
export const uploadImage = async (method, route, data) => {
  const rawData = await fetch(route, {
    method: method.toUpperCase(),
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: data,
  });
  const result = await rawData.json();
  return result;
};
