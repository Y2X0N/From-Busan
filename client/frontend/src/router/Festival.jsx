import ContentsList from "../components/ContentsList";

import { useLoaderData } from "react-router-dom";

const Festival = () => {
  const { festivalList: data, navi } = useLoaderData();

  return <ContentsList data={data} navi={navi} />;
};

export default Festival;

export async function loader() {
  const response = await fetch("http://localhost:9000/festival/list");
  const reqData = await response.json();
  console.log(reqData);
  return reqData;
}
