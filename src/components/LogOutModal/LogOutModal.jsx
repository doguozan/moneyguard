import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "/src/redux/Auth/operations";
import styles from "./LogOutModal.module.css";

import LogOutModalSvg from "./LogOutModalSvg";
import { setToken } from "../../config/userTransactionApi";

// eslint-disable-next-line react/prop-types
const LogOutModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const token = useSelector((state) => state.auth.token);

  const handleConfirmLogout = () => {
    dispatch(logoutThunk());
    onClose();
  };

  const handleCancelLogout = () => {
    onClose();
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  useEffect(() => {
    if (token) {
      setToken(token);
    }
  }, [token]);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} ref={modalRef}>
        <div>
          <LogOutModalSvg />
          <h3 className={styles.modalTitle}>Money Guard</h3>
        </div>
        <p className={styles.modalPElem}>Are you sure you want to log out?</p>
        <div className={styles.btnDiv}>
          <button
            className={styles.confirmButton}
            onClick={handleConfirmLogout}
          >
            Logout
          </button>
          <button className={styles.cancelButton} onClick={handleCancelLogout}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogOutModal;
