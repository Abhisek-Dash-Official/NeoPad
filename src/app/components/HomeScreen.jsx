"use client";
import React, { use, useEffect, useState } from "react";
import { Calculator, Pencil, Phone } from "lucide-react";

const gradientMapping = {
  black: "linear-gradient(145deg, hsl(0, 0%, 10%), hsl(0, 0%, 20%))",
  orange: "linear-gradient(hsl(43, 90%, 50%), hsl(28, 90%, 50%))",
  green: "linear-gradient(hsl(123, 90%, 40%), hsl(108, 90%, 40%))",
};

const GlassIcons = ({ items, changeScreen, focusedIndex }) => {
  const getBackgroundStyle = (color) => ({
    background: gradientMapping[color] || color,
  });

  return (
    <div className="grid grid-cols-3 gap-4 justify-items-center pb-1">
      {items.map((item, index) => (
        <button
          key={index}
          type="button"
          onClick={() => changeScreen(item.label)}
          aria-label={item.label}
          className={`relative bg-transparent outline-none w-[2.8em] h-[2.8em] perspective-[20em] transform-3d [-webkit-tap-highlight-color:transparent] group rounded-lg transition-all duration-200 ${
            focusedIndex === index ? "scale-110 ring-2 ring-blue-400" : ""
          }`}
        >
          <span
            className={`absolute top-0 left-0 w-full h-full rounded-lg block transition-all duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-bottom-right rotate-12 group-hover:transform-[rotate(20deg)_translate3d(-0.3em,-0.3em,0.4em)] ${
              focusedIndex === index
                ? "transform-[rotate(20deg)_translate3d(-0.3em,-0.3em,0.4em)]"
                : ""
            }`}
            style={{
              ...getBackgroundStyle(item.color),
              boxShadow: "0.4em -0.4em 0.6em hsla(223, 10%, 10%, 0.15)",
            }}
          ></span>

          <span
            // --- CHANGE 3: Wahi transform add kiya jo hover par hai ---
            className={`absolute top-0 left-0 w-full h-full rounded-lg bg-[hsla(0,0%,100%,0.12)] transition-all duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] flex backdrop-blur-[0.5em] transform group-hover:transform-[translateZ(1.2em)] ${
              focusedIndex === index ? "transform-[translateZ(1.2em)]" : ""
            }`}
            style={{
              boxShadow: "0 0 0 0.08em hsla(0, 0%, 100%, 0.3) inset",
            }}
          >
            <span className="m-auto w-[1.2em] h-[1.2em] flex items-center justify-center text-white">
              {item.icon}
            </span>
          </span>

          <span
            className={`absolute top-full left-0 right-0 text-center text-[0.7rem] truncate text-white opacity-0 transition-all duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] group-hover:opacity-100 group-hover:translate-y-[0.25em] ${
              focusedIndex === index ? "opacity-100 translate-y-[0.25em]" : ""
            }`}
          >
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
};

const DigitalClock = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();

      // Time
      const h = now.getHours().toString().padStart(2, "0");
      const m = now.getMinutes().toString().padStart(2, "0");
      setTime(`${h}:${m}`);

      // Date in format: Tue, 24 Oct 2025
      const options = {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
      };
      setDate(now.toLocaleDateString("en-US", options));
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center text-white drop-shadow-lg">
      <div className="text-3xl font-semibold tracking-widest">{time}</div>
      <div className="text-sm font-medium mt-1">{date}</div>
    </div>
  );
};

export default function HomeScreen({ changeScreen, direction }) {
  const items = [
    {
      icon: <Phone />,
      color: "green",
      label: "Phone",
    },
    {
      icon: <Pencil />,
      color: "orange",
      label: "Notes",
    },
    {
      icon: <Calculator />,
      color: "black",
      label: "Calculator",
    },
  ];

  const [focusedIndex, setFocusedIndex] = useState(0);

  useEffect(() => {
    direction === "right" &&
      setFocusedIndex((prev) => (prev + 1) % items.length);
    direction === "left" &&
      setFocusedIndex((prev) => (prev - 1 + items.length) % items.length);
    direction === "top" && setFocusedIndex(0);
    direction === "bottom" && setFocusedIndex(items.length - 1);
    direction === "center" && changeScreen(items[focusedIndex].label);
  }, [direction]);

  return (
    <div
      className="w-full h-full flex flex-col justify-between items-center text-white"
      style={{
        background:
          "linear-gradient(to bottom, rgba(230,240,255,0.2), rgba(210,220,240,0.1))",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Top Clock */}
      <div className="pt-3">
        <DigitalClock />
      </div>

      {/* App Grid at Bottom */}
      <div className="pb-6">
        <GlassIcons
          items={items}
          changeScreen={changeScreen}
          focusedIndex={focusedIndex}
        />
      </div>
    </div>
  );
}
