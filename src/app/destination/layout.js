import Newslatter from "@/components/common/Newslatter";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import React from "react";
export const metadata = {
  title: "Bagadia Tours and Travels - Where the Journey Begins!",
  description:
    "To inspire and empower travelers to explore the world with confidence, providing exceptional service, unforgettable experiences, and fostering a deep appreciation for diverse cultures and destinations.",
  icons: {
    icon: "/assets/img/sm-logo.png",
  },
};
const layout = ({children}) => {
  return (
    <>
       
      <Header />
      {children}
      <Newslatter/>
      <Footer/>
    </>
  );
};

export default layout;
