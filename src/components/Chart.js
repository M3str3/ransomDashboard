import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom"; // Importa el plugin de zoom

// Registra el plugin de zoom junto con los otros componentes
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin // Registra aquí el plugin
);

const Chart = ({ data }) => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const chartLabels = data.map((item) => item.group);
  const chartDataValues = data.map((item) => item.count);

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: t("graph_label"),
        data: chartDataValues,
        backgroundColor: "rgba(0, 250, 0, 0.7)",
        borderColor: "rgba(0, 0, 0, 0.3)",
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
        text: t("graph_title"),
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true, // Habilita el zoom con la rueda del ratón
          },
          pinch: {
            enabled: true, // Habilita el zoom con gesto de pellizco en dispositivos táctiles
          },
          mode: "x", // Habilita el zoom tanto en el eje X como en el Y
        },
        pan: {
          enabled: true, // Habilita el desplazamiento con el ratón
          mode: "x", // Permite desplazarse tanto en el eje X como en el Y
        },
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxRotation: 90,
          minRotation: 45,
          font: {
            size: 10,
          },
        },
        grid: {
          display: false,
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
      const groupName = data[index].group;
      navigate(`/${groupName}`, { state: { data: data } });
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default Chart;
