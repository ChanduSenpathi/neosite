'use client'
// import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import { Provider } from "react-redux";
import store from "./store";
import "./globals.css"
import ProtectedRoute from "@/components/ProtectedRoute";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-800">
        <Provider store={store}>
          <section className="main-container flex flex-col justify-between">
            <Navbar />
          <ProtectedRoute>
            <main>{children}</main>
          </ProtectedRoute>
          <Footer/>
          </section>
        </Provider>
      </body>
    </html>
  );
}
