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

    return {
        getSign,
        setSign,
        getFirstTurn,
        setFirstTurn
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
        let randomNumber = Math.floor(Math.random() * (max - min)) + min;
    };


    return {
        getSign,
        setSign
    };
})();

const gameBoard = (() => {
    const gameBoardArray = ['', '', '', '', '', '', '', '', ''];
    const gameBoardElement = document.querySelector('.game-board');

    const setFieldSign = (index, sign) => {
        gameBoardArray[index] = sign;
    };
    const getFieldSign = (index) => {
        return gameBoardArray[index];
    };

    const refreshBoard = () => {
        gameBoardElement.innerHTML = '';

        for (let i = 0; i < gameBoardArray.length; i++) {
            let newSquare = document.createElement('div');
            newSquare.dataset.index = i;
            newSquare.dataset.sign = gameBoardArray[i];

            let newIcon = document.createElement('i');
            newIcon.classList.add('fa-solid');
            addStyles(newIcon, gameBoardArray[i]);

            newSquare.appendChild(newIcon);
            gameBoardElement.appendChild(newSquare);

            addEventListeners(newSquare);
        }
    };

    const restart = () => {
        for (let i = 0; gameBoardArray.length > i; i++) {
            gameBoardArray[i] = '';
        }
        refreshBoard();
    }

    const addEventListeners = (element) => {
        element.addEventListener('click', () => {
            if (gameController.getTurn('player') === true) {
                gameBoardArray[element.dataset.index] = player.getSign();
                gameController.setTurn('player', false)
                refreshBoard();
            }
        });
    };

    const addStyles = (element, sign) => {
        if (sign === 'x') {
            element.classList.add('fa-xmark');
        }
        else if (sign === 'o') {
            element.classList.add('fa-o');
        };
    };

    return {
        setFieldSign,
        getFieldSign,
        refreshBoard,
        restart
    };
})();

const gameController = (() => {
    const btnSignX = document.querySelector('.display-controller>button:first-child');
    const btnSignO = document.querySelector('.display-controller>button:last-child');

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


    return {
        gameInit,
        setTurn,
        getTurn,
        restart
    };
})();


gameController.gameInit();



