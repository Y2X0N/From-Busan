import ContentDetail from "../components/ContentDetail";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function FestivalDetail() {
  const { id } = useParams();
  const [data, setData] = useState("");
  const [isFavorite, setIsFavorite] = useState(null);
  const [isWishList, setIsWishList] = useState(null);

  useEffect(() => {
    const loader = async () => {
      const response = await fetch(`http://localhost:9000/festival/${id}`, {
        credentials: "include",
      });
      const reqData = await response.json();
      setData(reqData.festival);
      setIsFavorite(reqData.isFavorite);
      setIsWishList(reqData.isWishList);
    };
    loader();
  }, [id]);

  return (
    <ContentDetail
      data={data}
      isFavorite={isFavorite}
      isWishList={isWishList}
    />
  );
}

export default FestivalDetail;
