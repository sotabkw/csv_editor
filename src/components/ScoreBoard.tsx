import React from 'react';
import { ThrowResult } from '../types/game';
import { Target } from 'lucide-react';

interface ScoreBoardProps {
  currentScore: number;
  throws: ThrowResult[];
  onScoreSubmit: (score: number, multiplier: 1 | 2 | 3) => void;
}

export function ScoreBoard({ currentScore, throws, onScoreSubmit }: ScoreBoardProps) {
  const [selectedScore, setSelectedScore] = React.useState<number>(0);
  const [selectedMultiplier, setSelectedMultiplier] = React.useState<1 | 2 | 3>(1);

  const handleSubmit = () => {
    if (selectedScore > 0) {
      onScoreSubmit(selectedScore, selectedMultiplier);
      setSelectedScore(0);
      setSelectedMultiplier(1);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
      <div className="flex items-center justify-center mb-6">
        <Target className="w-8 h-8 text-red-500 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Current Score: {currentScore}</h2>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25].map((num) => (
          <button
            key={num}
            onClick={() => setSelectedScore(num)}
            className={`p-3 text-center rounded ${
              selectedScore === num
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {num}
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-4 mb-6">
        {[1, 2, 3].map((multiplier) => (
          <button
            key={multiplier}
            onClick={() => setSelectedMultiplier(multiplier as 1 | 2 | 3)}
            className={`px-4 py-2 rounded ${
              selectedMultiplier === multiplier
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {multiplier}x
          </button>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Submit Score
      </button>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Recent Throws</h3>
        <div className="space-y-2">
          {throws.slice(-5).reverse().map((throw_, index) => (
            <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
              <span>{throw_.score * throw_.multiplier} points</span>
              <span className="text-gray-500">
                ({throw_.score} × {throw_.multiplier})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}