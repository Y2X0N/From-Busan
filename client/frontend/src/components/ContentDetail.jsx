import { useState } from "react";

function ContentDetail({ data }) {
  const [showDetail, setShowDetail] = useState("detailInfo");

  return (
    <>
      <div id="container">
        <h1 id="main_title">{data.main_title}</h1>

        <nav class="tabnav">
          <span class="item" onClick={() => setShowDetail("detailInfo")}>
            상세 보기
          </span>
          <span class="item" onClick={() => setShowDetail("useInfo")}>
            이용 정보
          </span>
          <span class="item" onClick={() => setShowDetail("restInfo")}>
            주변 맛집 정보
          </span>
        </nav>

        <div id="spot-header-container">
          {showDetail === "detailInfo" && (
            <div class="itemcntnts" id="itemcntnts">
              <img src={data.main_img_normal} alt={data.main_title} />

              <div class="heartWish" th:if="${member_id}">
                <div class="left_area">
                  <a
                    th:unless="${#lists.contains(findFestivalLikes, member_id)}"
                    href="javascript:;"
                    class="icon heart"
                    th:onclick="|like(*{festival_id})|"
                  >
                    <img
                      class="like_img"
                      src="/image/heart-regular.svg"
                      alt="하트"
                    />
                  </a>
                  <a
                    th:if="${#lists.contains(findFestivalLikes, member_id)}"
                    href="javascript:;"
                    class="icon heart"
                    th:onclick="|like(*{festival_id})|"
                  >
                    <img
                      class="like_img"
                      src="https://cdn-icons-png.flaticon.com/512/803/803087.png"
                      alt="하트"
                    />
                  </a>
                </div>
                <div class="right_area">
                  <a
                    th:unless="${#lists.contains(findFestivalMyList, member_id)}"
                    href="javascript:;"
                    class="icon wish"
                    th:onclick="|myList(*{festival_id})|"
                  >
                    <img
                      class="wish_img"
                      src="/image/bookmark-regular%20(1).svg"
                      alt="찜하기"
                    />
                  </a>
                  <a
                    th:if="${#lists.contains(findFestivalMyList, member_id)}"
                    href="javascript:;"
                    class="icon wish"
                    th:onclick="|myList(*{festival_id})|"
                  >
                    <img
                      class="wish_img"
                      src="/image/bookmark-solid%20(2).svg"
                      alt="찜하기"
                    />
                  </a>
                </div>
              </div>
              <input
                type="button"
                class="btn btn-success"
                th:onclick="location.href='/review/reviewList?main_title=[[${festival.main_title}]]'"
                data-value="#{alert.relevant}"
                th:value="#{alert.relevant}"
              />
              <div class="explain">
                <p>{data.itemcntnts}</p>
              </div>
            </div>
          )}
          {showDetail === "useInfo" && (
            <div class="information" id="information">
              <table class="information-table" border="1px solid black">
                <tr>
                  <th>주소</th>
                  <td id="add1">{data.add1}</td>
                </tr>
                <tr>
                  <th>전화번호</th>
                  <td>{data.cntct_tel}</td>
                </tr>
                <tr>
                  <th>관련 홈페이지</th>
                  <td>
                    <a
                      href="#"
                      th:onclick="findFestival([[${festival.homepage_url}]])"
                      th:text="${festival.homepage_url}"
                    >
                      {data.homepage_url}
                    </a>
                  </td>
                </tr>
                <tr>
                  <th>휴무일</th>
                  <td id="hldy_info">{data.hldy}</td>
                </tr>
                <tr>
                  <th>운영요일 및 시간</th>
                  <td id="usage_day_week_and_time">
                    {data.usage_day_week_and_time}
                  </td>
                </tr>
                <tr>
                  <th>이용 요금</th>
                  <td id="usage_amount">{data.usage_amout}</td>
                </tr>
                <tr>
                  <th>교통 정보</th>
                  <td id="trfc_info">{data.trfc_info}</td>
                </tr>
              </table>
            </div>
          )}

          {showDetail === "restInfo" && (
            <div id="mapContainer">
              <div class="find">
                <input
                  class="findRT"
                  type="button"
                  onclick="getRestaurant()"
                  value="맛집 찾기"
                />
                <input
                  class="findRT"
                  type="button"
                  onclick="getDb()"
                  value="명소 찾기"
                />
              </div>

              <div id="map"></div>
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
