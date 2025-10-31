import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { LuCloudLightning } from "react-icons/lu";

const Header = () => {
  return (
    <section className="flex flex-col justify-center px-10 text-white md:items-start md:flex-row md:justify-between md:mt-3 md:mx-3">
      <div className="flex flex-col md:mt-0 text-center md:text-left ">
        <h1 className="text-xl md:text-4xl font-bold text-shadow-lg shadow-slate-800 uppercase">
          Weather Station
        </h1>
        <div className="flex justify-center md:justify-start items-center gap-1">
          <IoLocationOutline className="text-2xl md:block" />

          <p className="text-sm md:text-xl text-shadow shadow-slate-800 ">
            Abuja, Nigeria
          </p>
        </div>
      </div>
      <div className="flex flex-col  justify-center items-center text-center">
        <h1 className="text-xl md:text-3xl">Forecasts</h1>
        <LuCloudLightning className="text-2xl" />
      </div>
    </section>
  );
};

export default Header;
