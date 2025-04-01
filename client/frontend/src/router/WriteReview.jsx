import { ReactSummernoteLite } from "@easylogic/react-summernote-lite";
import { Form, useNavigate } from "react-router-dom";
import classes from "./WriteReview.module.css";

function WriteReview() {
  const navi = useNavigate();

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
              <th>리뷰장소</th>
              <td>
                <input
                  type="text"
                  list="searchOptions"
                  style={{ width: "600px" }}
                />
                <datalist id="searchOptions">
                  <option value="하라주쿠"></option>
                  <option value="신주쿠"></option>
                </datalist>
                <div class="error">에러표시장소</div>
                <div class="error">에러표시장소</div>
              </td>
            </tr>

            <tr>
              <th>제목</th>
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
          />
        </div>
      </Form>
    </div>
  );
}

export default WriteReview;
