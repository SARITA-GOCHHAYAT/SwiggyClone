import React from "react";
import {Link, Outlet } from "react-router-dom";

const Header = () => {
  const navItems = [
    { name: "Swiggy Corporate", icon: <i className="fi fi-rs-shopping-bag"></i> },
    { name: "Search", icon: <i className="fi fi-rs-search"></i> },
    { name: "Offers", icon: <i className="fi fi-rs-badge-percent"></i> },
    { name: "Help", icon: <i className="fi fi-rs-handshake"></i> },
    { name: "Sign In", icon: <i className="fi fi-rs-user"></i> },
    { name: "Cart", icon: <i className="fi fi-rs-shopping-cart"></i> },
  ];

  return (
    <div className="w-full">
      <div className="w-full h-24 shadow-md flex justify-center">
        <div className="w-[70%] flex justify-between">
          {/* Logo and Dropdown */}
          <div className="flex items-center">
            <Link to={"/"}>
            <img
              src="./src/assets/img/logo.png"
              alt="logo"
              className="w-32 mt-2 flex items-center justify-center"
            /></Link>
            <div className="flex items-center gap-3 cursor-pointer border-b-2 border-black">
              <p className="font-bold">Others</p>
              <i className="fi fi-rs-angle-small-down mt-1 text-2xl text-amber-500"></i>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex gap-14 my-auto">
            {navItems.map((item, index) => (
              <div
                key={index}
                className="flex gap-2 cursor-pointer items-center text-lg font-medium"
              >
                <p className="mt-1 text-gray-500">{item.icon}</p>
                <p className="my-auto text-gray-700">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

   <Outlet/>
    </div>
  );
};

export default Header;
