import { Form, Link, useLocation } from "react-router-dom";
import Modal from "./Modal";
import classes from "./ModalContents.module.css";
// import { useState } from "react";

function ModalContents() {
  const location = useLocation();
  const title = location.state.title;
  // const [findItem, setFindItem] = useState("");

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
            <Form className={classes.form}>
              <h1>{title}</h1>

              {title === "아이디 찾기" && (
                <>
                  <div className={classes.loginInfoContainer}>
                    <input type="text" placeholder="찾으시는 아이디의 이름" />
                    <input
                      type="text"
                      placeholder="찾으시는 아이디의 전화번호"
                    />
                  </div>
                  <div className={classes.loginInfoSubmit}>
                    <input type="submit" value="아이디 찾기" />
                  </div>
                </>
              )}

              {title === "비밀번호 찾기" && (
                <>
                  <div className={classes.loginInfoContainer}>
                    <input
                      type="text"
                      placeholder="찾으시는 패스워드의 아이디"
                    />
                    <input type="text" placeholder="찾으시는 패스워드의 이름" />
                    <input
                      type="text"
                      placeholder="찾으시는 패스워드의 전화번호"
                    />
                  </div>
                  <div className={classes.loginInfoSubmit}>
                    <input type="submit" value="비밀번호 찾기" />
                  </div>
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

// export async function action({ request }) {
//   const reqBody = request.formData();
//   const urlEncodedData = new URLSearchParams(reqBody);
//   console.log(urlEncodedData);
//   const response = await fetch("http://localhost:9000/member/", {
//     method: "POST",
//     body: urlEncodedData,
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     credentials: "include",
//   });
// }
