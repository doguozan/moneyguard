import { useEffect } from "react";
import { useDispatch } from "react-redux";
import TransactionList from "../TransactionList/TransactionList";
import Balance from "../Balance/Balance";
import { getTransactions } from "../../redux/Transactions/operations";
import Navigation from "../Navigation/Navigation";
import Currency from "../Currency/Currency";
import useMedia from "../../hooks/useMedia";
import styles from "./HomeTab.module.css";

const HomeTab = () => {
  const dispatch = useDispatch();
  const { isMobile, isTablet, isDesktop } = useMedia();

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {!isMobile && (
        <div className={styles.sidebar}>
          {isTablet && (
            <>
              <div style={{ gridArea: "navigation" }}>
                <Navigation />
              </div>
              <div style={{ gridArea: "balance" }}>
                <Balance />
              </div>
              <div style={{ gridArea: "currency" }}>
                <Currency />
              </div>
            </>
          )}

          {isDesktop && (
            <>
              <Navigation />
              <Balance />
              <Currency />
            </>
          )}
        </div>
      )}
      <TransactionList />
    </div>
  );
};

export default HomeTab;
