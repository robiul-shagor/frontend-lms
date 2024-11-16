import Header from "@/layouts/headers/Header";
import Hero from "./Hero";
import About from "./About";
import AvgStats from "./AvgStats";
import MarketStats from "./MarketStats";
import ListingProperty from "./ListingProperty";
import RecentlySold from "./RecentlySold";
import Map from "./Map";
import Contact from "./Contact";
import MarketTrend from "./MarketTrend";

export default function MarketReports() {
  return (
    <div className="w-[100vw] min-h-[100vh] bg-[#f2f1f8] pb-4">
      <div className="w-full h-full ">
        {/* <Header /> */}
        {/* <div className="m-0 pt-[160px]"> */}
        <Hero />
        {/* </div> */}
      </div>
      <About />
      <AvgStats />
      <MarketStats />
      <ListingProperty />
      <RecentlySold />
      <MarketTrend />
      <Map />
      <Contact />
    </div>
  );
}
