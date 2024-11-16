import HeaderOne from "@/layouts/headers/HeaderOne";
import ListingDetailsOneArea from "./ListingDetailsOneArea";
import FancyBanner from "@/components/common/FancyBanner";
import FooterFour from "@/layouts/footers/FooterFour";
import ListingHeader from "@/layouts/headers/ListingHeader";

const ListingDetailsOne = () => {
  return (
    <>
      <ListingHeader />
      <ListingDetailsOneArea />
      <FancyBanner />
      <FooterFour />
    </>
  );
};

export default ListingDetailsOne;
