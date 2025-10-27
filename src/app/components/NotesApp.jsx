"use client";
import React, { useEffect, useRef } from "react";

export default function NotesApp({ text }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [text]);
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-linear-to-b from-blue-50 to-blue-100 p-4 rounded-lg shadow-inner">
      <h2 className="text-blue-800 font-bold text-xl mb-3">📝 NeoPad Notes</h2>

      <div className="w-full h-full overflow-y-auto bg-white rounded-lg p-3 border border-blue-300 shadow-sm">
        <p
          ref={scrollRef}
          className="text-gray-800 whitespace-pre-wrap wrap-break-word text-sm leading-relaxed"
        >
          {text || "Start typing your notes here..."}
        </p>
      </div>
    </div>
  );
}
