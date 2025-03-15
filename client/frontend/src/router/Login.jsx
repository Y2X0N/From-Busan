import classes from "./Login.module.css";

import { Form, Outlet, useNavigate } from "react-router-dom";

function Login() {
  const navi = useNavigate();

  return (
    <>
      <Outlet />
      <div className={classes.loginContainer}>
        <img className={classes.img} src="/bugi.png" alt="bugi" />

        <Form method="post" className={classes.form}>
          <h1>로그인</h1>
          <div className={classes.loginInput}>
            <input type="text" placeholder="아이디를 입력해주세요" />
            <input type="password" placeholder="비밀번호를 입력해주세요" />
          </div>

          <div className={classes.loginSubmit}>
            <input type="submit" value="로그인" />
            <input
              type="button"
              value="아이디 찾기"
              onClick={() => {
                navi("./check", { state: { title: "아이디 찾기" } });
              }}
            />
            <input
              type="button"
              value="비밀번호 찾기"
              onClick={() => {
                navi("./check", { state: { title: "비밀번호 찾기" } });
              }}
            />
          </div>
        </Form>
      </div>
    </>
  );
}

export default Login;
