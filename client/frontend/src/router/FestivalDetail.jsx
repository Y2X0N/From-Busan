import ContentDetail from "../components/ContentDetail";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function FestivalDetail() {
  const { id } = useParams();
  const [data, setData] = useState("");

  useEffect(() => {
    const loader = async () => {
      const response = await fetch(`http://localhost:9000/festival/${id}`);
      const reqData = await response.json();
      console.log(reqData);
      setData(reqData);
    };
    loader();
  }, [id]);

  return <ContentDetail data={data} />;
}

export default FestivalDetail;
