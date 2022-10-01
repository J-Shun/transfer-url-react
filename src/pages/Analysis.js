import { url, shortLinkRoute } from "../api/routes";
import { Container } from "../shared/Container";
import { useParams } from "react-router-dom";
import { useFetch } from "../api/api";
import { JellyTriangle } from "@uiball/loaders";
import { BrowserChart } from "../components/BrowserChart";
import { TimeChart } from "../components/TimeChart";

export const Analysis = () => {
  const { id } = useParams();
  const { data, isLoading } = useFetch(`${url + shortLinkRoute}/${id}`);
  const result = data?.pages?.results[0];
  const browserData = result?.browserClickData;
  const timeSeriesData = result?.clickTimeSeries;
  const osClickData = result?.osClickData;
  console.log(osClickData);

  if (isLoading) {
    return (
      <div className="icon-background">
        <JellyTriangle size={60} speed={1.75} color="#fcee0a" />;
      </div>
    );
  } else {
    return (
      <>
        <div style={{ marginTop: "6rem" }}></div>
        <Container>
          <TimeChart timeSeriesData={timeSeriesData} />
          <br />
          <br />
          <BrowserChart browserData={browserData} />
          <br />
          <br />
          <BrowserChart browserData={osClickData} />
        </Container>
      </>
    );
  }
};
