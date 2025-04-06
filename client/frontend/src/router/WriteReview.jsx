import { ReactSummernoteLite } from "@easylogic/react-summernote-lite";
import { Form, useLoaderData, useNavigate } from "react-router-dom";
import classes from "./WriteReview.module.css";

function WriteReview() {
  const navi = useNavigate();
  const places = useLoaderData();
  console.log(places);

  function handleReturn() {
    navi("../review");
  }

  return (
    <div className={classes.writeContainer}>
      <Form method="post">
        <div className={classes.writeHeader}>
          <span>리뷰쓰기</span>
          <div className={classes.writeBtnContainer}>
            <input
              className={classes.writeBtn}
              type="button"
              value="목록으로"
              onClick={handleReturn}
            />
            <input className={classes.writeBtn} type="submit" value="등록" />
            <input className={classes.writeBtn} type="reset" value="취소" />
          </div>
        </div>
        <table className={classes.writeTable}>
          <tbody>
            <tr>
              <th scope="row">리뷰장소</th>
              <td>
                <input
                  type="text"
                  list="searchOptions"
                  style={{ width: "600px" }}
                />
                <datalist id="searchOptions">
                  {places.map((item) => (
                    <option key={item} value={item}></option>
                  ))}
                </datalist>
                <div class="error">에러표시장소</div>
                <div class="error">에러표시장소</div>
              </td>
            </tr>

            <tr>
              <th scope="row">제목</th>
              <td>
                <input type="text" style={{ width: "600px" }} />
                <div class="error">에러표시장소</div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="error">에러표시장소</div>
        <div id="summer-box">
          <ReactSummernoteLite
            id="sample"
            height="500px"
            placeholder="내용을 입력해주세요"
            onInit={({ note }) => {
              note.summernote("justifyLeft");
            }}
          />
        </div>
      </Form>
    </div>
  );
}

export default WriteReview;

export async function loader() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(apiUrl + "/review/places");
  const resData = await response.json();
  return resData;
}
