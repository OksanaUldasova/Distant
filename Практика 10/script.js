
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    const gameContainer = document.getElementById('gameContainer'); // Исправлено: gamecontainer -> gameContainer
    const pointsDisplay = document.getElementById('points');
    const game = document.getElementById('game');
    const upgrade1Button = document.getElementById('upgrade1');
    const upgrade2Button = document.getElementById('upgrade2');
    const autoclickerButton = document.getElementById('autoclicker');
    const autoclickerLevelElement = document.getElementById('autoclickerLevel');

    let points = 0;
    let clickStrength = 1; // Начальная сила клика
    let upgrade1Cost = 20;
    let upgrade2Cost = 100;

    let autoclickerLevel = 0; // Начальный уровень автокликкера
    let autoclickerCost = 2000;
    let autoclickerInterval = null; // Для хранения setInterval ID

    // Предзагрузчик
    setTimeout(function() {
        preloader.style.display = 'none';
        gameContainer.style.display = 'block';
    }, 4000);

    // Функция для обновления отображения очков
    function updatePoints() {
        pointsDisplay.textContent = 'Очки: ' + points;
    }

    // Функция для обновления отображения уровня автокликкера
    function updateAutoclickerLevel() {
        autoclickerLevelElement.textContent = 'Уровень автокликкера: ' + autoclickerLevel;
    }

    // Функция для обновления текста кнопки автокликкера
    function updateAutoclickerButtonText() {
        autoclickerButton.textContent = 'Автоклик: ' + autoclickerCost;
    }

    // Функция для запуска/остановки автокликкера
    function startAutoclicker() {
        if (autoclickerInterval) {
            clearInterval(autoclickerInterval); // Остановить предыдущий интервал
        }
        if (autoclickerLevel > 0) { // Запускать только если уровень > 0
            const intervalSpeed = 1000 / autoclickerLevel; // Чем выше уровень, тем быстрее автоклик (пример)
            autoclickerInterval = setInterval(() => {
                points += autoclickerLevel; // Автоклик дает очки, равные уровню
                updatePoints();
                saveGame(); // Сохраняем игру после автоклика
            }, intervalSpeed);
        }
    }

    // Функция для сохранения игры в localStorage
    function saveGame() {
        const gameState = {
            points: points,
            clickStrength: clickStrength,
            upgrade1Cost: upgrade1Cost,
            upgrade2Cost: upgrade2Cost,
            autoclickerLevel: autoclickerLevel,
            autoclickerCost: autoclickerCost
        };
        localStorage.setItem('gameState', JSON.stringify(gameState));
    }

    // Функция для загрузки игры из localStorage
    function loadGame() {
        const savedGameState = localStorage.getItem('gameState');
        if (savedGameState) {
            const gameState = JSON.parse(savedGameState);
            points = gameState.points;
            clickStrength = gameState.clickStrength;
            upgrade1Cost = gameState.upgrade1Cost;
            upgrade2Cost = gameState.upgrade2Cost;
            autoclickerLevel = gameState.autoclickerLevel;
            autoclickerCost = gameState.autoclickerCost;

            updatePoints();
            upgrade1Button.textContent = "Сила клика: " + upgrade1Cost + "";
            upgrade2Button.textContent = "Скорость клика: " + upgrade2Cost + "";
            updateAutoclickerLevel();
            updateAutoclickerButtonText();
            startAutoclicker(); // Запускаем автокликкер после загрузки
        }
    }

    // Обработчик клика на основную кнопку
    game.addEventListener('click', function() {
        points += clickStrength;
        updatePoints();
        saveGame(); // Сохраняем игру после клика
    });

    // Обработчик клика на улучшение силы клика
    upgrade1Button.addEventListener('click', function() {
        if (points >= upgrade1Cost) {
            points -= upgrade1Cost;
            clickStrength++;
            upgrade1Cost = Math.round(upgrade1Cost * 1.5); // Цена увеличивается
            upgrade1Button.textContent = "Сила клика: " + upgrade1Cost + "";
            updatePoints();
            saveGame();
        } else {
            alert('Недостаточно очков!');
        }
    });

    // Обработчик клика на улучшение скорости клика (пока не влияет на скорость, просто увеличивает силу)
    upgrade2Button.addEventListener('click', function() {
        if (points >= upgrade2Cost) {
            points -= upgrade2Cost;
            clickStrength++; // Временно: просто увеличиваем силу клика
            upgrade2Cost = Math.round(upgrade2Cost * 1.5); // Цена увеличивается
            upgrade2Button.textContent = "Скорость клика: " + upgrade2Cost + "";
            updatePoints();
            saveGame();
        } else {
            alert('Недостаточно очков!');
        }
    });

    // Обработчик клика на автокликкер
    autoclickerButton.addEventListener('click', function() {
        if (points >= autoclickerCost) {
            points -= autoclickerCost;
            autoclickerLevel++;
            autoclickerCost = Math.round(autoclickerCost * 1.15); // Цена увеличивается на 15%
            updatePoints();
            updateAutoclickerLevel();
            updateAutoclickerButtonText();
            startAutoclicker();
            saveGame();
        } else {
            alert('Недостаточно очков!');
        }
    });

    // Вызов загрузки игры при загрузке страницы
    loadGame();

    // Инициализация текста кнопки автокликкера
    updateAutoclickerButtonText();
});
