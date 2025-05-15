import LeftSidebar from "@/components/section/LeftSidebar";
import Navbar from "@/components/section/NavBar";
import RightSidebar from "@/components/section/RightSidebar";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen  2xl:border-x-2 2xl:border-gray-200 dark:2xl:border-zinc-700 ">
      <LeftSidebar />
      <main className=" 2xl:max-w-screen-2xl 2xl:mx-auto flex-1 py-10  px-5 sm:px-10 ">
        <Navbar />
        {children}
      </main>
      <RightSidebar />
    </div>
  );
}
