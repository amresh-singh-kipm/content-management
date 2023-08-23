import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Contact from "../pages/Contact";
import ChartMap from "../pages/ChartMap";
import Sidebar from "./Sidebar";
import Form from "./Form";

function PublicRouter() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-grow">
          <Routes>
            <Route path="*" element={<Contact />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/map" element={<ChartMap />} />
            <Route path="/form" element={<Form />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default PublicRouter;
