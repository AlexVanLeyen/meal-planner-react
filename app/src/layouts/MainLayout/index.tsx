import Navigation from "@/navigation/components/Navigation";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  return (
    <>
      <div id="navigation">
        <Navigation />
      </div>
      <main id="main-content">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
