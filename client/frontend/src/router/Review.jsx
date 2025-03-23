import classes from "./Review.module.css";

function Review() {
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
              placeholder="검색어를 입력해주세요."
              // onChange={handleSearchText}
              // onKeyDown={handleKeyDown}
            />
            {/* <Link to={`./?searchText=${searchText}`}> */}
            <button type="button">검색</button>
            {/* </Link> */}
          </div>
        </div>

        <div class="review-container">
          <table class="review-table">
            <thead>
              <tr class="mainTitle">
                <th scope="col" class="th-num">
                  번호
                </th>
                <th scope="col" class="th-place">
                  장소
                </th>
                <th scope="col" class="th-title">
                  제목
                </th>
                <th scope="col" class="th-writer">
                  글쓴이
                </th>
                <th scope="col" class="th-date">
                  날짜
                </th>
                <th scope="col" class="th-like">
                  좋아요
                </th>
                <th scope="col" class="th-hit">
                  조회수
                </th>
              </tr>
            </thead>
            <tbody>
              {false && (
                <>
                  <th:block
                    th:each="review, reviewsStat: ${findReviewRank5}"
                    th:if="${navi.currentPage==1}"
                  >
                    <tr
                      th:if="${reviews}"
                      th:onclick="|location.href='@{/review/read(review_id=${review.review_id})}'|"
                      style="cursor:pointer;"
                      class="hover likeRanking"
                    >
                      <td
                        class="color"
                        th:text="${reviewsStat.count}"
                        style="color: red;"
                      ></td>
                      <td
                        id="review_place"
                        class="color"
                        th:text="${review.review_place}"
                        th:data-original="${review.review_place}"
                      ></td>
                      <th
                        th:text="${review.title}"
                        th:data-original="${review.title}"
                        id="title"
                      ></th>
                      <td th:text="${review.member_id}" class="center"></td>
                      <td th:text="${#temporals.format(review.created_time, 'yyyy-MM-dd')}"></td>
                      <td
                        th:text="${review.review_like}"
                        style="color: red;"
                      ></td>
                      <td th:text="${review.hit}"></td>
                    </tr>
                  </th:block>

                  <th:block th:each="review, reviewsStat: ${reviews}">
                    <th:block th:if="${navi.currentPage == 1 and reviewsStat.count <= 7}">
                      <tr
                        th:if="${reviews}"
                        th:onclick="|location.href='@{/review/read(review_id=${review.review_id})}'|"
                        style="cursor:pointer;"
                        class="hover"
                      >
                        <td class="color" th:text="${reviewsStat.count+3}"></td>
                        <td
                          id="review_place"
                          class="color"
                          th:text="${review.review_place}"
                          th:data-original="${review.review_place}"
                        ></td>
                        <th
                          th:text="${review.title}"
                          th:data-original="${review.title}"
                          id="title"
                        ></th>
                        <td th:text="${review.member_id}" class="center"></td>
                        <td th:text="${#temporals.format(review.created_time, 'yyyy-MM-dd')}"></td>
                        <td th:text="${review.review_like}"></td>
                        <td th:text="${review.hit}"></td>
                      </tr>
                    </th:block>
                    <th:block th:if="${navi.currentPage > 1 and reviewsStat.count <= 10}">
                      <tr
                        th:if="${reviews}"
                        th:onclick="|location.href='@{/review/read(review_id=${review.review_id})}'|"
                        style="cursor:pointer;"
                        class="hover"
                      >
                        <td class="color" th:text="${reviewsStat.count}"></td>
                        <td
                          id="review_place"
                          class="color"
                          th:text="${review.review_place}"
                          th:data-original="${review.review_place}"
                        ></td>
                        <th
                          th:text="${review.title}"
                          th:data-original="${review.title}"
                          id="title"
                        ></th>
                        <td th:text="${review.member_id}" class="center"></td>
                        <td th:text="${#temporals.format(review.created_time, 'yyyy-MM-dd')}"></td>
                        <td th:text="${review.review_like}"></td>
                        <td th:text="${review.hit}"></td>
                      </tr>
                    </th:block>
                  </th:block>
                </>
              )}

              {true && (
                <tr th:if="${reviews.empty}">
                  <td class="color" colspan="6">
                    리뷰가 없습니다
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div class="write-btn">
            <input
              class="input-btn"
              type="button"
              onclick="location.href='/review/write'"
              value="글쓰기"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Review;
