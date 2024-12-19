// Игровая логика
class Paddle {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.score = 0;
    }

    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Ball {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocityX = 5;
        this.velocityY = 5;
        this.speed = 7;
    }

    draw(context) {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.closePath();
        context.fill();
    }

    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
    }
}

const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

const ball = new Ball(canvas.width / 2, canvas.height / 2, 10, "WHITE");
const user = new Paddle(0, (canvas.height - 100) / 2, 10, 100, "WHITE");
const com = new Paddle(canvas.width - 10, (canvas.height - 100) / 2, 10, 100, "WHITE");

const net = {
    x: (canvas.width - 2) / 2,
    y: 0,
    height: 10,
    width: 2,
    color: "WHITE"
};

function drawRect(x, y, w, h, color) {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

function drawText(text, x, y, color) {
    context.fillStyle = color;
    context.font = "45px fantasy";
    context.fillText(text, x, y);
}

function drawNet() {
    for (let i = 0; i <= canvas.height; i += 15) {
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}

function render() {
    drawRect(0, 0, canvas.width, canvas.height, "BLACK");
    drawNet();
    drawText(user.score, canvas.width / 4, canvas.height / 5, "WHITE");
    drawText(com.score, 3 * canvas.width / 4, canvas.height / 5, "WHITE");
    user.draw(context);
    com.draw(context);
    ball.draw(context);
}

function update() {
    ball.update();
    const comLevel = 0.1;
    com.y += (ball.y - (com.y + com.height / 2)) * comLevel;

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.velocityY = -ball.velocityY;
    }

    const player = (ball.x < canvas.width / 2) ? user : com;

    if (collision(ball, player)) {
        const collidePoint = ball.y - (player.y + player.height / 2);
        const angleRad = (collidePoint / (player.height / 2)) * (Math.PI / 4);
        const direction = (ball.x < canvas.width / 2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
        ball.speed += 0.1;
    }

    if (ball.x - ball.radius < 0) {
        com.score++;
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        user.score++;
        resetBall();
    }
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speed = 7;
    ball.velocityX = -ball.velocityX;
}

function collision(b, p) {
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    return b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom;
}

canvas.addEventListener('mousemove', (evt) => {
    const rect = canvas.getBoundingClientRect();
    user.y = evt.clientY - rect.top - user.height / 2;
});

function game() {
    update();
    render();
    requestAnimationFrame(game);
}

game();

// Смена фотографии
document.getElementById('changes-photo-btn').addEventListener('click', () => {
    const gameBlock = document.getElementById('game-block');
    const message = document.getElementById('message');

    // Удаляем предыдущее фото, если оно есть
    const existingPhoto = document.getElementById('photo');
    if (existingPhoto) {
        gameBlock.removeChild(existingPhoto);
    }

    // Генерируем случайное число для выбора фото
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    const newPhoto = document.createElement('img');
    newPhoto.id = 'photo';
    newPhoto.src = `../photos/photo${randomNumber}.jpg`;

    // Обработчик ошибки загрузки фото
    newPhoto.onerror = () => {
        console.error('Фото не загружено');
        message.style.display = 'block';
    };

    // Добавляем фото в блок
    gameBlock.appendChild(newPhoto);
    message.style.display = 'none';
});




















// Движение блока
let speed = 1;

    // Установка скорости
    function setSpeed(newSpeed) {
        speed = newSpeed;
        console.log(`Скорость установлена: ${speed}`);
    }

    // Обработчик для кнопок скорости
    document.querySelectorAll('.move_speed_btn').forEach(button => {
        button.addEventListener('click', () => {
            const newSpeed = parseInt(button.getAttribute('data-speed'), 10);
            setSpeed(newSpeed);
        });
    });

    // Получение элементов блока
    const parentBlock = document.querySelector('.parent_block');
    const childBlock = document.querySelector('.move_child_block');

    // Начальные позиции
    let positionX = 0;
    let positionY = 0;

    // Максимальные размеры для перемещения
    const maxWidth = parentBlock.offsetWidth - childBlock.offsetWidth;
    const maxHeight = parentBlock.offsetHeight - childBlock.offsetHeight;

    // Начальное направление
    let direction = 'right';

    // Функция для изменения направления
    function changeDirection(newDirection) {
        direction = newDirection;
        childBlock.classList.remove('rotate-right', 'rotate-down', 'rotate-left', 'rotate-up');
        childBlock.classList.add(`rotate-${direction}`);
    }

    // Функция для перемещения блока
    function moveBlock() {
        if (direction === 'right') {
            if (positionX < maxWidth) {
                positionX += speed;
            } else {
                changeDirection('down');
            }
        } else if (direction === 'down') {
            if (positionY < maxHeight) {
                positionY += speed;
            } else {
                changeDirection('left');
            }
        } else if (direction === 'left') {
            if (positionX > 0) {
                positionX -= speed;
            } else {
                changeDirection('up');
            }
        } else if (direction === 'up') {
            if (positionY > 0) {
                positionY -= speed;
            } else {
                changeDirection('right');
            }
        }

        // Обновление позиции блока
        childBlock.style.top = `${positionY}px`;
        childBlock.style.left = `${positionX}px`;

        // Запуск анимации
        requestAnimationFrame(moveBlock);
    }

    // Инициализация начального направления
    changeDirection('right');

    // Запуск движения
    moveBlock();

    // Массив с путями к изображениям для GIF и фона
    const photoMap = {
        1: { gif: '../photos/sonic-corriendo.gif', background: '../photos/sonic_bcg.jpeg' },
        2: { gif: '../photos/pacman.gif', background: '../photos/bcg_pacman.jpg' },
        3: { gif: '../photos/luigi-run.gif', background: '../photos/luigi_bcg.jpeg' },
        4: { gif: '../photos/road_car-two.gif', background: '../photos/road_car_bcg.jpeg' },
        5: { gif: '../photos/contra.gif', background: '../photos/contra_bcg.jpg' },
        6: { gif: '../photos/galaxian-two.gif', background: '../photos/galaxian_bcg.jpg' }
    };

    // Функция для смены GIF-изображения и фона
    function changePhoto(photoNumber) {
        const photoData = photoMap[photoNumber];
        if (photoData) {
            // Меняем GIF
            childBlock.style.backgroundImage = `url(${photoData.gif})`;
            childBlock.style.backgroundSize = 'cover';

            // Меняем фон блока parent_block
            parentBlock.style.backgroundImage = `url(${photoData.background})`;
            parentBlock.style.backgroundSize = 'cover';

            console.log(`GIF ${photoNumber} и фон загружены`);
        } else {
            console.log(`GIF с номером ${photoNumber} не найден`);
        }
    }

    // Обработчик для кнопок смены GIF
    document.querySelectorAll('.move_photo_btn').forEach(button => {
        button.addEventListener('click', () => {
            const photoNumber = button.getAttribute('data-photo');
            changePhoto(photoNumber);
        });
    });

parentBlock.style.backgroundImage = `url(${photoData.background})`;
parentBlock.style.backgroundSize = 'cover';
