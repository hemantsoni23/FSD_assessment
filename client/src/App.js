import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <div className="pt-18">
        <Outlet />
      </div>
    </React.Fragment>
  );
}

export default App;