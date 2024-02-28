import React from "react";
import Dashboard from "./pages/dashboard/dashboard";
import GroupDetails from "./pages/groupDetails/groupDetails";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DataProvider } from "./dataContext";

const App = () => {
  return (
    <DataProvider>
      <Router basename="/ransomDashboard">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/:groupName" element={<GroupDetails />} />
        </Routes>
      </Router>
    </DataProvider>
  );
};

export default App;
