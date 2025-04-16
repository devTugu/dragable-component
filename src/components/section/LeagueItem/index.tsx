"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";

export function LeagueItem({ league }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: league.id });
  const [showTooltip, setShowTooltip] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="my-2 rounded-md bg-black relative group"
    >
      <div
        {...attributes}
        {...listeners}
        className="p-1 cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div className="flex items-center justify-between p-1 min-h-[115px]">
          <div className="flex flex-row">
            {/* Left side with drag handle and content */}
            <div className="flex items-center flex-1 p-3">
              {/* Vertical drag handle */}
              <Image
                src={league.logo}
                alt={`${league.name} logo`}
                width={40}
                height={40}
              />
            </div>

            {/* League information */}
            <div className="flex flex-col p-3">
              <div className="flex flex-row">
                <span className="text-white">{league.name}</span>
                {/* Right side with status */}
                <div className="px-4">
                  <span
                    className={`text-xs px-2 py-1 rounded bg-zinc-800 ${
                      league.status === "Draft Live"
                        ? "text-[#B5FF4D]"
                        : league.status === "Pre-Draft"
                        ? "text-[#FFAD33]"
                        : league.status === "Archived"
                        ? "text-[#FF4D4D]"
                        : "text-[#CCCCC5]"
                    }`}
                  >
                    {league.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center text-xs text-zinc-500 gap-2 mt-1">
                <div className="flex items-center text-xs gap-1">
                  <Image
                    src="/espn.png"
                    alt="espn logo"
                    width={12}
                    height={12}
                  />
                  <span>{league.espnId}</span>
                </div>

                <div className="flex items-center text-xs gap-1">
                  <Image
                    src="/calendar.png"
                    alt="calendar logo"
                    width={12}
                    height={12}
                  />
                  <span>{league.year}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Menu icon on the far right */}
          {showTooltip && league.status !== "Archived" && (
            <div className="min-h-[110px] flex items-center justify-center bg-zinc-800 px-1 py-auto">
              <Image src="/drag.png" alt="drag" width={16} height={16} />
            </div>
          )}
        </div>

        {/* Tooltip that appears on hover - positioned on the right side */}
        {showTooltip && league.status !== "Archived" && (
          <div className="absolute right-0 top-0 z-50 bg-zinc-800 text-white text-sm py-2 px-3 rounded-md shadow-lg whitespace-nowrap transform translate-x-full translate-y-1/4">
            Drag to re-order or move to Archive
          </div>
        )}
      </div>
    </div>
  );
}

export default LeagueItem;
