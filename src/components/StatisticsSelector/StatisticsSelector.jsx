import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { getTransactionsSummaryByPeriod } from "../../redux/Statistics/operations";
import styles from "./statisticsSelector.module.css";
import { customStyles } from "./styleSelect";

const StatisticsSelector = () => {
  const dispatch = useDispatch();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // JavaScript'te aylar 0'dan başlar

  // Ay ve yıl için state'ler
  const [selectedMonth, setSelectedMonth] = useState({
    value: currentMonth,
    label: getMonthName(currentMonth),
  });
  const [selectedYear, setSelectedYear] = useState({
    value: currentYear,
    label: currentYear.toString(),
  });

  // Ay seçenekleri
  const monthOptions = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  // Yıl seçenekleri (son 5 yıl)
  const yearOptions = [];
  for (let i = 0; i < 5; i++) {
    const year = currentYear - i;
    yearOptions.push({ value: year, label: year.toString() });
  }

  // Ay değiştiğinde
  const handleMonthChange = (selectedOption) => {
    setSelectedMonth(selectedOption);
  };

  // Yıl değiştiğinde
  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption);
  };

  // Ay adını döndüren yardımcı fonksiyon
  function getMonthName(monthNumber) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[monthNumber - 1];
  }

  // Seçilen ay veya yıl değiştiğinde istatistikleri getir
  useEffect(() => {
    if (selectedMonth && selectedYear) {
      dispatch(
        getTransactionsSummaryByPeriod({
          month: selectedMonth.value,
          year: selectedYear.value,
        })
      );
    }
  }, [selectedMonth, selectedYear, dispatch]);

  return (
    <div className={styles.selectorContainer}>
      <div className={styles.selectWrapper}>
        <Select
          value={selectedMonth}
          onChange={handleMonthChange}
          options={monthOptions}
          styles={customStyles}
          className={styles.select}
          isSearchable={false}
        />
      </div>
      <div className={styles.selectWrapper}>
        <Select
          value={selectedYear}
          onChange={handleYearChange}
          options={yearOptions}
          styles={customStyles}
          className={styles.select}
          isSearchable={false}
        />
      </div>
    </div>
  );
};

export default StatisticsSelector;
