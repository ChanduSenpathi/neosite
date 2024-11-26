'use client'
// import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import { Provider } from "react-redux";
import store from "./store";
import "./globals.css"
import ProtectedRoute from "@/components/ProtectedRoute";
import LoadingIndicator from "@/components/Loadingindicator/LoadingIndicator";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);
  const pathName = usePathname()

    useEffect(() =>{
      setLoading(true)

        const timer =  setTimeout(() => {
          setLoading(false);
        }, 1000);
        return () => clearInterval(timer)
    }, [pathName])
    console.log(loading);
    
  return (
    <html lang="en">
      <body className="bg-gray-800">
        <Provider store={store}>
          <section className="main-container flex flex-col justify-between">
            <Navbar />
          <ProtectedRoute>
            {loading && <LoadingIndicator/>}
            <main>{children}</main>
          </ProtectedRoute>
          <Footer/>
          </section>
        </Provider>
      </body>
    </html>
  );
}
