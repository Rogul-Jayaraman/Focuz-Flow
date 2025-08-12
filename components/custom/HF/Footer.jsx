import React from "react";
import { format } from "date-fns";

const Footer = () => {
  return (
    <footer className="bg-white h-13 ">
      <div className="py-4 border-t-1 border-gray-100 bg-orange-500/5">
        <p className="text-center text-sm font-bold text-gray-500">Focuz Flow @ {format(Date.now(),"yyyy")}</p>
      </div>
    </footer>
  );
};

export default Footer;
