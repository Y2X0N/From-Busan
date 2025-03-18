import ContentsList from "../components/ContentsList";

import { useLoaderData } from "react-router-dom";

function TourSpot() {
  const { findAllTourist: data, navi } = useLoaderData();

  return <ContentsList data={data} navi={navi} />;
}

export default TourSpot;

export async function loader() {
  const response = await fetch("http://localhost:9000/tourist/list");
  const reqData = await response.json();
  return reqData;
}
