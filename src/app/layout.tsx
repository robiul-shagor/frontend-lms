"use client";
import "../styles/index.scss";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { AuthContextProvider } from "../context/AuthContext";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDev = process.env.NODE_ENV === "development";
  const pathname = usePathname();
  useEffect(() => {
    // Select the element with all three classes
    const modalElement: any = document.querySelector(
      ".modal-backdrop.fade.show"
    );
    // Check if the element exists, then apply the styles
    if (modalElement) {
      modalElement.style.display = "none"; // Example: hiding the element
      modalElement.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // Example: changing the backdrop color
    }
  }, [pathname]);

  return (
    <html lang="en" suppressHydrationWarning={isDev}>
      <head>
        <meta
          name="keywords"
          content="Real estate, Property sale, Property buy"
        />
        <meta
          name="description"
          content="Homy is a beautiful website template designed for Real Estate Agency."
        />
        <meta property="og:site_name" content="Homy" />
        <meta property="og:url" content="https://creativegigstf.com" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Homy - Real Estate React Next js Template"
        />
        <meta name="og:image" content="images/assets/ogg.png" />
        {/* For IE  */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {/* For Resposive Device */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* For Window Tab Color */}
        {/* Chrome, Firefox OS and Opera */}
        <meta name="theme-color" content="#0D1A1C" />
        {/* Windows Phone */}
        <meta name="msapplication-navbutton-color" content="#0D1A1C" />
        {/* iOS Safari */}
        <meta name="apple-mobile-web-app-status-bar-style" content="#0D1A1C" />
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,500&display=swap"
        />

        {/* Urbanist font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        ></link>

        {/* font poppins  */}
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        ></link> */}

        {/* font Abhaya Libre */}
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        ></link> */}

        {/* font Lato  */}
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
          rel="stylesheet"
        ></link> */}
      </head>
      <body suppressHydrationWarning={true} className="font-urbanist">
        <div className="main-page-wrapper">
          <AuthContextProvider>
            <Provider store={store}>{children}</Provider>
            <ToastContainer />
          </AuthContextProvider>
        </div>
      </body>
    </html>
  );
}
