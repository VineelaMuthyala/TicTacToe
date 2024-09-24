import React, { useState } from 'react';
import './index.css';

const clickX = new Audio('/sounds/click-1.mp3');
const clickO = new Audio('/sounds/click-2.mp3');

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const winnerInfo = calculateWinner(board);
    const winner = winnerInfo ? winnerInfo.winner : null;
    const winningIndices = winnerInfo ? winnerInfo.line : [];
    const isDraw = board.every(square => square !== null) && !winner;

    const handleClick = (index) => {
        if (board[index] || winner) return;

        const newBoard = board.slice();
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        
        // Play sound only if the game is not over
        if (!winner && !isDraw) {
            isXNext ? clickX.play() : clickO.play();
        }
        
        setIsXNext(!isXNext);
    };

    const renderSquare = (index) => (
        <button
            key={index}
            className={`square ${board[index] === 'X' ? 'x' : board[index] === 'O' ? 'o' : ''}`}
            onClick={() => handleClick(index)}
        >
            {board[index]}
        </button>
    );

    const handleReset = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
    };

    // Winning line overlay
    const renderWinningLine = () => {
        if (!winningIndices || winningIndices.length === 0) return null;

        // Calculate the direction and positions based on the winning indices
        const lineClass = getLineClass(winningIndices);

        return <div className={`winning-line ${lineClass}`}></div>;
    };

    return (
        <div className="game-container">
            
            <h2 className='game-heading'>Tic Tac Toe</h2>
            <div className="board-container">
                <div className="board">
                    {[0, 1, 2].map(row => (
                        <div key={row} className="board-row">
                            {[0, 1, 2].map(col => renderSquare(row * 3 + col))}
                        </div>
                    ))}
                    {renderWinningLine()}
                </div>
                <div className="status">
                {winner ? (
                    <div>
                        <h2 className="game-over">
                            <span className={`winner-symbol ${winner}`}>
                                {winner}
                            </span>
                        </h2>
                        <h2 className="winner-message">Winner!</h2>
                    </div>
                ) : isDraw ? (
                    <div>
                        <div className="draw-symbols">
                            <span className="winner-symbol X">X</span>
                            <span className="winner-symbol O">O</span>
                        </div>
                        <h2 className="game-over">Draw!</h2>
                    </div>
                ) : (
                    <p>Next player: {isXNext ? 'X' : 'O'}</p>
                )}
            </div>
            </div>
            
            <button className="reset-button" onClick={handleReset}>Reset</button>
        </div>
    );
};

// Returns the winner and the line (winning indices)
const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]              // diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a], line: [a, b, c] };  // Return both winner and line
        }
    }
    return null;
};

// Returns a CSS class based on the winning indices
const getLineClass = (line) => {
    if (line.includes(0) && line.includes(1) && line.includes(2)) {
        return 'horizontal-row-1';
    }
    if (line.includes(3) && line.includes(4) && line.includes(5)) {
        return 'horizontal-row-2';
    }
    if (line.includes(6) && line.includes(7) && line.includes(8)) {
        return 'horizontal-row-3';
    }
    if (line.includes(0) && line.includes(3) && line.includes(6)) {
        return 'vertical-col-1';
    }
    if (line.includes(1) && line.includes(4) && line.includes(7)) {
        return 'vertical-col-2';
    }
    if (line.includes(2) && line.includes(5) && line.includes(8)) {
        return 'vertical-col-3';
    }
    if (line.includes(0) && line.includes(4) && line.includes(8)) {
        return 'diagonal-1';
    }
    if (line.includes(2) && line.includes(4) && line.includes(6)) {
        return 'diagonal-2';
    }
    return '';
};

export default TicTacToe;
