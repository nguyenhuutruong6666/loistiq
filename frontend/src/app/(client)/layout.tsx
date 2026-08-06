import React from "react";
import Navbar from "@/components/client/layout/Navbar";
import Footer from "@/components/client/layout/Footer";
import ScrollToTop from "@/components/client/layout/ScrollToTop";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="grow pt-18">{children}</main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
