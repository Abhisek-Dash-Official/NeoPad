export default function PhoneApp({ text }) {
  return (
    <div className="flex flex-col items-center justify-between h-full w-full bg-linear-to-b from-blue-50 to-blue-100 p-4 rounded-lg shadow-inner">
      <div className="w-full bg-white/80 backdrop-blur-sm border border-blue-300 rounded-lg p-3 shadow-inner flex flex-col justify-center items-center text-center h-[98%]">
        <p className="text-gray-800 text-xl font-semibold tracking-wide break-all">
          {text.trim() !== "" ? text : "Start Dialing"}
        </p>
        <span className="text-gray-500 text-sm mt-1">
          {text.trim() !== "" ? "Ready to dial" : "Waiting for input"}
        </span>
      </div>
    </div>
  );
}
