import { useEffect } from "react";
import { useAuth } from "../AuthProvider";
import classes from "./Login.module.css";
import { Form, Outlet, useNavigate, useActionData } from "react-router-dom";

function Login() {
  const navi = useNavigate();
  const actionData = useActionData();
  const failLogin = actionData?.error;
  const { setUser } = useAuth();

  useEffect(() => {
    if (actionData?.user) {
      console.log(actionData?.user);
      navi("/");
      return setUser(actionData.user);
    }
  }, [actionData]);

  return (
    <>
      <Outlet />
      <div className={classes.loginContainer}>
        <img className={classes.img} src="/bugi.png" alt="bugi" />

        <Form method="post" className={classes.form}>
          <h1>로그인</h1>
          <div className={classes.loginInput}>
            <input
              type="text"
              placeholder="아이디를 입력해주세요"
              name="member_id"
            />
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              name="password"
            />
          </div>
          {failLogin && (
            <span style={{ fontSize: "1.5vh", color: "red" }}>
              *아이디 혹은 비밀번호가 일치 하지 않습니다
            </span>
          )}

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

export async function action({ request }) {
  const formData = await request.formData();
  const urlEncodedData = new URLSearchParams(formData);
  const response = await fetch("http://localhost:9000/auth/login", {
    method: "POST",
    body: urlEncodedData,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    credentials: "include",
  });

  if (response.status === 200) {
    return { user: Object.fromEntries(formData) };
  } else {
    return { error: true };
  }
}
