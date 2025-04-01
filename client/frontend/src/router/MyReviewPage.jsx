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
            <tr>
              <td>1</td>
              <td>대공원</td>
              <td>대공원제목</td>
              <td>
                <a>naver</a>
              </td>
              <td>오늘</td>
              <td>1</td>
              <td>1</td>
            </tr>

            <tr>
              <td colSpan="10">리뷰가 없습니다</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default MyReviewPage;
