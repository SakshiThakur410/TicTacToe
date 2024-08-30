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
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.animationDelay = `${Math.random() * 2}s`;
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