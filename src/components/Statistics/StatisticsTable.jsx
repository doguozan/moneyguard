import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectSummary,
  selectStatLoading,
} from "../../redux/Statistics/selectors";
import styles from "./StatisticsTable.module.css";
import Loader from "../Loader/Loader";
import { FaSortUp, FaSortDown } from "react-icons/fa";

const StatisticsTable = () => {
  const summary = useSelector(selectSummary);
  const isLoading = useSelector(selectStatLoading);

  // Sıralama durumunu tutmak için state
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });

  // Kategorilere göre harcamaları ve gelirleri ayır
  const expenses = Array.isArray(summary)
    ? summary.filter((item) => item.type === "EXPENSE")
    : [];
  const income = Array.isArray(summary)
    ? summary.filter((item) => item.type === "INCOME")
    : [];

  // Toplam harcama ve gelir hesapla
  const totalExpenses =
    expenses.length > 0
      ? expenses.reduce(
          (acc, item) => acc + Math.abs(parseFloat(item.total)),
          0
        )
      : 0;
  const totalIncome =
    income.length > 0
      ? income.reduce((acc, item) => acc + parseFloat(item.total), 0)
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
    Income: "#24CCA7",
    Other: "#734AEF", // Diğer kategoriler için
    // Diğer kategoriler için varsayılan renkler
    "Other expenses": "#00AD84",
  };

  // Sıralama fonksiyonu
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Verileri sırala
  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortConfig.key === "name") {
      if (sortConfig.direction === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    } else if (sortConfig.key === "total") {
      const aValue = Math.abs(parseFloat(a.total));
      const bValue = Math.abs(parseFloat(b.total));
      if (sortConfig.direction === "asc") {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    }
    return 0;
  });

  // Sıralama ikonunu göster
  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? (
        <FaSortUp className={styles.sortIcon} />
      ) : (
        <FaSortDown className={styles.sortIcon} />
      );
    }
    return null;
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <div
          className={styles.categoryHeader}
          onClick={() => requestSort("name")}
        >
          Category {getSortIcon("name")}
        </div>
        <div className={styles.sumHeader} onClick={() => requestSort("total")}>
          Sum {getSortIcon("total")}
        </div>
      </div>

      {expenses.length === 0 && income.length === 0 ? (
        <div className={styles.emptyMessage}>
          No transactions available yet.
        </div>
      ) : (
        <div className={styles.tableBody}>
          {sortedExpenses.map((item, index) => (
            <div key={index} className={styles.tableRow}>
              <div className={styles.categoryCell}>
                <span
                  className={styles.colorIndicator}
                  style={{
                    backgroundColor: categoryColors[item.name] || "#734AEF",
                  }}
                ></span>
                <span>{item.name}</span>
              </div>
              <div className={styles.sumCell}>
                {Math.abs(parseFloat(item.total)).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.tableSummary}>
        <div className={styles.summaryRow}>
          <div className={styles.summaryLabel}>Expenses:</div>
          <div className={styles.summaryValue}>{totalExpenses.toFixed(2)}</div>
        </div>
        <div className={styles.summaryRow}>
          <div className={styles.summaryLabel}>Income:</div>
          <div className={`${styles.summaryValue} ${styles.income}`}>
            {totalIncome.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsTable;
