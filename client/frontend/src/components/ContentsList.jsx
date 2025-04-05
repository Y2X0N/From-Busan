import classes from "./ContentsList.module.css";

import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ContentsList = ({ data, navi }) => {
  const [searchText, setSearchText] = useState("");
  const [currentPageData, setCurrentPageData] = useState(data);
  const [currentNavi, setCurrentNavi] = useState(navi);
  const currentLocation = useLocation();
  const navigate = useNavigate();

  function handleSearchText(event) {
    setSearchText(event.target.value);
  }
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      navigate(`./?searchText=${searchText}`);
    }
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
          setCurrentPageData(reqData[Object.keys(reqData)[0]]);
          setCurrentNavi(reqData[Object.keys(reqData)[1]]);
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
              onKeyDown={handleKeyDown}
            />
            <Link to={`./?searchText=${searchText}`}>
              <button type="button">검색</button>
            </Link>
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
                  to={`./${Object.values(data)[0]}`}
                >
                  상세보기
                </Link>
              </div>
            </div>
          ))}

          {currentPageData.length === 0 && (
            <span className={classes.color}>찾으시는 명소가 없습니다</span>
          )}
        </div>

        <div className={classes.pageContainer}>
          {currentNavi.currentPage - currentNavi.pagePerGroup > 0 && (
            <NavLink
              to={`./?page=${
                currentNavi.currentPage - currentNavi.pagePerGroup
              }&searchText=${searchText}`}
            >
              ≪
            </NavLink>
          )}

          {currentNavi.currentPage - 1 > 0 && (
            <NavLink
              to={`./?page=${
                currentNavi.currentPage - 1
              }&searchText=${searchText}`}
            >
              ＜
            </NavLink>
          )}

          {currentNavi.endPageGroup !== 0 &&
            [
              ...Array(
                currentNavi.endPageGroup - currentNavi.startPageGroup + 1
              ),
            ].map((_, index) => {
              const counter = currentNavi.startPageGroup + index;
              return (
                <NavLink
                  key={counter}
                  to={`./?page=${counter}&searchText=${searchText}`}
                  className={({ isActive }) =>
                    (isActive &&
                      currentLocation.search.includes(`page=${counter}`)) ||
                    (currentLocation.search === "" && counter === 1)
                      ? classes.active
                      : ""
                  }
                >
                  {counter}
                </NavLink>
              );
            })}

          {currentNavi.currentPage < currentNavi.totalPageCount && (
            <NavLink
              to={`./?page=${
                currentNavi.currentPage + 1
              }&searchText=${searchText}`}
            >
              ＞
            </NavLink>
          )}

          {currentNavi.currentPage + currentNavi.pagePerGroup <=
            currentNavi.totalPageCount && (
            <NavLink
              to={`./?page=${
                currentNavi.currentPage + currentNavi.pagePerGroup
              }&searchText=${searchText}`}
            >
              ≫
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
};

export default ContentsList;
