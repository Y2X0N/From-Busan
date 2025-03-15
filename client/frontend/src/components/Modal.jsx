import classes from "./Modal.module.css";
import { useNavigate } from "react-router-dom";

const Modal = ({ children }) => {
  const navi = useNavigate();

  function closeModal() {
    navi("..");
  }

  return (
    <>
      <div className={classes.backdrop} onClick={closeModal}></div>
      <dialog open className={classes.modal}>
        {children}
      </dialog>
    </>
  );
};

export default Modal;
