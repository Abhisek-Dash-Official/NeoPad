"use client";
import { useEffect, useState, useRef } from "react";
import HomeScreen from "./components/HomeScreen";
import CalculatorApp from "./components/CalculatorApp.jsx";
import NotesApp from "./components/NotesApp";
import PhoneApp from "./components/PhoneApp";

const keyMap = [
  { number: "1", letters: ".,!" },
  { number: "2", letters: "ABC" },
  { number: "3", letters: "DEF" },
  { number: "4", letters: "GHI" },
  { number: "5", letters: "JKL" },
  { number: "6", letters: "MNO" },
  { number: "7", letters: "PQRS" },
  { number: "8", letters: "TUV" },
  { number: "9", letters: "WXYZ" },
  { number: "*", letters: "" },
  { number: "0", letters: " " },
  { number: "#", letters: "" },
];

export default function Phone() {
  const [screenContent, setScreenContent] = useState(
    <div className="flex flex-col items-center justify-center h-full w-full">
      <img
        src="android_logo.png"
        alt="Android Logo"
        className="h-20 w-20 object-contain mb-4"
      />
      <span className="text-blue-800 font-semibold text-lg">Android</span>
    </div>
  );
  const [booted, setBooted] = useState(false);
  const [app, setApp] = useState("");
  const [lastKey, setLastKey] = useState({});
  const [text, setText] = useState("");
  const timerRef = useRef(null);
  const [direction, setDirection] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setScreenContent(
        <div className="flex flex-col items-center justify-center h-full w-full">
          <img
            src="logo.png"
            alt="Default"
            className="h-35 w-35 object-contain"
          />
          <span className="text-blue-700 font-medium text-lg">Welcome</span>
        </div>
      );
      setTimeout(() => {
        setScreenContent(
          <HomeScreen changeScreen={(app) => setApp(app)} direction={direction} />
        );
        setBooted(true);
      }, 2000);
    }, 2000);
  }, []);

  useEffect(() => {
    if (app === "Calculator") {
      setScreenContent(<CalculatorApp text={text} direction={direction} changeText={(text) => setText(text)} />);
    } else if (app === "Notes") {
      const rawNotes = localStorage.getItem("neoPadNotesData");
      const notesData = rawNotes && rawNotes !== "null" ? rawNotes : "";
      setScreenContent(<NotesApp text={notesData + text} />);
    } else if (app === "Phone") {
      setScreenContent(<PhoneApp text={text} />);
    } else if (booted) {
      setScreenContent(<HomeScreen changeScreen={(app) => setApp(app)} direction={direction} />);
    }
  }, [app, text, direction]);

  const handleBtnClick = (key) => {
    if (app == "Calculator" || app == "Phone") {
      setText((prev) => prev + key.number);
    }
    else if (app == "Notes") {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (lastKey.key === key) {
        const count = lastKey.count + 1;
        setLastKey({ key, count });
        if (key.letters.length === 0) {
          setText((prev) => prev + key.number);
        }
        else setText((prev) => prev.slice(0, -1) + key.letters[(count - 2) % key.letters.length]);
      } else {
        setLastKey({ key, count: 1 });
        setText((prev) => prev + key.number);
      }
      timerRef.current = setTimeout(() => {
        setLastKey({ key: null, count: 0 });
      }, 800);
    } else {
      setApp("Phone");
      setText((prev) => prev + key.number);
    }
  }

  const handleCallBtnClick = () => {
    if (app === "Phone") {
      if (text.length !== 10) {
        alert("Please enter a valid 10-digit phone number.");
        return;
      }
      window.location.href = "tel:+91" + text;
    }
    else {
      setText("");
      setApp("Phone");
    }
  }
  const handleEndCallBtnClick = () => {
    if (app === "Phone") {
      setText("");
      setApp("");
    }
  }

  const handleDirection = (dir) => {
    setDirection(dir);
    setTimeout(() => {
      setDirection('');
    }, 10);
  };

  return (
    <div
      className="w-64 h-[520px] rounded-2xl p-4 flex flex-col shadow-lg border-2 border-gray-900 relative"
      style={{
        background: `linear-gradient(145deg, rgba(20,20,20,0.95), rgba(10,10,10,0.85)), 
                      linear-gradient(to bottom, rgba(255,255,255,0.03), rgba(0,0,0,0.5))`,
        backdropFilter: "blur(12px)",
        boxShadow: "0 10px 25px rgba(0,0,0,0.7)",
      }}
    >
      <div className="absolute bg-gray-800/45 rounded-full w-1/3 h-2 flex items-center justify-center top-4 left-1/3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-gray-950 rounded-full w-1 h-1 mx-0.5"
          ></div>
        ))}
      </div>

      {/* Volume Button */}
      <div className="absolute top-1/4 -right-2 w-2 h-20 rounded-tr-full rounded-br-full"
        style={{
          background: `linear-gradient(145deg, rgba(20,20,20,0.95), rgba(10,10,10,0.85)), 
                      linear-gradient(to bottom, rgba(255,255,255,0.03), rgba(0,0,0,0.5))`,
          backdropFilter: "blur(12px)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.7)",
        }}></div>

      {/* Screen Area */}
      <div className="mt-6 w-full h-44 rounded-lg mb-2 border-4 border-gray-700 wrap-break-word bg-linear-to-b from-blue-100/70 to-blue-200/70 hover:from-blue-200/80 hover:to-blue-300/80 shadow-inner text-blue-800 font-bold">
        {screenContent || (
          <div className="flex flex-col items-center justify-center h-full w-full">
            {/* Default image/logo */}
            <img
              src="logo.png"
              alt="Default"
              className="h-35 w-35 object-contain"
            />
            {/* Optional placeholder text */}
            <span className="text-blue-700 font-medium text-lg">Welcome</span>
          </div>
        )}
      </div>

      {/* Control Buttons */}
      <div className="grid grid-cols-3 grid-rows-2 gap-x-2 items-center mb-2 px-1">
        {/* Top Left Button */}
        <div className="flex justify-center items-center">
          <button
            onClick={() => {
              setApp("");
              setText("");
            }}
            className="w-16 h-8 bg-gray-600 rounded-t-md focus:outline-none focus:ring-2 focus:ring-gray-800 transition-all active:translate-y-0.5 active:scale-[0.97] active:shadow-md flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-minus-icon lucide-minus"><path d="M5 12h14" /></svg>
          </button>
        </div>

        {/* Center Button (Spanning two rows) */}
        <div className="w-16 h-16 bg-gray-600  rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 transition-all active:translate-y-0.5 active:scale-[0.97] active:shadow-md flex items-center justify-center row-span-2">
          <div className="w-12 h-12 bg-gray-500  rounded-md relative flex items-center justify-center">
            <button onClick={() => handleDirection("top")}
              className="absolute top-[-3px] left-0 w-full h-3 bg-transparent flex justify-center items-center"><div className="w-[60%] rounded h-px bg-gray-400"></div></button>
            <button onClick={() => handleDirection("right")}
              className="absolute right-[-3px] top-0 w-3 h-full bg-transparent flex justify-center items-center"><div className="w-px h-[60%] rounded bg-gray-400"></div></button>
            <button onClick={() => handleDirection("bottom")}
              className="absolute bottom-[-3px] left-0 w-full h-3 bg-transparent flex justify-center items-center"><div className="w-[60%] rounded h-px bg-gray-400"></div></button>
            <button onClick={() => handleDirection("left")}
              className="absolute left-[-3px] top-0 w-3 h-full bg-transparent flex justify-center items-center"><div className="w-px h-[60%] rounded bg-gray-400"></div></button>
            <button onClick={() => handleDirection("center")}
              className="text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-play-icon lucide-play"
              >
                <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Top Right Button */}
        <div className="flex justify-center items-center">
          <button
            onClick={() => setText(prev => prev.slice(0, -1))}
            className="w-16 h-8 bg-gray-600 rounded-t-md focus:outline-none focus:ring-2 focus:ring-gray-800 transition-all active:translate-y-0.5 active:scale-[0.97] active:shadow-md flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-minus-icon lucide-minus"><path d="M5 12h14" /></svg>
          </button>
        </div>

        {/* Call Button (Bottom Left) */}
        <div className="flex justify-center items-center">
          <button
            onClick={handleCallBtnClick}
            className="w-16 h-8 bg-green-500 rounded-b-md focus:outline-none focus:ring-2 focus:ring-gray-800 transition-all active:translate-y-0.5 active:scale-[0.97] active:shadow-md flex items-center justify-center">
            <svg
              className="w-7 h-7"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 15C7 12.2386 9.23858 10 12 10C14.7614 10 17 12.2386 17 15"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* End Button (Bottom Right) */}
        <div className="flex justify-center items-center">
          <button
            onClick={handleEndCallBtnClick}
            className="w-16 h-8 bg-red-500 rounded-b-md focus:outline-none focus:ring-2 focus:ring-gray-800 transition-all active:translate-y-0.5 active:scale-[0.97] active:shadow-md flex items-center justify-center">
            <svg
              className="w-7 h-7"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 15C7 12.2386 9.23858 10 12 10C14.7614 10 17 12.2386 17 15"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle
                cx="12"
                cy="14"
                r="1.5"
                stroke="white"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Number Keypad */}
      <div className="grid grid-cols-3 gap-3">
        {keyMap.map((key) => (
          <button
            key={key.number}
            onClick={() => handleBtnClick(key)}
            className="h-10 bg-gray-600 text-white rounded-lg active:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-800 transition-all active:translate-y-0.5 active:scale-[0.97] active:shadow-md flex flex-col items-center justify-center"
          >
            <span className="font-bold text-xl">{key.number}</span>
            <span className="text-[10px] tracking-widest text-gray-300">
              {key.letters}
            </span>
          </button>
        ))}
      </div>
    </div >
  );
}
