import Header from "@/layouts/headers/Header";
import Hero from "./Hero";
import NewListing from "./NewListing";
import RecentlySold from "./RecentlySold";
import LeaseListed from "./LeaseListed";
import LuxuryHomes from "./LuxuryHomes";
import DownloadApp from "./DownloadApp";
import ValeryBridges from "./ValeryBridges";
import Features from "./Features";
import LookingFor from "./LookingFor";
import Blogs from "./Blogs";
import MarketStats from "./MarketStats";
import Footer from "./Footer";

export default function Home() {
  return (
    <div className="w-[100vw] min-h-[100vh] bg-[#f8f8fe]">
      <div className="w-full h-full md:custom-hero-theme bg-[#f4f5ff]">
        <Header />
        <div className="m-0 pt-[160px]">
          <Hero />
        </div>
      </div>
      <NewListing />
      <RecentlySold />
      <DownloadApp />
      <Features />
      <ValeryBridges />
      <LeaseListed />
      <LuxuryHomes />
      <MarketStats />
      <LookingFor />
      <Blogs />
      <Footer />
    </div>
  );
}
