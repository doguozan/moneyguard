import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrencyData } from "../../redux/Currency/selectors";
import { getCurrency } from "../../redux/Currency/operations";
import useMedia from "../../hooks/useMedia";
import styles from "./Currency.module.css";

const Currency = () => {
  const dispatch = useDispatch();
  const currencyData = useSelector(selectCurrencyData);
  const { isDesktop, isTablet } = useMedia();

  useEffect(() => {
    dispatch(getCurrency());
  }, [dispatch]);

  const buyUSD = currencyData?.usdRate?.rateBuy.toFixed(2);
  const sellUSD = currencyData?.usdRate?.rateSell.toFixed(2);
  const buyEUR = currencyData?.eurRate?.rateBuy.toFixed(2);
  const sellEUR = currencyData?.eurRate?.rateSell.toFixed(2);

  return (
    <div className={styles.currency_wrapper}>
      <div className={styles.currency_table}>
        <div className={styles.currency_table_head}>
          <p className={styles.currency_item}>Currency</p>
          <p className={styles.currency_item}>Purchase</p>
          <p className={styles.currency_item}>Sale</p>
        </div>
        <div className={styles.table_body}>
          <div className={styles.currency_tr}>
            <p className={styles.currency}>USD</p>
            <p className={styles.currency}>{buyUSD}</p>
            <p className={styles.currency}>{sellUSD}</p>
          </div>
          <div className={styles.currency_tr}>
            <p className={styles.currency}>EUR</p>
            <p className={styles.currency}>{buyEUR}</p>
            <p className={styles.currency}>{sellEUR}</p>
          </div>
        </div>
      </div>
      {!isTablet && isDesktop && (
        <div className={styles.diagram}>
          <p className={styles.lowerNumber}>{buyUSD}</p>
          <p className={styles.higherNumber}>{buyEUR}</p>
          <img
            src={`${import.meta.env.BASE_URL}img/currency.png`}
            alt="Currency chart"
          />
        </div>
      )}
    </div>
  );
};

export default Currency;
