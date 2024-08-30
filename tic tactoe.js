let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
const player1ScoreElement = document.getElementById('player1-score');
const player2ScoreElement = document.getElementById('player2-score');
let player1Score = 0;
let player2Score = 0;

let turnO = true;
const winpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (!box.innerText) { 
            if (turnO) {
                box.innerText = "O";
            } else {
                box.innerText = "X";
            }
            turnO = !turnO; 
            checkWinner();
        }
    });
});

function checkWinner() {
    for (let pattern of winpatterns) {
        let [a, b, c] = pattern;
        if (
            boxes[a].innerText &&
            boxes[a].innerText === boxes[b].innerText &&
            boxes[a].innerText === boxes[c].innerText
        ) {
            // If there's a winner, disable all boxes
            

            updateScore(turnO ? 'Player 2' : 'Player 1');
            boxes.forEach((box) => {
            box.disabled = true;
            });
            return;
        }
    }
    
    if ([...boxes].every((box) => box.innerText)) {
        boxes.forEach((box) => {
            box.disabled = true;
        });
    }
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

resetbtn.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    turnO = true; 
});
