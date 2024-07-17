import { React, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Page = ({active, title, page, setSiswaData}) => {

  return (
    <div className="bg-stone-50">
      <div className="flex">
        {/* sidebar */}
        <div className="w-2/12 h-screen sticky top-0">
          <Sidebar active={active} title={title} />
        </div>
        <div className="w-10/12 flex flex-col">
          {/* navbar */}
          <div className="sticky top-0 z-50 -ml-2">
            <Navbar setSiswaData={setSiswaData}/>
          </div>
          <div className="flex-grow overflow-y-auto">
            {page}
            <Footer/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
