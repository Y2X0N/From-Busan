import { useState, useEffect } from "react";
import classes from "./ContentDetail.module.css";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { useAuth } from "../AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

function ContentDetail({ data, isFavorite, isWishList, restData }) {
  const location = useLocation();
  const navigate = useNavigate();
  const subject = location.pathname.split("/")[1];
  const { user } = useAuth();
  const [showDetail, setShowDetail] = useState("detailInfo");
  const [isFavoriteStat, setIsFavoriteStat] = useState(isFavorite);
  const [isWishListStat, setIsWishListStat] = useState(isWishList);
  const [clickItem, setClickItem] = useState(null);

  useEffect(() => {
    setIsFavoriteStat(isFavorite);
  }, [isFavorite]);

  useEffect(() => {
    setIsWishListStat(isWishList);
  }, [isWishList]);

  async function handleIsFavorite() {
    const response = await fetch(
      `http://localhost:9000${location.pathname}/like`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const resData = await response.json();
    setIsFavoriteStat(resData.favorite);
  }
  async function handleIsWishList() {
    const response = await fetch(
      `http://localhost:9000${location.pathname}/wishlist`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const resData = await response.json();
    setIsWishListStat(resData.wishList);
  }

  return (
    <>
      <div className={classes.detailContainer}>
        <div className={classes.titleContainer}>
          <h1>{data.main_title}</h1>
        </div>

        <nav className={classes.navContainer}>
          <span
            className={`${showDetail === "detailInfo" ? classes.active : ""}`}
            onClick={() => setShowDetail("detailInfo")}
          >
            상세 보기
          </span>
          <span
            className={`${showDetail === "useInfo" ? classes.active : ""}`}
            onClick={() => setShowDetail("useInfo")}
          >
            이용 정보
          </span>
          <span
            className={`${showDetail === "restInfo" ? classes.active : ""}`}
            onClick={() => setShowDetail("restInfo")}
          >
            주변 맛집 정보
          </span>
        </nav>

        <div className={classes.detailBodyContainer}>
          {showDetail === "detailInfo" && (
            <>
              <img src={data.main_img_normal} alt={data.main_title} />

              {user && (
                <div className={classes.buttonContainer}>
                  <div className={classes.buttons}>
                    {!isFavoriteStat && (
                      <button
                        className={classes.icon}
                        onClick={handleIsFavorite}
                      >
                        <img src="/heart.svg" alt="like" />
                      </button>
                    )}
                    {isFavoriteStat && (
                      <button
                        className={classes.icon}
                        onClick={handleIsFavorite}
                      >
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/803/803087.png"
                          alt="likeFilled"
                        />
                      </button>
                    )}
                    {!isWishListStat && (
                      <button
                        className={classes.icon}
                        onClick={handleIsWishList}
                      >
                        <img src="/bookmark.svg" alt="bookmark" />
                      </button>
                    )}
                    {isWishListStat && (
                      <button
                        className={classes.icon}
                        onClick={handleIsWishList}
                      >
                        <img src="/bookmarkFilled.svg" alt="bookmarkFilled" />
                      </button>
                    )}
                  </div>
                </div>
              )}
              <div className={classes.reviewBtn}>
                <input
                  type="button"
                  className={classes.findReviewButton}
                  value="관련 리뷰 찾기"
                  onClick={() =>
                    navigate(`/review/?searchText=${data.main_title}`)
                  }
                />
              </div>

              <div className={classes.detailExplain}>
                <p>{data.itemcntnts}</p>
              </div>
            </>
          )}

          {showDetail === "useInfo" && (
            <>
              <table className={classes.useInfoTable}>
                <tbody>
                  <tr>
                    <th>주소</th>
                    <td>{data.addr1}</td>
                  </tr>
                  <tr>
                    <th>전화번호</th>
                    <td>{data.cntct_tel}</td>
                  </tr>
                  <tr>
                    <th>관련 홈페이지</th>
                    <td>
                      <a href={data.homepage_url}>{data.homepage_url}</a>
                    </td>
                  </tr>
                  {subject === "festival" && (
                    <tr>
                      <th>복지시설</th>
                      <td>{data.middle_size_rm1}</td>
                    </tr>
                  )}
                  {subject === "tourist" && (
                    <tr>
                      <th>휴무일</th>
                      <td>{data.hldy_info}</td>
                    </tr>
                  )}

                  <tr>
                    <th>운영요일 및 시간</th>
                    <td>{data.usage_day_week_and_time}</td>
                  </tr>
                  <tr>
                    <th>이용 요금</th>
                    <td>{data.usage_amount}</td>
                  </tr>
                  <tr>
                    <th>교통 정보</th>
                    <td>{data.trfc_info}</td>
                  </tr>
                </tbody>
              </table>
            </>
          )}

          {showDetail === "restInfo" && (
            <div className={classes.restInfoContainer}>
              <div className={classes.routeFindButtonContainer}>
                <input
                  className={classes.routeFindButton}
                  type="button"
                  value="맛집 찾기"
                />
                <input
                  className={classes.routeFindButton}
                  type="button"
                  value="명소 찾기"
                />
              </div>

              <div className={classes.map}>
                <APIProvider apiKey={"AIzaSyALFwCG2TvwNdzJ7yJFWyGTfYn8fmrAhhE"}>
                  <Map
                    mapId={"dd1b7984afb1bbc9"}
                    defaultZoom={13}
                    defaultCenter={{ lat: data.lat, lng: data.lng }}
                  ></Map>
                  <AdvancedMarker
                    position={{ lat: data.lat, lng: data.lng }}
                    title={"clickable google.maps.Marker"}
                  >
                    <img
                      src="/festival.png"
                      style={{ width: "3vw", height: "3vh" }}
                      alt="Festival"
                    />
                  </AdvancedMarker>
                  {restData.map((item) => (
                    <div
                      key={item.restaurant_id}
                      onClick={() => {
                        setClickItem(
                          clickItem?.restaurant_id === item.restaurant_id
                            ? null
                            : item
                        );
                      }}
                    >
                      <AdvancedMarker
                        position={{ lat: item.lat, lng: item.lng }}
                        title={item.main_title}
                      >
                        <img
                          src="/restaurant.png"
                          style={{ width: "3vw", height: "3vh" }}
                          alt="Festival"
                        />
                      </AdvancedMarker>
                      {clickItem?.restaurant_id === item.restaurant_id && (
                        <InfoWindow
                          position={{ lat: item.lat, lng: item.lng }}
                          maxWidth={400}
                        >
                          <div className={classes.infoWindowContainer}>
                            <div className={classes.infoWindowHeader}>
                              <h2>{clickItem.main_title}</h2>
                            </div>
                            <div className={classes.infoWindowBody}>
                              <div className={classes.infoWindowImg}>
                                <img
                                  src={clickItem.main_img_thumb}
                                  alt={clickItem.main_title}
                                />
                              </div>
                              <div className={classes.infoWindowDetails}>
                                <p>
                                  <strong>주소:</strong> {clickItem.addr1}
                                </p>
                                <p>
                                  <strong>전화번호:</strong>{" "}
                                  {clickItem.cntct_tel}
                                </p>
                                <p>
                                  <strong>주요메뉴:</strong>{" "}
                                  {clickItem.rprsntv_menu}
                                </p>
                                <p>
                                  <strong>운영시간:</strong>{" "}
                                  {clickItem.usage_day_week_and_time}
                                </p>
                              </div>
                            </div>
                          </div>
                        </InfoWindow>
                      )}
                    </div>
                  ))}
                </APIProvider>
              </div>
              <div className="modal">
                <span className="close">&times;</span>
                <div id="modalText"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ContentDetail;
