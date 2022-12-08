import { useContext } from "react";
import { DataContext } from "../../Store/Data-Context";
import classes from "./WinningModal.module.css";

const Modal = () => {
  const { displayModal, setDisplayModal, modalText } = useContext(DataContext);

  const hideModalHandler = (event) => {
    event.preventDefault();
    setDisplayModal("none");
  };

  const restartGameHandler = () => {
    window.location.reload();
  };

  return (
    <div
      id="myModal"
      style={{ display: `${displayModal}` }}
      className={classes.modal}
    >
      <div className={classes.modalContent}>
        <span className={classes.close} onClick={hideModalHandler}>
          &times;
        </span>
        <h1>
          {modalText.firstText} ! {modalText.secondText}
        </h1>
        <h1 onClick={restartGameHandler}>
          <u> Play Again !</u>
        </h1>
      </div>
    </div>
  );
};
export default Modal;
