const player = (() => {
    let sign = 'x';

    const getSign = () => {
        return sign;
    }
    const setSign = (newSign) => {
        sign = newSign;
    }

    return { getSign, setSign };
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

    const addEventListeners = (element) => {
        element.addEventListener('click', () => {
            gameBoardArray[element.dataset.index] = player.getSign();
            refreshBoard();
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

    return { setFieldSign, getFieldSign, refreshBoard };
})();

const gameController = (() => {
    const btnSignX = document.querySelector('.display-controller>button:first-child');
    const btnSignO = document.querySelector('.display-controller>button:last-child');

    const addEventListeners = () => {
        btnSignX.addEventListener('click', () => {
            player.setSign('x');
        });
        btnSignO.addEventListener('click', () => {
            player.setSign('o');
        });
    }

    const gameInit = () => {
        gameBoard.refreshBoard();
        addEventListeners();
    };
    return { gameInit };
})();


gameController.gameInit();



