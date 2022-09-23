import React from "react";
import Footer from "./nav/Footer";
import Header from "./nav/Header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
