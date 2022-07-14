const player = (() => {
    let sign = 'x';
    let firstTurn = true;

    const getSign = () => {
        return sign;
    };
    const setSign = (newSign) => {
        sign = newSign;
    };

    const setFirstTurn = (boolean) => {
        firstTurn = boolean;
    };
    const getFirstTurn = () => {
        return firstTurn;
    };

    const makeMove = (element) => {
        if (gameController.getTurn('player') === true) {
            gameBoard.setFieldSign(element.dataset.index, sign);
            // gameController.setTurn('player', false);
            gameBoard.refreshBoard();
        }
    };

    return {
        getSign,
        setSign,
        getFirstTurn,
        setFirstTurn,
        makeMove
    };
})();


const ai = (() => {
    let sign = 'o';

    const getSign = () => {
        return sign;
    };
    const setSign = (newSign) => {
        sign = newSign;
    };

    const randomPick = () => {
        // let randomNumber = Math.floor(Math.random() * (max - min)) + min;
        let array = gameBoard.getBoardArray();
        let availableArray = [];
        for (let index in array) {
            if (!array[index].includes('x') && !array[index].includes('o')) {
                console.log(index);
                availableArray.push(index);
            }
            else {
                continue;
            }
        };
        let randomNumber = Math.floor(Math.random() * (availableArray.length - 0)) + 0;
        gameBoard.setFieldSign(availableArray[randomNumber], sign);
        gameBoard.refreshBoard();
        gameController.setTurn('player', true);

    };


    return {
        getSign,
        setSign,
        randomPick
    };
})();

const gameBoard = (() => {
    const gameBoardArray = ['', '', '', '', '', '', '', '', ''];
    const gameBoardElement = document.querySelector('.game-board');
    const winConditionsArray = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const setFieldSign = (index, sign) => {
        gameBoardArray[index] = sign;
    };
    const getFieldSign = (index) => {
        return gameBoardArray[index];
    };

    const getBoardArray = () => {
        return gameBoardArray;
    };

    const refreshBoard = () => {
        gameBoardElement.innerHTML = '';

        for (let i = 0; i < gameBoardArray.length; i++) {
            let newSquare = document.createElement('div');
            newSquare.dataset.index = i;
            newSquare.dataset.sign = gameBoardArray[i];

            let newIcon = document.createElement('i');
            newIcon.classList.add('fa-solid');
            addSignStyles(newIcon, gameBoardArray[i]);

            newSquare.appendChild(newIcon);
            gameBoardElement.appendChild(newSquare);

            addEventListeners(newSquare);
        }
        checkBoard();
    };

    const restart = () => {
        for (let i = 0; gameBoardArray.length > i; i++) {
            gameBoardArray[i] = '';
        }
        refreshBoard();
    }

    const addEventListeners = (element) => {
        element.addEventListener('click', () => {
            player.makeMove(element);
        });
    };

    const addSignStyles = (element, sign) => {
        if (sign === 'x') {
            element.classList.add('fa-xmark');
        }
        else if (sign === 'o') {
            element.classList.add('fa-o');
        };
    };

    const addWinStyles = (winner, arrayOfIndexes) => {
        const arrayOfDivs = document.querySelectorAll('.game-board div');
        for (let div of arrayOfDivs) {
            if (arrayOfIndexes.includes(parseInt(div.dataset.index))) {
                winner === player.getSign() ? div.classList.add('playerWin') : div.classList.add('aiWin');

            }
        }
    };

    const checkBoard = () => {
        console.clear();
        let winner = '';
        let winnerCondition = [];
        for (let condition of winConditionsArray) {
            let scoreX = 0;
            let scoreO = 0;
            for (let index of condition) {
                if (gameBoardArray[index] === 'x') {
                    scoreX++;
                }
                else if (gameBoardArray[index] === 'o') {
                    scoreO++;
                }
                else {
                    break;
                }
            }
            if (scoreX === 3) {
                console.log(`X WIN at positions ${condition}`);
                winner = 'x';
                winnerCondition = condition;
                break;
            };
            if (scoreO === 3) {
                console.log(`O WIN at positions ${condition}`);
                winner = 'o';
                winnerCondition = condition;
                break;
            };
            console.log(`Condition: ${condition} checked...`)
        }

        if (winner !== '') addWinStyles(winner, winnerCondition);
    };

    return {
        setFieldSign,
        getFieldSign,
        getBoardArray,
        refreshBoard,
        restart
    };
})();

const gameController = (() => {
    const btnSignX = document.querySelector('.display-controller>button:first-child');
    const btnSignO = document.querySelector('.display-controller>button:last-child');
    const gameAnnouncer = document.querySelector('.game-announcer');

    let playerTurn = true;
    let aiTurn = false;

    const addEventListeners = () => {
        btnSignX.addEventListener('click', () => {
            player.setSign('x');
            ai.setSign('o');
            gameController.restart();
        });
        btnSignO.addEventListener('click', () => {
            player.setSign('o');
            ai.setSign('x');
            gameController.restart();
        });
    }

    const gameInit = () => {
        gameBoard.refreshBoard();
        addEventListeners();
    };

    const restart = () => {
        player.setFirstTurn(true);
        playerTurn = true;
        aiTurn = false;
        gameBoard.restart();
    };

    const setTurn = (subject, changeTo) => {
        if (subject === 'player') {
            playerTurn = changeTo;
        }
        else if (subject === 'ai') {
            aiTurn = changeTo;
        }
    };
    const getTurn = (subject) => {
        if (subject === 'player') {
            return playerTurn;
        }
        else if (subject === 'ai') {
            return aiTurn;
        }
    };

    const endGame = () => {

    };

    return {
        gameInit,
        setTurn,
        getTurn,
        restart
    };
})();


gameController.gameInit();



