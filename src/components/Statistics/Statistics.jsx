import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ChartDoughnut from "../ChartDoughnut/ChartDoughnut";
import StatisticsSelector from "../StatisticsSelector/StatisticsSelector";
import StatisticsTable from "./StatisticsTable";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Balance from "../Balance/Balance";
import Currency from "../Currency/Currency";
import useMedia from "../../hooks/useMedia";
import {
  selectSummary,
  selectCategories,
} from "../../redux/Statistics/selectors";
import { getTransactionsCategories } from "../../redux/Statistics/operations";
import styles from "./Statistics.module.css";

const Statistics = () => {
  const dispatch = useDispatch();
  const summary = useSelector(selectSummary);
  const categories = useSelector(selectCategories);
  const { isDesktop } = useMedia();

  // Kategorilere göre harcamaları ayır
  const expenses = Array.isArray(summary)
    ? summary.filter((item) => item.type === "EXPENSE")
    : [];

  // Toplam harcama hesapla
  const totalExpenses =
    expenses.length > 0
      ? expenses.reduce(
          (acc, item) => acc + Math.abs(parseFloat(item.total)),
          0
        )
      : 0;

  // Kategori renklerini tanımla
  const categoryColors = {
    "Main expenses": "#FED057",
    Products: "#FFD8D0",
    Car: "#FD9498",
    "Self care": "#C5BAFF",
    "Child care": "#6E78E8",
    "Household products": "#4A56E2",
    Education: "#81E1FF",
    Leisure: "#24CCA7",
    Entertainment: "#FFFFFF",
    Other: "#734AEF", // Diğer kategoriler için
    // Diğer kategoriler için varsayılan renkler
    "Other expenses": "#00AD84",
  };

  // Kategorilere renk ekle
  const categoriesData = expenses.map((item) => ({
    ...item,
    color: categoryColors[item.name] || "#734AEF",
  }));

  // Kategorileri yükle
  useEffect(() => {
    dispatch(getTransactionsCategories());
  }, [dispatch]);

  return (
    <div className={styles.dashboardPage}>
      <Header />
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <Navigation />
          <Balance />
          {isDesktop && <Currency />}
        </div>

        <div className={styles.statisticsContent}>
          <h1 className={styles.title}>Statistics</h1>

          <div className={styles.selectors}>
            <StatisticsSelector />
          </div>

          <div className={styles.content}>
            <div className={styles.chartSection}>
              <ChartDoughnut
                categoriesData={categoriesData}
                totalExpenses={totalExpenses}
              />
            </div>

            <div className={styles.tableSection}>
              <StatisticsTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
