import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Chart from "../../components/Chart";

import "./dashboard.css"; // Importa tu archivo CSS
import { useData } from "../../dataContext";

const App = () => {
  const currentDate = new Date();
  // Primer día del año actual
  const startOfYear = new Date(currentDate.getFullYear(), 0, 1);

  const [startDate, setStartDate] = useState(startOfYear);
  const [endDate, setEndDate] = useState(currentDate);
  const [isSorted, setIsSorted] = useState(false);
  const data = useData();

  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.discovered);
    return itemDate >= startDate && itemDate <= endDate;
  });

  const sortedData = (() => {
    // Calcular conteos de grupo
    const groupCounts = filteredData.reduce((acc, item) => {
      acc[item.group_name] = (acc[item.group_name] || 0) + 1;
      return acc;
    }, {});

    // Convertir a una lista para poder ordenar
    const groupList = Object.entries(groupCounts).map(([group, count]) => ({
      group,
      count,
    }));

    // Si 'isSorted' es true, entonces ordena la lista
    if (isSorted) {
      return groupList.sort((a, b) => a.count - b.count);
    }

    return groupList;
  })();

  return (
    <div className="container">
      <header className="header">
        <div className="dashboard-title">
          <img
            src={`${process.env.PUBLIC_URL}/satanic-pc.png`}
            alt="Dashboard Icon"
            className="dashboard-icon"
          />
          <h1>Ransomware Attack Dashboard</h1>
        </div>
      </header>

      <div className="date-pickers date-picker-container">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          className="react-datepicker-wrapper"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          className="react-datepicker-wrapper"
        />

        <label>
          <input
            type="checkbox"
            checked={isSorted}
            onChange={(e) => setIsSorted(e.target.checked)}
          />
          Ordenar por número de ataques
        </label>
      </div>
      <div className="chart-container">
        <Chart data={sortedData} />
      </div>
    </div>
  );
};

export default App;
