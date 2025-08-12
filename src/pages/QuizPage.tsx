import { useReducer, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Question = {
  id: number;
  question: string;
  options: string[];
  correct: string;
};

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "22"],
    correct: "4",
  },
  {
    id: 2,
    question: "Capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    correct: "Paris",
  },
  {
    id: 3,
    question: "Who wrote Hamlet?",
    options: ["Tolkien", "Shakespeare", "Austen", "Dickens"],
    correct: "Shakespeare",
  },
  {
    id: 4,
    question: "4 * 3 = ?",
    options: ["12", "14", "9", "11"],
    correct: "12",
  },
  {
    id: 5,
    question: "What does HTML stand for?",
    options: [
      "Hyperlinks and Text Markup Language",
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinking Text Management Language",
    ],
    correct: "Hyper Text Markup Language",
  },
  {
    id: 6,
    question: "Which CSS property controls text size?",
    options: ["font-weight", "font-size", "text-style", "text-size"],
    correct: "font-size",
  },
  {
    id: 7,
    question: "Inside which HTML element do we put JavaScript?",
    options: ["<javascript>", "<js>", "<script>", "<code>"],
    correct: "<script>",
  },
  {
    id: 8,
    question: "Which company developed React?",
    options: ["Google", "Facebook", "Microsoft", "Apple"],
    correct: "Facebook",
  },
  {
    id: 9,
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Colorful Style Syntax",
      "Computer Styled Sections",
      "Creative Style System",
    ],
    correct: "Cascading Style Sheets",
  },
];

type State = { index: number; score: number };
type Action =
  | { type: "ANSWER"; correct: boolean }
  | { type: "NEXT" }
  | { type: "RESET" };

const initialState: State = { index: 0, score: 0 };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ANSWER":
      return {
        ...state,
        score: action.correct ? state.score + 1 : state.score,
      };
    case "NEXT":
      return { ...state, index: state.index + 1 };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function QuizPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [time, setTime] = useState(10);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser") || "{}");

  useEffect(() => {
    if (quizFinished || state.index >= QUESTIONS.length) return;
    setTime(15);
    const timer = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          dispatch({ type: "NEXT" });
          return 15;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [state.index, quizFinished]);

  const handleAnswer = (option: string) => {
    setSelectedOption(option);
    const correct = option === QUESTIONS[state.index].correct;
    setIsCorrect(correct);
    dispatch({ type: "ANSWER", correct });

    if (state.index === QUESTIONS.length - 1) {
      setTimeout(() => {
        setQuizFinished(true);

        if (user.name) {
          const leaderboard: { name: string; score: number }[] = JSON.parse(
            localStorage.getItem("leaderboard") || "[]"
          );
          leaderboard.push({
            name: user.name,
            score: state.score + (correct ? 1 : 0),
          });
          leaderboard.sort((a, b) => b.score - a.score);
          leaderboard.splice(10);
          localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
        }

        setTimeout(() => navigate("/leaderboard"), 3000);
      }, 1000);
    } else {
      setTimeout(() => {
        setSelectedOption(null);
        setIsCorrect(null);
        dispatch({ type: "NEXT" });
      }, 1000);
    }
  };

  const currentQuestion = QUESTIONS[state.index];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 p-4 relative">
      {/* Modal Overlay */}
      {quizFinished && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="min-h-screen bg-black/40 backdrop-blur-sm absolute inset-0"></div>
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 max-w-lg w-full text-center z-10">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Quiz Completed!
            </h2>
            <p className="text-lg mb-2">
              Congratulations,{" "}
              <span className="font-semibold">{user.name || "Guest"}</span>!
            </p>
            <p className="text-lg mb-6">
              Your final score:{" "}
              <span className="font-semibold">{state.score}</span> /{" "}
              {QUESTIONS.length}
            </p>
            <p className="text-gray-600">Redirecting to leaderboard...</p>
          </div>
        </div>
      )}

      {/* Quiz Content */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 max-w-3xl w-full relative">
        {/* Header */}
        <div className="flex justify-between mb-4 text-[18px] font-bold text-gray-800">
          <span className="font-semibold">
            Question {state.index + 1} of {QUESTIONS.length}
          </span>
          <span>
            Player: {user.name || "Guest"} | Score: {state.score}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
          <div
            style={{ width: `${(time / 15) * 100}%` }}
            className="h-full bg-red-500 transition-all duration-1000"
          ></div>
        </div>

        <p className="text-gray-700 font-medium mb-6">Time: {time}s</p>

        {/* Question */}
        <h1 className="text-xl font-semibold mb-4 text-gray-800">
          {currentQuestion.question}
        </h1>

        {/* Options - 2x2 grid */}
        <div className="grid grid-cols-2 gap-4">
          {currentQuestion.options.map((option, idx) => {
            let btnClass =
              "border px-4 py-3 rounded-lg text-center font-medium transition-colors duration-300";
            if (selectedOption === option) {
              btnClass += isCorrect
                ? " bg-green-500 text-white border-green-500 cursor-pointer"
                : " bg-red-500 text-white border-red-500 cursor-pointer";
            } else if (selectedOption && option === currentQuestion.correct) {
              btnClass +=
                " bg-green-500 text-white border-green-500 cursor-pointer";
            } else {
              btnClass +=
                " bg-white hover:bg-gray-100 border-gray-300 cursor-pointer";
            }
            return (
              <button
                key={idx}
                className={btnClass}
                onClick={() => handleAnswer(option)}
                disabled={selectedOption !== null}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
