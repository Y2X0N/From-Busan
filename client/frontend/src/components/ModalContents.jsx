import { Form, useLocation } from "react-router-dom";
import Modal from "./Modal";
import classes from "./ModalContents.module.css";

function ModalContents() {
  const location = useLocation();
  const title = location.state.title;

  return (
    <>
      <Modal>
        <div className={classes.modalContainer}>
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
