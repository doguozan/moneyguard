import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import styles from "./ChartDoughnut.module.css";

// ChartJS'i kaydet
ChartJS.register(ArcElement, Tooltip, Legend);

const ChartDoughnut = ({ categoriesData, totalExpenses }) => {
  // Eğer veri yoksa boş bir grafik göster
  if (!categoriesData || categoriesData.length === 0) {
    return (
      <div className={styles.chartContainer}>
        <div className={styles.emptyChartMessage}>
          <p>Add some expenses and incomes to see the chart</p>
          <p>Your balance is € 0.00</p>
        </div>
      </div>
    );
  }

  // Kategori isimlerini ve tutarları ayır
  const labels = categoriesData.map((item) => item.name);
  const amounts = categoriesData.map((item) =>
    Math.abs(parseFloat(item.total))
  );
  const backgroundColors = categoriesData.map((item) => item.color);

  // Chart.js için veri yapısını oluştur
  const data = {
    labels: labels,
    datasets: [
      {
        data: amounts,
        backgroundColor: backgroundColors,
        borderWidth: 0,
        cutout: "70%", // Doughnut'un iç boşluğunu ayarla
      },
    ],
  };

  // Chart.js için seçenekleri oluştur
  const options = {
    plugins: {
      legend: {
        display: false, // Grafik üzerindeki açıklamaları gizle
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            const percentage =
              totalExpenses > 0
                ? ((value / totalExpenses) * 100).toFixed(0)
                : 0;
            return `${label}: ${value.toFixed(2)} (${percentage}%)`;
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartWrapper}>
        <Doughnut data={data} options={options} />
        <div className={styles.chartCenter}>
          <span className={styles.chartCenterSymbol}>₴</span>
          <span className={styles.chartCenterValue}>
            {totalExpenses.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChartDoughnut;
