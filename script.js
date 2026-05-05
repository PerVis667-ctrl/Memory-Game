const board = document.getElementById("board");
const movesDisplay = document.getElementById("moves");
const timeDisplay = document.getElementById("time");

let cardsArray = ["A","A","B","B","C","C","D","D","E","E","F","F","G","G","H","H"];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let time = 0;
let matchedPairs = 0;
let timer;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function startGame() {
    board.innerHTML = "";
    cardsArray = shuffle(cardsArray);
    moves = 0;
    time = 0;
    matchedPairs = 0;

    movesDisplay.textContent = moves;
    timeDisplay.textContent = time;

    clearInterval(timer);
    timer = setInterval(() => {
        time++;
        timeDisplay.textContent = time;
    }, 1000);

    cardsArray.forEach(letter => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.value = letter;

        card.addEventListener("click", () => flipCard(card));
        board.appendChild(card);
    });
}

function flipCard(card) {
    if (lockBoard || card === firstCard) return;

    card.textContent = card.dataset.value;
    card.classList.add("flipped");

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    moves++;
    movesDisplay.textContent = moves;

    checkMatch();
}

function checkMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        matchedPairs++;

        if (matchedPairs === 8) {
            clearInterval(timer);
            setTimeout(() => {
                alert(`You won in ${moves} moves and ${time} seconds!`);
            }, 300);
        }

        resetBoard();
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.textContent = "";
            secondCard.textContent = "";
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetBoard();
        }, 1000);
    }
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

startGame();
