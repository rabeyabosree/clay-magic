import React from "react";
import SaleBanner from './bannerPages/SaleBanner';
import NewArrivalsBanner from './bannerPages/NewArrivalsBanner';
import PopularJewelryBanner from './bannerPages/PopularJewelryBanner';
import ExpensiveJewelryBanner from './bannerPages/ExpensiveJewelryBanner';
import BuyOneGetOneBanner from './bannerPages/BuyOneGetOneBanner';
import AllJewelryProductsBanner from './bannerPages/AllJewelryProductsBanner';


const JewelryGridPage = () => {
  return (
<div className="grid grid-cols-1 mx-2 mb-12 md:grid-cols-3  gap-4 ">
  {/* First Banner - Taller on Desktop */}
  <div className="w-full">
    <SaleBanner />
  </div>

  {/* Normal Height Banners */}
  <div >
    <PopularJewelryBanner />
  </div>

  <div >
    <NewArrivalsBanner />
  </div>

  <div >
    <BuyOneGetOneBanner />
  </div>

  <div >
    <ExpensiveJewelryBanner />
  </div>

  {/* Last Banner - Taller on Desktop */}
  <div >
    <AllJewelryProductsBanner />
  </div>
</div>
  );
};

export default JewelryGridPage;
