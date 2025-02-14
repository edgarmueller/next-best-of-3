'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Scoreboard() {
  const [games, setGames] = useState({ player1: 0, player2: 0 });
  const [sets, setSets] = useState({ player1: 0, player2: 0 });
  const [matches, setMatches] = useState({ player1: 0, player2: 0 });
  const [winner, setWinner] = useState(null);

  function addGame(player) {
    if (winner) return;
    let newScore = games[player] + 1;

    if (newScore == 2) {
      winSet(player);
      setGames(() => ({ player1: 0, player2: 0 }));
    } else {
      setGames((prev) => ({ ...prev, [player]: newScore }));
    }
  }

	function winSet(player) {
		setSets((prevSets) => {
			const newSets = { ...prevSets, [player]: prevSets[player] + 1 };
	
			if (newSets[player] === 2) {
				// First, reset the sets
				return { player1: 0, player2: 0 };
			}
	
			return newSets;
		});
	
		setGames({ player1: 0, player2: 0 }); // Reset games
	
		// Now, check if a match should be won *after* sets are updated
		if (sets[player] + 1 === 2) {
			setMatches((prevMatches) => ({
				...prevMatches,
				[player]: prevMatches[player] + 1,
			}));
		}
	}

	function winMatch(player) {
    setMatches((prev) => {
      let newScore = { ...prev, [player]: prev[player] + 1 };
      return newScore;
    });
  }

  function resetGame() {
    setMatches({ player1: 0, player2: 0 });
    setGames({ player1: 0, player2: 0 });
    setSets({ player1: 0, player2: 0 });
    setWinner(null);
  }

  return (
		<motion.div
		initial={{ opacity: 0, scale: 0.9 }}
		animate={{ opacity: 1, scale: 1 }}
		transition={{ duration: 0.3 }}
		className="w-full max-w-2xl p-10 bg-gradient-to-br from-indigo-800 to-purple-700 text-white rounded-3xl shadow-2xl flex flex-col items-center space-y-8 border-4 border-indigo-500"
	>
		{winner && (
			<motion.h2 
				initial={{ scale: 0.8 }}
				animate={{ scale: 1 }}
				className="text-4xl font-extrabold text-yellow-300 drop-shadow-lg"
			>
				🎉 {winner} Wins! 🎉
			</motion.h2>
		)}
		
		<div className="w-full grid grid-cols-3 gap-6 text-2xl text-center font-medium">
			<span></span>
			<span className="font-bold text-yellow-300 uppercase">Player 1</span>
			<span className="font-bold text-blue-300 uppercase">Player 2</span>
			<span className="opacity-90 text-lg">Matches</span>
			<span className="font-mono text-3xl font-bold">{matches.player1}</span>
			<span className="font-mono text-3xl font-bold">{matches.player2}</span>
			<span className="opacity-90 text-lg">Sets</span>
			<span className="font-mono text-3xl font-bold">{sets.player1}</span>
			<span className="font-mono text-3xl font-bold">{sets.player2}</span>
			<span className="opacity-90 text-lg">Games</span>
			<span className="font-mono text-3xl font-bold">{games.player1}</span>
			<span className="font-mono text-3xl font-bold">{games.player2}</span>
		</div>

		<div className="flex space-x-6">
			<button onClick={() => addGame('player1')} className="px-6 py-3 text-xl bg-yellow-300 text-indigo-900 font-bold rounded-full shadow-lg hover:bg-yellow-400 transition-transform transform hover:scale-105">
				+1 Player 1
			</button>
			<button onClick={() => addGame('player2')} className="px-6 py-3 text-xl bg-blue-300 text-indigo-900 font-bold rounded-full shadow-lg hover:bg-blue-400 transition-transform transform hover:scale-105">
				+1 Player 2
			</button>
			<button onClick={resetGame} className="px-6 py-3 text-xl bg-red-500 text-white font-bold rounded-full shadow-lg hover:bg-red-600 transition-transform transform hover:scale-105">
				Reset
			</button>
		</div>
	</motion.div>
  );
}
