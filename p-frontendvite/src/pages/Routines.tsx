import LateralPanel from "../components/LateralPanel";

export default function Routines() {
  return (
    <div className="flex flex-row min-h-full bg-gray-200">
      <LateralPanel />
      <div className="flex flex-1 flex-col justify-center items-center border-black min-h-screen bg-gray-200">
        <h1 className="text-2xl font-bold mb-4">Routines</h1>
        <p className="text-gray-700">This is the Routines component.</p>
      </div>
    </div>
  );
}
