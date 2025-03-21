import { useState } from "react";
import classes from "./ContentDetail.module.css";
import {
  APIProvider,
  Map,
  Marker,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";

function ContentDetail({ data }) {
  console.log(data);
  const [showDetail, setShowDetail] = useState("detailInfo");

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

              {/* Todo: 조건별화면표시제어 */}
              <div className={classes.buttonContainer}>
                <div className={classes.buttons}>
                  <a className={classes.icon}>
                    <img src="/heart.svg" alt="like" />
                  </a>
                  <a className={classes.icon}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/803/803087.png"
                      alt="likeFilled"
                    />
                  </a>
                </div>
                <div className={classes.buttons}>
                  <a className={classes.icon}>
                    <img src="/bookmark.svg" alt="bookmark" />
                  </a>
                  <a className={classes.icon}>
                    <img src="/bookmarkFilled.svg" alt="bookmarkFilled" />
                  </a>
                </div>
              </div>

              <input
                type="button"
                className={classes.findReviewButton}
                value="관련 리뷰 찾기"
              />

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
                  <tr>
                    <th>휴무일</th>
                    <td>{data.hldy_info}</td>
                  </tr>
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
                    clickable={true}
                    onClick={() => alert("marker was clicked!")}
                    title={"clickable google.maps.Marker"}
                  >
                    <img
                      src="/festival.png"
                      style={{ width: "3vw", height: "3vh" }}
                      alt="Festival"
                    />
                  </AdvancedMarker>
                </APIProvider>
              </div>
              <div class="modal">
                <span class="close">&times;</span>
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
