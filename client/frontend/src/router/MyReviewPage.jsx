import classes from "./MyReviewPage.module.css";
import { useAuth } from "../AuthProvider";

function MyReviewPage() {
  const { user } = useAuth();

  return (
    <>
      <div className={classes.contentsContainer}>
        <div className={classes.pageTitle}>
          <div>
            <h2>{user.member_id}님의 작성후기</h2>
          </div>
        </div>

        <table className={classes.reviewTable}>
          <thead>
            <tr className={classes.mainTitle}>
              <th>번호</th>
              <th>장소</th>
              <th>제목</th>
              <th>글쓴이</th>
              <th>날짜</th>
              <th>좋아요</th>
              <th>조회수</th>
            </tr>
          </thead>
          <tbody>
            {false && (
              <>
                <tr
                  th:if="${reviews}"
                  th:each="review, reviewsStat: ${reviews}"
                >
                  <td class="color" th:text="${reviewsStat.count}"></td>
                  <td
                    class="color"
                    th:text="${review.review_place}"
                    id="review_place"
                    th:data-original="${review.review_place}"
                  ></td>
                  <th>
                    <a
                      th:text="${review.title}"
                      th:data-original="${review.title}"
                      id="title"
                      th:href="@{/review/read(review_id=${review.review_id})}"
                    ></a>
                  </th>
                  <td th:text="${review.member_id}" class="center"></td>
                  <td th:text="${#temporals.format(review.created_time, 'yyyy-MM-dd')}"></td>
                  <td th:text="${review.hit}"></td>
                </tr>
                <tr th:if="${reviews.empty}">
                  <td class="color" colspan="6">
                    [[#{alert.noreviews}]]
                  </td>
                </tr>
              </>
            )}

            {true && (
              <tr>
                <td colspan="10">리뷰가 없습니다</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default MyReviewPage;
