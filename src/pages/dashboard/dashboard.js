import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Chart from "../../components/Chart";
import { useTranslation } from "react-i18next";
import TranslationToggle from "../../components/TranslationToggle";

import "./dashboard.css";
import { useData } from "../../dataContext";

const App = () => {
  const { t } = useTranslation();

  const currentDate = new Date();
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
    const groupCounts = filteredData.reduce((acc, item) => {
      acc[item.group_name] = (acc[item.group_name] || 0) + 1;
      return acc;
    }, {});

    const groupList = Object.entries(groupCounts).map(([group, count]) => ({
      group,
      count,
    }));

    if (isSorted) {
      return groupList.sort((a, b) => a.count - b.count);
    }

    return groupList;
  })();

  return (
    <div className="container">
      <TranslationToggle />
      <header className="header">
        <div className="dashboard-title">
          <img
            src={`${process.env.PUBLIC_URL}/satanic-pc.png`}
            alt="Dashboard Icon"
            className="dashboard-icon"
          />
          <h1>{t("dashboard_maintext")}</h1>
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
          {t("graph_order_button")}
        </label>
      </div>
      <div className="chart-container">
        <Chart data={sortedData} />
      </div>
    </div>
  );
};

export default App;
