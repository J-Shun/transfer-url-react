import { url, getShortLinkList } from "../api/routes";
import { useParams } from "react-router-dom";
import { useFetch } from "../api/api";

export const Analysis = () => {
  const { id } = useParams();
  const { data, isLoading } = useFetch(url + getShortLinkList + id);
  console.log(data);
  return <h2 style={{ color: "#fff", fontSize: "3rem" }}>Analysis</h2>;
};
