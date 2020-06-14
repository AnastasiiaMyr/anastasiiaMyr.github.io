"use strict"
/***************Контекст игрового поля***************/
const c = document.getElementById("ctx");
const ctx = c.getContext("2d");
const score = document.getElementById("play_score");


c.width = 470;
c.height = 400;

/********************************************Логика***********************************************/


const num = 12; /// Колличество блоков

/****Функция рандома****/
function random(max) {
    return Math.floor(Math.random() * max);
}
/****Функция колизии ****/
function collision(x1, y1, x2, y2) { /// Function check collision /// Проверка на столкновение
    let equalX,
        equalY;
    equalX = x2 - x1;
    equalY = y2 - y1;

    return [equalX, equalY]
}



let time = 30;


let levelOver = false;
let block = []; /******Хранение всех блоков в поле******/ /***Пока пустой, будет использоваться в цикле***/
let block_apply = []; /******Правильный блок******/
let mouseClick = false; /****** Флаг нажатия ******/
let activeElem = -1; /****** Активный елемент ******/

let colorAllBlock = [
    "#FF5733", "#CF310F", "#F2F20B",
    "#FFFF3E", "#80D14F", "#3A880B",
    "#13D689", "#6CDAAF", "#22C2B1", /****** Количество рандомных цветов для блоков ******/
    "#22C2B1", "#1186D3", "#E217EC",
    "#79307C", "#E81E6E", "#A32A5A",
    "#EEDD8B", "#C2AB3B", "#5F5003",
    "#00FF04",
]



/****Создание всех елементов****/
function blockCreate() {

    let x = 0,
        y = 50;
    let xBlock = c.width / 2 - 25,
        yBlock = 300; // Главные блоки

    for (let i = 0; i < num; i++) {
        let color = colorAllBlock[random(colorAllBlock.length)];
        if (i === num / 2) {
            x = 0;
            y = 150;
        } // условие на будущее, в случаи увеличения количества елементов;
        x += 60;
        block_apply[i] = {
            "color": color,
            "x": x,
            "y": y,
        }

        block[i] = {
            "color": color, /// 12 блоков с рандомным цветом.
            "x": xBlock,
            "y": yBlock,
        }


    }
    for (let i = 0; i < num; i++) {
        let n = random(block.length);
        let elem = block[n];
        block[n] = block[i];
        block[i] = elem;
    } // Этот цикл меняет местами все блоки в масиве. 
    activeElem = -1;
    draw();
}

/**** Отрисовка всех елементов ****/

function draw() {
    ctx.fillStyle = "#000000"; // Цвет заднего фона, можно задать в rgb
    ctx.fillRect(0, 0, c.width, c.height);

    for (let i = 0; i < num; i++) {
        ctx.lineWidth = 4; // border element
        ctx.strokeStyle = block_apply[i].color; //color element
        ctx.strokeRect(block_apply[i].x, block_apply[i].y, 50, 50);
    }

    for (let i = 0; i < num; i++) {
        ctx.fillStyle = block[i].color; //color element
        ctx.fillRect(block[i].x, block[i].y, 50, 50); // draw rectangle
    }
    if (activeElem !== -1) {
        ctx.fillStyle = block[activeElem].color;
        ctx.fillRect(block[activeElem].x, block[activeElem].y, 50, 50);
    }

}
/**** Проверка на правильность всех элементов ****/
function level() {
    levelOver = true;
    for (let i = 0; i < num; i++) {
        let j = 0
        while (j < num) {

            if (block[i].x === block_apply[j].x && block[i].y === block_apply[j].y && block[i].color === block_apply[j].color) { // if element position  equal position main block and element color equal block color
                j = num;
            } else {
                if (j === 11) {
                    levelOver = false;
                }
                j++;
            }

        }
    }
}

/**** Передвижение елемента ****/

function mov_elem(e) {
    if (mouseClick) {
        block[activeElem].x = e.layerX - 25;
        block[activeElem].y = e.layerY - 25;
        draw();
    }


}



c.addEventListener("mousemove", mov_elem); // Пользователь двигает мышкой по элементу


c.addEventListener("mousedown", (e) => { // Пользователь зажал кнопку

    for (let i = 0; i < num; i++) {
        const position = collision(block[i].x, block[i].y, e.layerX, e.layerY);
        if (position[0] <= 50 && position[0] > 0 && position[1] <= 50 && position[1] > 0) {
            mouseClick = true;
            activeElem = i;
        }
    }
})

c.addEventListener("mouseup", (e) => { // Пользователь отпустил кнопку
    if (activeElem !== -1) {
        for (let i = 0; i < num; i++) {
            const position = collision(block_apply[i].x, block_apply[i].y, e.layerX, e.layerY);
            if (position[0] <= 50 && position[0] > 0 && position[1] <= 50 && position[1] > 0 && block_apply[i].color === block[activeElem].color) {
                block[activeElem].x = block_apply[i].x;
                block[activeElem].y = block_apply[i].y;
            }
        }
        level(); // Запуск проверки корректности выполненого теста.
        if (levelOver) { // Тут можно поставить любое действие когда клиент сделал все правильно
            block = [];
            block_apply = [];
            blockCreate();
            draw();
            score.innerHTML = 25 + +score.innerHTML;
        }
        mouseClick = false;
        draw();
        activeElem = -1;
    }
})

function сountdown() {
    let time_set = document.querySelector("#time");
    if (time === 0) {
        if(score.innerHTML == 50) {
            alert("Час вийшов. Твій результат = " + score.innerHTML + "  Молодець! В тебе чудовий результат");
            clearInterval(k);
        }
        else if(score.innerHTML == 25) {
            alert("Час вийшов. Твій результат = " + score.innerHTML + "  Чудово! Твій результата середній. Зроби ще щвидше і краще.");
            clearInterval(k);
        } 
        else {
            alert("Час вийшов. Твій результат = " + score.innerHTML+ "  Ти можеш набагато краще. Вперед!");
            clearInterval(k);
        }
     }
    if (time < 10) {
        time_set.innerHTML = "00:0" + time--;
    } else {
        time_set.innerHTML = "00:" + time--;
    }
}
let k = setInterval(сountdown, 1000);

blockCreate();