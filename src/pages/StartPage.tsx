import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StartPage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    if (!name.trim()) return alert("Pls input your name");
    localStorage.setItem("currentUser", JSON.stringify({ name }));
    navigate("/quiz");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 max-w-md w-full">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Quiz Challenge
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            Test your knowledge and compete for the top spot!
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleStart();
            }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-gray-800">
              Enter Your Name
            </h3>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none text-lg"
              required
            />
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-3 px-6 rounded-xl  shadow hover:opacity-90  transition-all duration-300 cursor-pointer"
              >
                Start Quiz
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold py-3 px-6 rounded-xl hover:from-red-600 hover:to-pink-700 transition-all duration-300 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


