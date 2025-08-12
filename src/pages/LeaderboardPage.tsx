import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./confirmModal";

type Player = {
  name: string;
  score: number;
};

export default function LeaderboardPage() {
  const navigate = useNavigate();
  
  const [showConfirm, setShowConfirm] = useState(false);
  const [leaderboard, setLeaderboard] = useState<Player[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"highest" | "lowest" | "none">(
    "none"
  );

  // Load leaderboard from localStorage on mount (newest first)
  useEffect(() => {
    const stored = localStorage.getItem("leaderboard");
    if (stored) {
      setLeaderboard(JSON.parse(stored).reverse()); // newest at top
    }
  }, []);

  // Save leaderboard to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  }, [leaderboard]);

  function deletePlayer(index: number) {
    setLeaderboard((prev) => prev.filter((_, i) => i !== index));
  }

  const handleGoHome = () => navigate("/");
  const handlePlayAgain = () => navigate("/quiz");

  const clearLeaderboard = () => {
    setLeaderboard([]);
    setShowConfirm(false);
  };

  // Filter by search
  let filtered = leaderboard.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Apply score sorting only if selected
  if (sortOrder === "highest") {
    filtered = [...filtered].sort((a, b) => b.score - a.score);
  } else if (sortOrder === "lowest") {
    filtered = [...filtered].sort((a, b) => a.score - b.score);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Quiz Leaderboard
        </h1>

        {/* Empty Leaderboard State */}
        {leaderboard.length === 0 ? (
          <div className="text-center text-gray-700">
            <p className="mb-6 text-lg">
              No player yet! Be the first to take the quiz.
            </p>
            <button
              onClick={() => navigate("/quiz")}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg cursor-pointer"
            >
              Start Quiz
            </button>
          </div>
        ) : (
          <>
            {/* Search & Sort */}
            <div className="mb-6 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search by name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter player name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort by score
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => setSortOrder("highest")}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                        sortOrder === "highest"
                          ? "bg-purple-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      Highest ➡️ Lowest
                    </button>
                    <button
                      onClick={() => setSortOrder("lowest")}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                        sortOrder === "lowest"
                          ? "bg-purple-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      Lowest ➡️ Highest
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-6 py-3 text-left text-gray-700 font-semibold">
                      Rank
                    </th>
                    <th className="border border-gray-300 px-6 py-3 text-left text-gray-700 font-semibold">
                      Name
                    </th>
                    <th className="border border-gray-300 px-6 py-3 text-left text-gray-700 font-semibold">
                      Score
                    </th>
                    <th className="border border-gray-300 px-6 py-3 text-left text-gray-700 font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="border border-gray-300 px-6 py-8 text-center text-gray-500"
                      >
                        No players found.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((player, index) => (
                      <tr
                        key={index}
                        className={`border border-gray-300 ${
                          index === 0 && sortOrder === "highest"
                            ? "bg-yellow-100 font-bold"
                            : "bg-white"
                        }`}
                      >
                        <td className="border border-gray-300 px-6 py-3">
                          {index + 1}
                        </td>
                        <td className="border border-gray-300 px-6 py-3">
                          {player.name}
                        </td>
                        <td className="border border-gray-300 px-6 py-3">
                          {player.score}
                        </td>
                        <td className="border border-gray-300 px-6 py-3 text-center">
                          <button
                            onClick={() => deletePlayer(index)}
                            className="text-red-600 hover:underline cursor-pointer"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={handleGoHome}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white cursor-pointer font-bold py-3 px-8 rounded-full text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg"
              >
                Back to Home
              </button>
              <button
                onClick={handlePlayAgain}
                className="bg-gradient-to-r cursor-pointer from-green-500 to-emerald-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg"
              >
                Play Again
              </button>
              <button
                onClick={() => setShowConfirm(true)}
                className="bg-gradient-to-r from-red-500 cursor-pointer to-red-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg"
              >
                Reset Leaderboard
              </button>
              <ConfirmModal
                isOpen={showConfirm}
                onConfirm={clearLeaderboard}
                onCancel={() => setShowConfirm(false)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
