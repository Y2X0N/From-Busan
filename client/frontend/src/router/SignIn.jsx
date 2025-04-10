import { Form, redirect, useLocation, useSubmit } from "react-router-dom";
import classes from "./SignIn.module.css";
import { useRef, useState } from "react";

function SignIn() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const idInput = useRef();
  const password = useRef();
  const passwordCheck = useRef();
  const phoneNumber = useRef();
  const submit = useSubmit();
  const location = useLocation();
  const userData = location.state?.response || null;
  const [idCheckError, setIdCheckError] = useState(false);
  const [passwordCheckError, setPasswordCheckError] = useState(false);
  const [idCheckerCount, setIdCheckerCount] = useState(0);

  async function handleIdCheck() {
    const id = idInput.current.value;
    const response = await fetch(`${apiUrl}/member/idCheck/${id}`);
    const result = await response.json();
    if (result === true) {
      setIdCheckError(true);
    } else {
      alert("사용 하실 수 있는 아이디 입니다");
      setIdCheckError(false);
      setIdCheckerCount((prev) => prev + 1);
    }
  }

  function handlePasswordCheck() {
    if (password.current.value !== passwordCheck.current.value) {
      setPasswordCheckError(true);
      return;
    }
    setPasswordCheckError(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (e.target[7].value === "회원가입") {
      if (idCheckerCount < 1) {
        idInput.current.focus();
        alert("아이디 중복 확인을 해주세요");
        return;
      }
    }

    const passwordValue = password.current.value;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{10,}$/;
    if (!passwordRegex.test(passwordValue)) {
      alert("비밀번호는 대소문자와 숫자를 조합한 10자리 이상이어야 합니다.");
      password.current.focus();
      return;
    }

    const phoneValue = e.target.phone_number.value;
    if (phoneValue.length !== 11) {
      phoneNumber.current.focus();
      alert("전화번호는 11자리가 필요합니다.");
      return;
    }
    submit(e.currentTarget);
  }

  return (
    <>
      {!userData && (
        <div className={classes.joinContainer}>
          <Form method="post" className={classes.form} onSubmit={handleSubmit}>
            <input type="hidden" name="actionType" value="join" />
            <div className={classes.logoContainer}>
              <h2>🌊부산에 오신걸 환영합니다</h2>
              <img className={classes.img} src="/bugi.png" alt="부기" />
            </div>
            <table>
              <tbody>
                <tr>
                  <td className={classes.firstTd}>아이디</td>
                  <td className={classes.secondTd}>
                    <input type="text" name="member_id" ref={idInput} />
                    <input
                      className={classes.btnIdCheck}
                      type="button"
                      value="중복확인"
                      onClick={handleIdCheck}
                    />
                    {idCheckError && (
                      <span className={classes.error}>
                        중복된 아이디가 있습니다. 새로운 아이디를 입력해주세요
                      </span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className={classes.firstTd}>비밀번호</td>
                  <td className={classes.secondTd}>
                    <input type="password" name="password" ref={password} />
                    <span className={classes.notice}>
                      대,소문자,숫자를 조합한 10자리 이상으로 설정해주세요
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className={classes.firstTd}>비밀번호 확인</td>
                  <td className={classes.secondTd}>
                    <input
                      type="password"
                      ref={passwordCheck}
                      onBlur={handlePasswordCheck}
                    />
                    {passwordCheckError && (
                      <span className={classes.error}>
                        비밀번호를 다시 확인해주세요
                      </span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className={classes.firstTd}>이름</td>
                  <td className={classes.secondTd}>
                    <input type="text" name="name" />
                  </td>
                </tr>
                <tr>
                  <td className={classes.firstTd}>생년월일</td>
                  <td className={classes.secondTd}>
                    <input
                      type="date"
                      name="birth"
                      max={new Date().toISOString().split("T")[0]}
                    />
                  </td>
                </tr>
                <tr>
                  <td className={classes.firstTd}>전화번호</td>
                  <td className={classes.secondTd}>
                    <input type="tel" name="phone_number" ref={phoneNumber} />
                    <span className={classes.notice}>
                      특수기호(/,-)등을 제외한 11자리 숫자를 입력해주세요
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className={classes.btnContainer}>
              <input
                className={classes.btnJoin}
                type="submit"
                value="회원가입"
              />
              <input className={classes.btnCancel} type="reset" value="취소" />
            </div>
          </Form>
        </div>
      )}
      {userData && (
        <div className={classes.joinContainer}>
          <Form method="post" className={classes.form} onSubmit={handleSubmit}>
            <input type="hidden" name="actionType" value="update" />
            <div className={classes.logoContainer}>
              <h2>개인정보 수정</h2>
              <img className={classes.img} src="/bugi.png" alt="부기" />
            </div>
            <table>
              <tbody>
                <tr>
                  <td className={classes.firstTd}>아이디</td>
                  <td className={classes.secondTd}>
                    <input
                      readOnly
                      type="text"
                      name="member_id"
                      value={userData.member_id}
                      ref={idInput}
                    />
                    <span className={classes.notice}>
                      아이디는 변경이 불가합니다
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className={classes.firstTd}>비밀번호</td>
                  <td className={classes.secondTd}>
                    <input type="password" name="password" ref={password} />
                    <span className={classes.notice}>
                      대,소문자,숫자를 조합한 10자리 이상으로 설정해주세요
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className={classes.firstTd}>비밀번호 확인</td>
                  <td className={classes.secondTd}>
                    <input
                      type="password"
                      ref={passwordCheck}
                      onBlur={handlePasswordCheck}
                    />
                    {passwordCheckError && (
                      <span className={classes.error}>
                        비밀번호를 다시 확인해주세요
                      </span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className={classes.firstTd}>이름</td>
                  <td className={classes.secondTd}>
                    <input
                      type="text"
                      defaultValue={userData.name}
                      name="name"
                    />
                  </td>
                </tr>
                <tr>
                  <td className={classes.firstTd}>생년월일</td>
                  <td className={classes.secondTd}>
                    <input
                      type="date"
                      defaultValue={userData.birth}
                      name="birth"
                      max={new Date().toISOString().split("T")[0]}
                    />
                  </td>
                </tr>
                <tr>
                  <td className={classes.firstTd}>전화번호</td>
                  <td className={classes.secondTd}>
                    <input
                      type="tel"
                      defaultValue={userData.phone_number}
                      name="phone_number"
                      ref={phoneNumber}
                    />
                    <span className={classes.notice}>
                      특수기호(/,-)등을 제외한 11자리 숫자를 입력해주세요
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className={classes.btnContainer}>
              <input
                className={classes.btnJoin}
                type="submit"
                value="정보수정"
              />
              <input className={classes.btnCancel} type="reset" value="취소" />
            </div>
          </Form>
        </div>
      )}
    </>
  );
}

export default SignIn;

export async function action({ request }) {
  let apiUrl = import.meta.env.VITE_API_URL;
  let message = "";
  const formData = await request.formData();
  const postData = Object.fromEntries(formData);
  const actionType = postData.actionType;

  if (actionType === "join") {
    apiUrl += "/auth/join";
    message = "가입을 완료했습니다. 로그인창으로 이동합니다";
  }

  if (actionType === "update") {
    apiUrl += "/member/updateMember";
    message = "정보변경을 완료했습니다. 로그인창으로 이동합니다";
  }

  const response = await fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  apiUrl = import.meta.env.VITE_API_URL;
  if (response.status === 200) {
    await fetch(apiUrl + "/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    alert(message);
    document.cookie =
      "JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    return redirect("/member/login");
  }
}
