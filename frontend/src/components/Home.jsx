import React, { useState } from "react";
import SidebarCategory from "../pages/SidebarCategory";
import Layout from "./common/Layout";
import JewelryGridPage from "../pages/JewelryGridPage";

function Home() {
  const [filter, setFilter] = useState({});
  const handleCategorySelect = (category) => {
    setFilter(category);
  };

  return (
    <Layout>
      <main className=" flex flex-col m-2 p-4 w-full md:flex-row ">
        {/* Sidebar - Left Column */}
        <div className="w-full md:w-1/4 overflow-y-auto">
          <SidebarCategory onCategorySelect={handleCategorySelect} />
        </div>

        <div className="w-full md:w-3/4 flex-grow">
          <JewelryGridPage />
        </div>
      </main>
    </Layout>
  );
}

export default Home;
