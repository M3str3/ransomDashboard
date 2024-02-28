import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import React from "react";

// Registro de componentes necesarios
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ data }) => {
  const navigate = useNavigate();
  const chartLabels = data.map((item) => item.group);
  const chartDataValues = data.map((item) => item.count);

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Número de ataques",
        data: chartDataValues,
        backgroundColor: "rgba(145, 4, 102, 0.5)",
        borderColor: "rgba(145, 4, 102, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Número de ataques de ransomware por grupo",
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxRotation: 90,
          minRotation: 45,
          font: {
            size: 10, // Puedes ajustar el tamaño de la fuente si es necesario
          },
        },
        grid: {
          display: false, // Puedes decidir no mostrar la cuadrícula para un eje X más limpio
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
        },
      },
    },
    onClick: (event, elements) => {
      if (elements.length === 0) return;

      const index = elements[0].index;
      const groupName = data[index].group; // Asume que `data` tiene una propiedad `group`
      navigate(`/${groupName}`, { state: { data: data } });
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default Chart;
