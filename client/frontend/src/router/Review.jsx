import { useState } from "react";
import { useAuth } from "../AuthProvider";
import classes from "./Review.module.css";
import {
  Link,
  useLoaderData,
  useLocation,
  NavLink,
  useNavigate,
} from "react-router-dom";
function Review() {
  const { user } = useAuth();
  const loadData = useLoaderData();
  const [currentNavi, setCurrentNavi] = useState(loadData.navi);
  const [searchText, setSearchText] = useState("");
  const currentLocation = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(currentLocation.search);
  const searchTexts = decodeURIComponent(searchParams.get("searchText") || "");

  return (
    <>
      <div className={classes.contentsContainer}>
        <div className={classes.pageTitle}>
          <div>
            <h2>후기 게시판</h2>
          </div>
        </div>

        <div className={classes.searchContainer}>
          <div className={classes.searchBar}>
            <input
              type="search"
              placeholder={searchTexts ? searchTexts : "검색어를 입력해주세요."}
              // onChange={handleSearchText}
              // onKeyDown={handleKeyDown}
            />
            {/* <Link to={`./?searchText=${searchText}`}> */}
            <button type="button">검색</button>
            {/* </Link> */}
          </div>
        </div>

        <table className={classes.reviewTable}>
          <thead>
            <tr>
              <th scope="col" className={classes.th1}>
                번호
              </th>
              <th scope="col" className={classes.th2}>
                장소
              </th>
              <th scope="col" className={classes.th4}>
                제목
              </th>
              <th scope="col" className={classes.th3}>
                글쓴이
              </th>
              <th scope="col" className={classes.th2}>
                날짜
              </th>
              <th scope="col" className={classes.th1}>
                좋아요
              </th>
              <th scope="col" className={classes.th1}>
                조회수
              </th>
            </tr>
          </thead>
          <tbody>
            {loadData.reviews.map((item) => (
              <tr
                style={{ cursor: "pointer" }}
                class="hover likeRanking"
                key={item.review_id}
                onClick={() => navigate(`./${item.review_id}`)}
              >
                <td style={{ color: "red" }}>{item.review_id}</td>
                <td>{item.review_place}</td>
                <td>{item.title}</td>
                <td>{item.member_id}</td>
                <td>{item.created_time.split("T")[0]}</td>
                <td style={{ color: "red" }}>{item.review_like}</td>
                <td>{item.hit}</td>
              </tr>
            ))}

            {loadData.reviews.length === 0 && (
              <tr>
                <td colSpan="7">리뷰가 없습니다</td>
              </tr>
            )}
          </tbody>
        </table>

        {user && (
          <div className={classes.writeBtn}>
            <Link to={"./write"}>
              <input type="button" value="글쓰기" />
            </Link>
          </div>
        )}

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
}

export default Review;

export async function loader({ request }) {
  const url = new URL(request.url);
  const searchText = url.searchParams?.get("searchText");
  let apiUrl = import.meta.env.VITE_API_URL;
  if (searchText) {
    apiUrl += `/review/list/?searchText=${searchText}`;
  } else {
    apiUrl += "/review/list";
  }
  const response = await fetch(apiUrl);
  const resData = await response.json();
  console.log(resData);
  return resData;
}
