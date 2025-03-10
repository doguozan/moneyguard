import { NavLink } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { BiStats } from "react-icons/bi";
import { FaMoneyBillWave } from "react-icons/fa";
import useMedia from "../../hooks/useMedia";
import styles from "./Navigation.module.css";

const Navigation = () => {
  const { isMobile } = useMedia();
  const getClasses = (isActive) =>
    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;

  return (
    <nav className={styles.navigation}>
      <NavLink to="/" className={({ isActive }) => getClasses(isActive)}>
        <div className={styles.linkIcon}>
          <MdHome className={styles.homeIcon} />
        </div>
        <span className={styles.linkText}>Home</span>
      </NavLink>
      <NavLink
        to="/statistics"
        className={({ isActive }) => getClasses(isActive)}
      >
        <div className={styles.linkIcon}>
          <BiStats className={styles.graphicIcon} />
        </div>
        <span className={styles.linkText}>Statistics</span>
      </NavLink>
      {isMobile && (
        <NavLink
          to="/currency"
          className={({ isActive }) => getClasses(isActive)}
        >
          <div className={styles.linkIcon}>
            <FaMoneyBillWave className={styles.currencyIcon} />
          </div>
          <span className={styles.linkText}>Currency</span>
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
