import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-500">
      <div className="bg-white rounded-[20px] shadow-lg px-8  py-16 text-center gap-1 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-2">Quiz Challenge</h1>
        <p className="mb-6 text-[20px] text-gray-600">
          Test your knowledge and compete for the top spot!
        </p>
        <button
          onClick={() => navigate("/start")}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-xl text-white w-64 py-3 rounded-[25px] shadow hover:opacity-90 transition cursor-pointer"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
