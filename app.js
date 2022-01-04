const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

const ground = new Image();
ground.src = "img/ground.png" //игровое поле

const foodImg = new Image();
foodImg.src = "img/food.png"  //иконка еды

let box = 32 // размер 1 поля

let score = 0; // кол-во очков

let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,  //рандомный спаун еды на поле
    y: Math.floor((Math.random() * 15 + 3)) * box
}

let snake = [];
snake[0] = {
    x: 9 * box,      //создаем змейку и ставим ее в середину игрового поля
    y: 10 * box
}

document.addEventListener("keydown", direction)  //если кнопка была нажата, то просходит direction

let dir

function direction() {
    if(event.keyCode == 65 && dir != "right")  //если жмем A
        dir = "left"
    else if(event.keyCode == 87 && dir != "down") //если жмем W
        dir = "up"
    else if(event.keyCode == 68 && dir != "left") //если жмем D
        dir = "right"
    else if(event.keyCode == 83 && dir != "up") //если жмем S
        dir = "down"  
}

function eatTail(head, arr) {
    for(let i = 0; i < arr.length; i++) {
        if(head.x == arr[i].x && head.y == arr[i].y)  //проверяем съели ли хвост
        clearInterval(game)
    }
}

function drawGround() {
    ctx.drawImage(ground, 0, 0)  //отрисовка игрового поля

    ctx.drawImage(foodImg, food.x, food.y) //отрисовка еды

    for(let i = 0; i < snake.length; i++) {      //отрисовка змеи
        ctx.fillStyle = i == 0 ? "green": "red"
        ctx.fillRect(snake[i].x, snake[i].y, box, box)
    }

    ctx.fillStyle = "white";              //отрисовка очков
    ctx.font = "50px Arial"
    ctx.fillText(score, box*3, box*1.65)

    let snakeX = snake[0].x   //координаты змеи во время игры
    let snakeY = snake[0].y

    if(snakeX == food.x && snakeY == food.y) {  // если змейка съела еду, то не удаляем последний элемент массива(кончик хвоста) и спавним новую еду
        score++;
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box
        }
    } else {
      snake.pop() //если ничего не съели, удаляем последний кончик хвоста(иначе змея растет бесконечно с начала игры)
    }

    if(snakeX < box || snakeX > box * 17 || snakeY < box * 3 || snakeY > box * 17) //выход за пределы игрового поля
        clearInterval(game)

    if(dir == "left") snakeX = snakeX - box   //передвижение
    if(dir == "right") snakeX = snakeX + box
    if(dir == "up") snakeY = snakeY - box
    if(dir == "down") snakeY = snakeY + box


    let newHead = {      //двигаем голову
        x: snakeX,
        y: snakeY
    }

    eatTail(newHead, snake)

    snake.unshift(newHead) //добовляем передвинутую голову в начало массива
}

let game = setInterval(drawGround, 100)  //частота обновления


