import classes from "./MyReviewPage.module.css";
import { useAuth } from "../AuthProvider";
import { useLoaderData, useNavigate } from "react-router-dom";

function MyReviewPage() {
  const { user } = useAuth();
  const loadData = useLoaderData();
  const navigate = useNavigate();

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
            {loadData.map((item) => (
              <tr
                style={{ cursor: "pointer" }}
                key={item.review_id}
                onClick={() => navigate(`/review/${item.review_id}`)}
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

            {loadData.length === 0 && (
              <tr>
                <td colSpan="7">작성하신 리뷰가 없습니다</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default MyReviewPage;

export async function loader() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(apiUrl + "/member/myReviewList", {
    credentials: "include",
  });
  const resData = await response.json();
  return resData;
}
