import { useNavigate } from "react-router-dom";
import classes from "./Modal.module.css";

function Modal({ children, changeModalHandler }) {
  const navigation = useNavigate();

  function onCloseNavi() {
    navigation("..");
  }
  return (
    <>
      <div className={classes.backdrop} onClick={onCloseNavi}></div>
      <dialog open className={classes.modal}>
        {children}
      </dialog>
    </>
  );
}

export default Modal;
