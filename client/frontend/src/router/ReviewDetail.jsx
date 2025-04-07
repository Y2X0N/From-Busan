import classes from "./ReviewDetail.module.css";
import { ReactSummernoteLite } from "@easylogic/react-summernote-lite";
import { Form, useLoaderData, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";

function ReviewDetail() {
  const navi = useNavigate();
  const { user } = useAuth();
  const review = useLoaderData().review;
  const isFavorite = useLoaderData().isFavorite;

  function convertContent() {
    const contents = review.contents;
    const tmp = document.createElement("div");
    tmp.innerHTML = contents;
    return tmp.textContent || tmp.innerText || "";
  }

  function handleReturn() {
    navi("../review");
  }

  return (
    <div className={classes.writeContainer}>
      <Form method="post">
        <div className={classes.writeHeader}>
          <span>{review.title}</span>
          <div className={classes.topButton}>
            <div className={classes.writeBtnContainer}>
              <input
                className={classes.writeBtn}
                type="button"
                value="목록으로"
                onClick={handleReturn}
              />
            </div>
            {user && (
              <div className={classes.buttonContainer}>
                <div className={classes.buttons}>
                  {isFavorite && (
                    <button className={classes.icon}>
                      <img src="/heart.svg" alt="like" />
                    </button>
                  )}
                  {!isFavorite && (
                    <button className={classes.icon}>
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/803/803087.png"
                        alt="likeFilled"
                      />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <table className={classes.writeTable}>
          <tbody>
            <tr>
              <th scope="row" className={classes.th1}>
                리뷰장소
              </th>
              <td className={classes.td1}>
                <span>{review.review_place}</span>
              </td>
              <th scope="row" className={classes.th2}>
                좋아요수
              </th>
              <td className={classes.td2}>
                <span>{review.review_like}</span>
              </td>
              <th scope="row" className={classes.th2}>
                조회수
              </th>
              <td className={classes.td2}>
                <span>{review.hit}</span>
              </td>
            </tr>

            <tr>
              <th scope="row" className={classes.th1}>
                작성자
              </th>
              <td className={classes.td1}>
                <span>{review.member_id}</span>
              </td>
              <th scope="row" className={classes.th2}>
                작성일
              </th>
              <td colSpan="3" className={classes.td2}>
                <span>{review.created_time.split("T")[0]}</span>
              </td>
            </tr>
          </tbody>
        </table>

        <textarea
          className={classes.contentContainer}
          readOnly
          value={convertContent()}
        />
      </Form>
      <div className={classes.replyContainer}>
        <span className={classes.replyHeader}>댓글</span>
        <table className={classes.writeTable}>
          <tbody>
            <tr>
              <td scope="row">
                <span>{review.member_id}</span>
                <span>{review.created_time.split("T")[0]}</span>
                <div>{review.contents}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReviewDetail;

export async function loader({ params }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(apiUrl + `/review/${params.id}`, {
    credentials: "include",
  });
  const resData = await response.json();
  return resData;
}
