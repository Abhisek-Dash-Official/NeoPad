"use client";
import { useState, useEffect } from "react";

export default function CalculatorApp({ text, direction, changeText }) {
  const operators = [
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"],
  ];

  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [result, setResult] = useState("");

  useEffect(() => {
    if (!direction) return;

    if (direction === "top") {
      setRow((prev) => (prev - 1 + operators.length) % operators.length);
    } else if (direction === "bottom") {
      setRow((prev) => (prev + 1) % operators.length);
    } else if (direction === "left") {
      setCol((prev) => (prev - 1 + operators[0].length) % operators[0].length);
    } else if (direction === "right") {
      setCol((prev) => (prev + 1) % operators[0].length);
    } else if (direction === "center") {
      const selectedSymbol = operators[row][col];
      if (selectedSymbol === "=") {
        try {
          // Check to avoid eval errors on incomplete expressions
          if (/[+\-*/]$/.test(text) || !text) {
            setResult("Error");
            return;
          }
          const calc = new Function("return " + text)();
          setResult(String(calc));
        } catch {
          setResult("Error");
        }
      } else {
        changeText(text + selectedSymbol);
      }
    }
  }, [direction]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-between bg-black rounded p-2 text-white font-mono shadow-inner border border-gray-700 overflow-hidden">
      {/* Display */}
      <div className="w-full bg-gray-900 rounded-md text-right px-2 py-1 leading-tight shadow-inner overflow-hidden border border-gray-700">
        <div className="text-green-400 text-xs truncate h-4">
          {" "}
          {text || "0"}
        </div>
        <div className="text-gray-400 text-[10px] h-4 overflow-hidden">
          {" "}
          {result}
        </div>
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-4 grid-rows-4 gap-1 w-full grow mt-2">
        {operators.map((rowItems, rIdx) =>
          rowItems.map((item, cIdx) => {
            const isActive = rIdx === row && cIdx === col;
            return (
              <div
                key={item + rIdx + cIdx}
                className={`flex items-center justify-center rounded-md font-bold text-xs w-full h-full transition-all duration-150 ${
                  isActive
                    ? "bg-yellow-400 text-black scale-105 shadow-lg"
                    : "bg-gray-700 text-white"
                }`}
              >
                {item}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
