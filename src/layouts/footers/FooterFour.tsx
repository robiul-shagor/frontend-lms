import Image from "next/image";

import footerLogo from "@/assets/images/logo/logo_06.svg";
import footerShape from "@/assets/images/assets/ils_06.svg";
import Link from "next/link";
import footer_data from "@/data/home-data/FooterData";


const FooterFour = () => {
  return (
    <div className="footer-four position-relative z-1">
      <div className="container container-large">
        <div className="bg-wrapper position-relative z-1">
          <div className="row">
            <div className="col-xxl-3 col-lg-4 mb-10">
              <div className="footer-intro">
                <div className="logo mb-20">
                  <Link href="/">
                    <Image width={100} height={100} src={footerLogo} alt="" />
                  </Link>
                </div>
                <p className="mb-30 xs-mb-20">
                  11910 Clyde Rapid Suite 210, Willyand, Virginia, United States
                </p>
                <Link href="#" className="email tran3s mb-30 md-mb-3">
                  homyreal@demo.com
                </Link>
                <ul className="style-none d-flex align-items-center social-icon">
                  <li>
                    <Link href="#">
                      <i className="fa-brands fa-facebook-f"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <i className="fa-brands fa-twitter"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <i className="fa-brands fa-instagram"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {footer_data
              .filter((items) => items.page === "home_5")
              .map((item) => (
                <div
                  key={item.id}
                  className={`col-sm-4 mb-30 ${item.widget_class}`}
                >
                  <div className={`footer-nav ${item.widget_class2}`}>
                    <h5 className="footer-title">{item.widget_title}</h5>
                    <ul className="footer-nav-link style-none">
                      {item.footer_link.map((li, i) => (
                        <li key={i}>
                          <Link href={li.link}>{li.link_title}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="bottom-footer flex flex-col items-center gap-4">
          <p className="m0 text-center fs-16">Copyright @2024 Homy inc.</p>
          <p className="text-center sm:w-[70%] w-[92%]">The trademarks REALTOR®, REALTORS®, and the REALTOR® logo are controlled by The Canadian Real Estate Association (CREA) and identify real estate professionals who are members of CREA. The trademarks MLS®, Multiple Listing Service® and the associated logos are owned by CREA and identify the quality of services provided by real estate professionals who are members of CREA. Used under license.</p>
        </div>
      </div>
      <Image
        width={100}
        height={100}
        src={footerShape}
        alt=""
        className="lazy-img shapes shape_01"
      />
    </div>
  );
};

export default FooterFour;
