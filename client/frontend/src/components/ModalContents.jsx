import { Form, Link, useParams } from "react-router-dom";
import Modal from "./Modal";
import classes from "./ModalContents.module.css";
import { useState } from "react";
// import { useState } from "react";

function ModalContents() {
  const { path } = useParams();
  const title = path === "checkid" ? "아이디 찾기" : "비밀번호 찾기";
  const [findItem, setFindItem] = useState(null);
  const [findItemError, setFindItemError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    const body = JSON.stringify(formData);
    let apiUrl = import.meta.env.VITE_API_URL;
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

    return response;
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

              <div id="countdown"></div>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ModalContents;
