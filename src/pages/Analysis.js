import { url, shortLinkRoute } from "../api/routes";
import { Container } from "../shared/Container";
import { useParams } from "react-router-dom";
import { useFetch } from "../api/api";
import { BarChart } from "../components/BarChart";
import { TimeChart } from "../components/TimeChart";
import { PageLoading } from "../components/Loading";
import { Navigate } from "react-router-dom";

export const Analysis = () => {
  const { id } = useParams();
  const { data, isLoading } = useFetch(`${url + shortLinkRoute}/${id}`);
  const result = data.pages?.results[0];
  const browserData = result?.browserClickData;
  const timeSeriesData = result?.clickTimeSeries;
  const osClickData = result?.osClickData;

  if (data.message === "jwt malformed") return <Navigate to="/" />;
  if (isLoading) return <PageLoading />;
  return (
    <>
      <div style={{ marginTop: "6rem" }}></div>
      <Container>
        <TimeChart timeSeriesData={timeSeriesData} />
        <BarChart browserData={browserData} title="Browser" />
        <BarChart browserData={osClickData} title="System" />
      </Container>
    </>
  );
};
