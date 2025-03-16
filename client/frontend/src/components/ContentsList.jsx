import classes from "./ContentsList.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const ContentsList = ({ data, navi }) => {
  const [searchText, setSearchText] = useState("");

  function handleSearchText(event) {
    setSearchText(event.target.value);
  }

  return (
    <>
      <div className={classes.contentsContainer}>
        <div className={classes.searchContainer}>
          <div className={classes.searchBar}>
            <input
              type="search"
              placeholder="명소를 입력해주세요."
              onChange={handleSearchText}
            />
            {/* <datalist id="searchOptions">
              <option th:each="festival : ${searchFes}">
                <span
                  th:text="${festival.main_title}"
                  id="searchName"
                  th:data-original="*{festival.main_title}"
                ></span>
              </option>
            </datalist> */}
            <button type="button">검색</button>
          </div>
        </div>

        <div className={classes.ContentsContainer}>
          {data.map((data) => (
            <div
              className={classes.card}
              style={{ color: "#009688" }}
              key={data.tourist_Spot_id}
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
                      style={{ color: "#da202c", fontSize: "20px" }}
                      title="like"
                    ></i>
                    <span
                      text={data.place_like}
                      style={{ fontSize: "20px" }}
                    ></span>
                  </div>
                  <div>
                    <i
                      class="fas fa-eye"
                      style={{ fontSize: "20px" }}
                      title="hits"
                    ></i>
                    <span text={data.hit} style={{ fontSize: "20px" }}></span>
                  </div>
                </div>
                <Link
                  className={classes.link}
                  to={`/festival_id=${data.touristSpot_id}`}
                >
                  상세보기
                </Link>
              </div>
            </div>
          ))}

          <div>
            {!data && (
              <span className={classes.color}>찾으시는 명소가 없습니다</span>
            )}
          </div>
        </div>

        <div id="navigator" className="pageNumber">
          {navi.currentPage - navi.pagePerGroup > 0 && (
            <Link
              to={`/festival/list?page=${
                navi.currentPage - navi.pagePerGroup
              }&searchText=${searchText}`}
            >
              &lt;&lt;
            </Link>
          )}

          {navi.currentPage - 1 > 0 && (
            <Link
              to={`/festival/list?page=${
                navi.currentPage - 1
              }&searchText=${searchText}`}
            >
              &lt;
            </Link>
          )}

          {navi.endPageGroup !== 0 &&
            [...Array(navi.endPageGroup - navi.startPageGroup + 1)].map(
              (_, index) => {
                const counter = navi.startPageGroup + index;
                return (
                  <Link
                    key={counter}
                    to={`/festival/list?page=${counter}&searchText=${searchText}`}
                  >
                    {counter}
                  </Link>
                );
              }
            )}

          {navi.currentPage < navi.totalPageCount && (
            <Link
              to={`/festival/list?page=${
                navi.currentPage + 1
              }&searchText=${searchText}`}
            >
              &gt;
            </Link>
          )}

          {navi.currentPage + navi.pagePerGroup < navi.totalPageCount && (
            <Link
              to={`/festival/list?page=${
                navi.currentPage + navi.pagePerGroup
              }&searchText=${searchText}`}
            >
              &gt;&gt;
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default ContentsList;
