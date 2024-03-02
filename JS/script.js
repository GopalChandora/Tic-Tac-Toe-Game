let boxes = document.querySelectorAll(".Box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.msg-container')
let msg = document.querySelector('#msg');
let counter = 0;
let turnO = true; // PlayerX/PlayerO
// let turn = "O"; // PlayerX/PlayerO

let clickaudio = new Audio("ting.mp3");
let gameEndAudio = new Audio("gameover.mp3");
let bgaudio = new Audio("music.mp3");
let dispTurn = document.querySelector('#disp-turn')
// console.log(dispTurn)

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            dispTurn.innerText = 'Turn for X';
            clickaudio.play()
            turnO = false;
        }
        else {
            box.innerText = "X";
            dispTurn.innerText = 'Turn for O';
            clickaudio.play()
            turnO = true;
        }
        box.disabled = true;

        checkWinner()
    })
})

const reset = () => {
    bgaudio.pause()
    turnO = true
    dispTurn.innerText = 'Turn for O';
    enabledBoxes()
    msgContainer.classList.add('hide')
    // for (let box of boxes) {
    //     box.innerText = ""
    // }
}

const disabledBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enabledBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}
const showWinner = (winner) => {
    gameEndAudio.play()
    msg.innerText = ` Winner is : ${winner}`;
    bgaudio.play()
    msgContainer.classList.remove("hide")
    disabledBoxes();
    // resetBtn.classList.toggle('hide');
}
const draw = () => {
    msg.innerText = `Game is Draw`;
    msgContainer.classList.remove("hide")
    disabledBoxes();
    resetBtn.classList.add('hide');
}

const checkWinner = () => {
    counter += 1;
    for (let pattern of winPatterns) {
        let pos1Value = boxes[pattern[0]].innerText;
        let pos2Value = boxes[pattern[1]].innerText;
        let pos3Value = boxes[pattern[2]].innerText;

        if (pos1Value != "" && pos2Value != "" && pos3Value != "") {
            if (pos1Value === pos2Value && pos2Value === pos3Value) {
                // console.log("Winner")
                showWinner(pos1Value)
            }

            else if (counter === 9) {
                draw()
            }
        }
    }
}


resetBtn.addEventListener('click', reset)
newGameBtn.addEventListener('click', reset)
