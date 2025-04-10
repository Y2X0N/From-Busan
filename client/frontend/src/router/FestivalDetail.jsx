import ContentDetail from "../components/ContentDetail";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function FestivalDetail() {
  const { id } = useParams();
  const [data, setData] = useState("");
  const [restData, setRestData] = useState("");
  const [isFavorite, setIsFavorite] = useState(null);
  const [isWishList, setIsWishList] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const loader = async () => {
      const response = await fetch(`${apiUrl}/festival/${id}`, {
        credentials: "include",
      });
      const resData = await response.json();
      setData(resData.festival);
      setIsFavorite(resData.isFavorite);
      setIsWishList(resData.isWishList);
    };
    loader();
  }, [id]);

  useEffect(() => {
    const loader = async () => {
      const response = await fetch(`${apiUrl}/restaurant/festival/${id}`, {
        credentials: "include",
      });
      const resData = await response.json();
      setRestData(resData);
    };
    loader();
  }, [id]);

  return (
    <ContentDetail
      data={data}
      restData={restData}
      isFavorite={isFavorite}
      isWishList={isWishList}
    />
  );
}

export default FestivalDetail;
