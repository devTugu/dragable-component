"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function BottomNavigation() {
  const [activeItem, setActiveItem] = useState("shield"); // Default active item

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    // You can add additional logic here like navigation
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center p-4 gap-4">
      {/* Middle container - App icons */}
      <div className="bg-zinc-600 rounded-lg flex items-center justify-between p-2 gap-4">
        {/* Shield icon */}
        <button
          onClick={() => handleItemClick("shield")}
          className={`flex items-center justify-center focus:outline-none`}
        >
          <div
            className={`${
              activeItem === "shield" ? "bg-zinc-800" : "bg-zinc-600"
            } rounded-lg p-4 flex items-center justify-center w-[40px] h-[40px] transition-colors`}
          >
            <div className="text-white">
              <Image src="/vector.png" alt="vector" width={16} height={16} />
            </div>
          </div>
        </button>

        {/* Profile icon */}
        <button
          onClick={() => handleItemClick("profile")}
          className={`flex items-center justify-center focus:outline-none`}
        >
          <div
            className={`${
              activeItem === "profile" ? "bg-zinc-800" : "bg-zinc-600"
            } rounded-lg p-2 w-[40px] h-[40px] flex items-center justify-center transition-colors`}
          >
            <Image src="/profile.png" alt="vector" width={16} height={16} />
          </div>
        </button>

        {/* Yahoo icon */}
        <button
          onClick={() => handleItemClick("yahoo")}
          className={`flex items-center justify-center focus:outline-none`}
        >
          <div
            className={`${
              activeItem === "yahoo" ? "bg-zinc-800" : "bg-zinc-600"
            } rounded-lg p-2 w-[40px] h-[40px] flex items-center justify-center transition-colors`}
          >
            <Image src="/unnamed.png" alt="vector" width={16} height={16} />
          </div>
        </button>

        {/* ESPN icon */}
        <button
          onClick={() => handleItemClick("espn")}
          className={`flex items-center justify-center focus:outline-none}`}
        >
          <div
            className={`${
              activeItem === "espn" ? "bg-zinc-800" : "bg-zinc-600"
            } rounded-lg p-2 w-[40px] h-[40px] flex items-center justify-center transition-colors`}
          >
            <Image src="/espn.png" alt="vector" width={16} height={16} />
          </div>
        </button>

        {/* Divider */}
        <div className="h-8 w-px bg-zinc-700"></div>

        {/* Hexagon icon */}
        <button
          onClick={() => handleItemClick("hexagon")}
          className={`${
            activeItem === "hexagon" ? "bg-zinc-800" : "bg-zinc-600"
          } rounded-lg p-2 w-[40px] h-[40px] flex items-center justify-center transition-colors`}
        >
          <div
            className={`${
              activeItem === "hexagon" ? "bg-zinc-800" : "bg-zinc-600"
            }`}
          >
            <Image src="/vector-1.png" alt="vector" width={16} height={16} />
          </div>
        </button>
      </div>

      {/* Right container - Search icon */}
      <button
        onClick={() => handleItemClick("search")}
        className={`focus:outline-none ${
          activeItem === "search"
            ? "scale-110 transform transition-transform"
            : ""
        }`}
      >
        <div
          className={`${
            activeItem === "search" ? "bg-zinc-700" : "bg-zinc-800"
          } rounded-lg p-4 flex items-center justify-center w-13 h-13 transition-colors`}
        >
          <div
            className={`${
              activeItem === "search" ? "text-white" : "text-zinc-500"
            }`}
          >
            <Image src="/search.png" alt="vector" width={16} height={16} />
          </div>
        </div>
      </button>
    </div>
  );
}
