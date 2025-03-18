import classes from "./ContentsList.module.css";

import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const ContentsList = ({ data, navi }) => {
  const [searchText, setSearchText] = useState("");
  const [currentPageData, setCurrentPageData] = useState(data);
  const currentLocation = useLocation();

  function handleSearchText(event) {
    setSearchText(event.target.value);
  }

  useEffect(() => {
    const loader = async () => {
      if (currentLocation.search === "") {
        return;
      } else {
        try {
          const response = await fetch(
            `http://localhost:9000${currentLocation.pathname}list/${currentLocation.search}`
          );
          const reqData = await response.json();
          console.log(reqData);
          setCurrentPageData(reqData[Object.keys(reqData)[0]]);
        } catch (error) {
          console.log(error);
        }
      }
    };

    loader();
  }, [currentLocation]);

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
          {currentPageData.map((data) => (
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
                      style={{ color: "#da202c", fontSize: "20px" }}
                      title="like"
                    ></i>
                    <span style={{ fontSize: "20px" }}>{data.place_like}</span>
                  </div>
                  <div>
                    <i
                      class="fas fa-eye"
                      style={{ fontSize: "20px" }}
                      title="hits"
                    ></i>
                    <span style={{ fontSize: "20px" }}>{data.hit}</span>
                  </div>
                </div>
                <Link
                  className={classes.link}
                  to={`./${Object.values(data)[0]}`}
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
              to={`./?page=${
                navi.currentPage - navi.pagePerGroup
              }&searchText=${searchText}`}
            >
              &lt;&lt;
            </Link>
          )}

          {navi.currentPage - 1 > 0 && (
            <Link
              to={`./?page=${navi.currentPage - 1}&searchText=${searchText}`}
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
                    to={`./?page=${counter}&searchText=${searchText}`}
                  >
                    {counter}
                  </Link>
                );
              }
            )}

          {navi.currentPage < navi.totalPageCount && (
            <Link
              to={`./?page=${navi.currentPage + 1}&searchText=${searchText}`}
            >
              &gt;
            </Link>
          )}

          {navi.currentPage + navi.pagePerGroup < navi.totalPageCount && (
            <Link
              to={`./?page=${
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
