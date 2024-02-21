let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");

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

resetbtn.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    turnO = true; 
});
