import { Form } from "react-router-dom";
import classes from "./SignIn.module.css";

function SignIn() {
  return (
    <>
      <div className={classes.joinContainer}>
        <Form method="post" className={classes.form}>
          <div className={classes.logoContainer}>
            <h2>🌊부산에 오신걸 환영합니다</h2>
            <img className={classes.img} src="/bugi.png" alt="부기" />
          </div>
          <table>
            <tbody>
              <tr>
                <td className={classes.firstTd}>아이디</td>
                <td className={classes.secondTd}>
                  <input type="text" />
                  <input
                    className={classes.btnIdCheck}
                    type="button"
                    value="중복확인"
                  />
                  <span className={classes.error}>에러표시부분</span>
                </td>
              </tr>
              <tr>
                <td className={classes.firstTd}>비밀번호</td>
                <td className={classes.secondTd}>
                  <input type="password" />
                  <span className={classes.error}>에러표시부분</span>
                </td>
              </tr>
              <tr>
                <td className={classes.firstTd}>비밀번호 확인</td>
                <td className={classes.secondTd}>
                  <input type="password" />
                  <span className={classes.error}>에러표시부분</span>
                </td>
              </tr>
              <tr>
                <td className={classes.firstTd}>이름</td>
                <td className={classes.secondTd}>
                  <input type="text" />
                  <span className={classes.error}>에러표시부분</span>
                </td>
              </tr>
              <tr>
                <td className={classes.firstTd}>생년월일</td>
                <td className={classes.secondTd}>
                  <input type="date" />
                  <span className={classes.error}>에러표시부분</span>
                </td>
              </tr>
              <tr>
                <td className={classes.firstTd}>전화번호</td>
                <td className={classes.secondTd}>
                  <input type="tel" />
                  <span className={classes.error}>에러표시부분</span>
                </td>
              </tr>
            </tbody>
          </table>

          <div className={classes.btnContainer}>
            <input className={classes.btnJoin} type="submit" value="회원가입" />
            <input className={classes.btnCancel} type="reset" value="취소" />
          </div>
        </Form>
      </div>
    </>
  );
}

export default SignIn;
