import classes from "./MyBookmark.module.css";
import { useAuth } from "../AuthProvider";
import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

function MyBookmark() {
  const { user } = useAuth();
  const [showList, setShowList] = useState("touristSpot");
  const loadData = useLoaderData();
  const touristSpotList = loadData.touristSpotList;
  const festivalList = loadData.festivalList;

  return (
    <>
      <div className={classes.container}>
        <div className={classes.pageTitle}>
          <div>
            <h2>{user.member_id}님의 찜목록</h2>
          </div>
        </div>

        <nav className={classes.navContainer}>
          <span
            className={`${showList === "touristSpot" ? classes.active : ""}`}
            onClick={() => setShowList("touristSpot")}
          >
            명소
          </span>
          <span
            className={`${showList === "festival" ? classes.active : ""}`}
            onClick={() => setShowList("festival")}
          >
            축제
          </span>
        </nav>
        {showList === "touristSpot" && (
          <>
            <div className={classes.ContentsContainer}>
              {touristSpotList.map((data) => (
                <div
                  className={classes.card}
                  style={{ color: "#009688" }}
                  key={Object.values(data)[0]}
                >
                  <div className={classes.imgBx}>
                    <img src={data.main_img_normal} />
                  </div>
                  <div className={classes.content}>
                    <h2>{data.main_title}</h2>
                    <p>
                      {data.itemcntnts.length > 50
                        ? data.itemcntnts.substring(0, 50) + "..."
                        : data.itemcntnts}
                    </p>

                    <div className={classes.listItem}>
                      <div>
                        <i
                          class="far fa-heart testHeart"
                          style={{
                            color: "#da202c",
                            fontSize: "20px",
                            marginRight: "4px",
                          }}
                          title="like"
                        ></i>
                        <span style={{ fontSize: "20px", color: "black" }}>
                          {data.place_like}
                        </span>
                      </div>
                      <div>
                        <i
                          class="fas fa-eye"
                          style={{ fontSize: "20px", marginRight: "4px" }}
                          title="hits"
                        ></i>
                        <span style={{ fontSize: "20px", color: "black" }}>
                          {data.hit}
                        </span>
                      </div>
                    </div>
                    <Link
                      className={classes.link}
                      to={`/tourist/${Object.values(data)[0]}`}
                    >
                      상세보기
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className={classes.noContent}>
              {touristSpotList.length === 0 && (
                <span>찜 한 명소가 없습니다</span>
              )}
            </div>
          </>
        )}

        {showList === "festival" && (
          <>
            <div className={classes.ContentsContainer}>
              {festivalList.map((data) => (
                <div
                  className={classes.card}
                  style={{ color: "#009688" }}
                  key={Object.values(data)[0]}
                >
                  <div className={classes.imgBx}>
                    <img src={data.main_img_normal} />
                  </div>
                  <div className={classes.content}>
                    <h2>{data.main_title}</h2>
                    <p>
                      {data.itemcntnts.length > 50
                        ? data.itemcntnts.substring(0, 50) + "..."
                        : data.itemcntnts}
                    </p>

                    <div className={classes.listItem}>
                      <div>
                        <i
                          class="far fa-heart testHeart"
                          style={{
                            color: "#da202c",
                            fontSize: "20px",
                            marginRight: "4px",
                          }}
                          title="like"
                        ></i>
                        <span style={{ fontSize: "20px", color: "black" }}>
                          {data.place_like}
                        </span>
                      </div>
                      <div>
                        <i
                          class="fas fa-eye"
                          style={{ fontSize: "20px", marginRight: "4px" }}
                          title="hits"
                        ></i>
                        <span style={{ fontSize: "20px", color: "black" }}>
                          {data.hit}
                        </span>
                      </div>
                    </div>
                    <Link
                      className={classes.link}
                      to={`/festival/${Object.values(data)[0]}`}
                    >
                      상세보기
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className={classes.noContent}>
              {festivalList.length === 0 && <span>찜 한 축제가 없습니다</span>}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default MyBookmark;

export async function loader() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(apiUrl + "/member/wishlist", {
    credentials: "include",
  });
  const resData = await response.json();
  return resData;
}
