import React from "react";
import Dashboard from "./pages/dashboard/dashboard";
import GroupDetails from "./pages/groupDetails/groupDetails";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DataProvider } from "./dataContext";

import "./i18n.js";

const App = () => {
  const homepage = process.env.PUBLIC_URL;

  return (
    <DataProvider>
      <Router basename={homepage ? homepage : "/"}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/:groupName" element={<GroupDetails />} />
        </Routes>
      </Router>
    </DataProvider>
  );
};

export default App;
