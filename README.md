# Tic-Tac-Toe Game

This is a simple Tic-Tac-Toe game implemented using HTML, CSS, and JavaScript. The game allows two players to play against each other, with Player 1 using 'X' and Player 2 using 'O'. The game includes animations for box clicks and a celebration animation when a player wins.

## Features

- Two-player game: Player 1 is 'X' and Player 2 is 'O'.
- Score tracking for both players.
- Reset button to start a new game.
- Animations for box clicks and winning combinations.
- Celebration animation with confetti when a player wins.

## How to Play

1. Open the `index.html` file in your web browser.
2. Player 1 starts by clicking on any empty box to place an 'X'.
3. Player 2 then clicks on any empty box to place an 'O'.
4. The game continues until one player wins or all boxes are filled (resulting in a draw).
5. The scores are updated automatically after each game.
6. Click the "Reset" button to start a new game.

## Files

- `index.html`: The main HTML file containing the game layout.
- `styles.css`: The CSS file containing styles and animations for the game.
- `tic.js`: The JavaScript file containing the game logic.

## Code Snippet

Here is a snippet of the main game logic from `tic.js`:

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.box');
    const player1ScoreElement = document.querySelector('.player1-score');
    const player2ScoreElement = document.querySelector('.player2-score');
    const resetButton = document.getElementById('reset');

    // Player 1 is 'X' and Player 2 is 'O'
    let currentPlayer = 'Player 1';
    let player1Score = 0;
    let player2Score = 0;
    let board = ['', '', '', '', '', '', '', '', ''];

    boxes.forEach((box, index) => {
        box.addEventListener('click', () => {
            if (box.textContent === '' && !checkWinner()) {
                box.textContent = currentPlayer === 'Player 1' ? 'X' : 'O';
                box.classList.add('clicked');
                board[index] = currentPlayer === 'Player 1' ? 'X' : 'O';
                const winner = checkWinner();
                if (winner) {
                    updateScore(currentPlayer);
                    alert(`${currentPlayer} wins! Better Luck Next Time`);
                    highlightWinningCombination(winner);
                    showCelebration();
                } else if (board.every(cell => cell !== '')) {
                    alert('It\'s a draw!');
                } else {
                    currentPlayer = currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1';
                }
            }
        });
    });

    resetButton.addEventListener('click', resetGame);

    function resetGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        boxes.forEach(box => {
            box.textContent = '';
            box.classList.remove('clicked', 'winning');
        });
        currentPlayer = 'Player 1';
        removeCelebration();
    }

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return combination;
            }
        }
        return null;
    }

    function updateScore(winner) {
        if (winner === 'Player 1') {
            player1Score++;
            player1ScoreElement.textContent = player1Score;
        } else if (winner === 'Player 2') {
            player2Score++;
            player2ScoreElement.textContent = player2Score;
        }
    }

    function highlightWinningCombination(combination) {
        combination.forEach(index => {
            boxes[index].classList.add('winning');
        });
    }

    function showCelebration() {
        const confettiContainer = document.createElement('div');
        confettiContainer.classList.add('confetti-container');
        document.body.appendChild(confettiContainer);

        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = [`${Math.random() * 100}vw`](command:_github.copilot.openSymbolFromReferences?%5B%22%24%7BMath.random()%20*%20100%7Dvw%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22c%3A%5C%5CUsers%5C%5CSakshi%20Thakur%5C%5CTicTacToe%5C%5Ctic.js%22%2C%22_sep%22%3A1%2C%22external%22%3A%22file%3A%2F%2F%2Fc%253A%2FUsers%2FSakshi%2520Thakur%2FTicTacToe%2Ftic.js%22%2C%22path%22%3A%22%2FC%3A%2FUsers%2FSakshi%20Thakur%2FTicTacToe%2Ftic.js%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A21%2C%22character%22%3A27%7D%7D%5D%5D "Go to definition");
            confetti.style.animationDelay = [`${Math.random() * 2}s`](command:_github.copilot.openSymbolFromReferences?%5B%22%24%7BMath.random()%20*%202%7Ds%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22c%3A%5C%5CUsers%5C%5CSakshi%20Thakur%5C%5CTicTacToe%5C%5Ctic.js%22%2C%22_sep%22%3A1%2C%22external%22%3A%22file%3A%2F%2F%2Fc%253A%2FUsers%2FSakshi%2520Thakur%2FTicTacToe%2Ftic.js%22%2C%22path%22%3A%22%2FC%3A%2FUsers%2FSakshi%20Thakur%2FTicTacToe%2Ftic.js%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A21%2C%22character%22%3A27%7D%7D%5D%5D "Go to definition");
            confettiContainer.appendChild(confetti);
        }
    }

    function removeCelebration() {
        const confettiContainer = document.querySelector('.confetti-container');
        if (confettiContainer) {
            confettiContainer.remove();
        }
    }
});
