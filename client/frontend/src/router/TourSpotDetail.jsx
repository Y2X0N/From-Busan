import ContentDetail from "../components/ContentDetail";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function TourSpotDetail() {
  const { id } = useParams();
  const [data, setData] = useState("");

  useEffect(() => {
    const loader = async () => {
      console.log("1");
      const response = await fetch(`http://localhost:9000/tourist/${id}`);
      const reqData = await response.json();
      console.log(reqData.touristSpot);
      setData(reqData.touristSpot);
    };
    loader();
  }, [id]);

  return <ContentDetail data={data} />;
}

export default TourSpotDetail;
