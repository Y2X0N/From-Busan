import { Form, Link, useNavigate, useParams } from "react-router-dom";
import Modal from "./Modal";
import classes from "./ModalContents.module.css";
import { useState } from "react";
// import { useState } from "react";

function ModalContents() {
  const { path } = useParams();
  const [findItem, setFindItem] = useState(null);
  const [findItemError, setFindItemError] = useState(false);
  const navi = useNavigate();
  let title = "";

  switch (path) {
    case "findId":
      title = "아이디 찾기";
      break;
    case "findPassword":
      title = "비밀번호 찾기";
      break;
    case "checkPassword":
      title = "비밀번호 재확인";
      break;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    const body = JSON.stringify(formData);
    let apiUrl = import.meta.env.VITE_API_URL;

    if (title === "비밀번호 재확인") {
      apiUrl += "/member/checkPw";
      // const response = await fetch(apiUrl, {
      //   method: "POST",
      //   body: body,
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   credentials: "include",
      // });
      const response = {
        member_id: "test",
        password: "test",
        name: "test",
        birth: "1992-12-28",
        phone_number: "07089051410",
      };
      if (!response) {
        setFindItemError(true);
      } else if (response) {
        navi("/member/join", { state: { response: response } });
      }
    } else {
      if (title === "아이디 찾기") {
        apiUrl += "/member/findId";
      } else if (title === "비밀번호 찾기") {
        apiUrl += "/member/findPw";
      }

      const response = await fetch(apiUrl, {
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const resData = await response.text();

      if (!resData) {
        setFindItemError(true);
      }

      if (resData) {
        setFindItem(resData);
      }
    }
  }

  return (
    <>
      <Modal>
        <div className={classes.modalContainer}>
          <div className={classes.btnContainer}>
            <Link to={".."} className={classes.closeBtn}>
              <span>&times;</span>
            </Link>
          </div>
          <div className={classes.formContainer}>
            <img className={classes.img} src="/bugi.png" alt="bugi" />
            <Form className={classes.form} onSubmit={handleSubmit}>
              <h1>{title}</h1>
              {title === "아이디 찾기" && (
                <>
                  {findItem && <div>찾으시는 아이디는 {findItem}입니다</div>}
                  {!findItem && (
                    <>
                      {findItemError && (
                        <div>아래의 정보를 가진 아이디가 없습니다</div>
                      )}
                      <div className={classes.loginInfoContainer}>
                        <input
                          type="text"
                          placeholder="찾으시는 아이디의 이름"
                          name="name"
                        />
                        <input
                          type="text"
                          placeholder="찾으시는 아이디의 전화번호"
                          name="phone_number"
                        />
                      </div>
                      <div className={classes.loginInfoSubmit}>
                        <input type="submit" value="아이디 찾기" />
                      </div>
                    </>
                  )}
                </>
              )}

              {title === "비밀번호 찾기" && (
                <>
                  {findItem && (
                    <div>찾으시는 아이디의 비밀번호는 {findItem}입니다</div>
                  )}
                  {!findItem && (
                    <>
                      {findItemError && (
                        <div>아래의 정보를 가진 아이디가 없습니다</div>
                      )}
                      <div className={classes.loginInfoContainer}>
                        <input
                          type="text"
                          placeholder="찾으시는 패스워드의 아이디"
                          name="member_id"
                        />
                        <input
                          type="text"
                          placeholder="찾으시는 패스워드의 이름"
                          name="name"
                        />
                        <input
                          type="text"
                          placeholder="찾으시는 패스워드의 전화번호"
                          name="phone_number"
                        />
                      </div>
                      <div className={classes.loginInfoSubmit}>
                        <input type="submit" value="비밀번호 찾기" />
                      </div>
                    </>
                  )}
                </>
              )}

              {title === "비밀번호 재확인" && (
                <>
                  {!findItem && (
                    <>
                      {findItemError && (
                        <div>비밀번호가 틀렸습니다. 다시 입력해주세요</div>
                      )}
                      <div className={classes.loginInfoContainer}>
                        <input
                          type="text"
                          placeholder="비밀번호를 입력해주세요"
                          name="password"
                        />
                      </div>
                      <div className={classes.loginInfoSubmit}>
                        <input type="submit" value="정보변경으로" />
                      </div>
                    </>
                  )}
                </>
              )}
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ModalContents;
