"use strict"

const body = document.getElementsByClassName("body-section")
const number = document.getElementsByClassName("head_number")
const score = document.getElementById("play_score");
const animation = ["size-rotate__elem", "rotate__elem", "size__elem"];
let answer;
let strong = 4;
let level = 1;
let time = 30;

function equal(event) {
    let num = Number(score.innerHTML);
    let equal = Number(event.target.value);
    if (equal === answer) {
        let elem = document.querySelectorAll(`.body__elem-l${level}`);
        for (let i = 0; i < elem.length; i++) {
            elem[i].remove();
        }
        if (num === 120 || num === 300 || num === 500) {
            strong *= 2;
            level++;
            console.log(level)
        }

        score.innerHTML = 20 + +score.innerHTML
        game_drow(strong);
    }
}

function createElement_body(num) {
    let s = Math.floor(Math.random() * 4)
    let body__elem = document.createElement("input");
    body__elem.setAttribute("type", "button")
    body__elem.classList.add(`body__elem-l${level}`);
    if (!num) {
        body__elem.value = Math.floor(Math.random() * 50)
    } else {
        body__elem.value = num;
    }
    body__elem.style.animation = "1s linear 0s infinite alternate " + animation[s]
    body__elem.style.backgroundColor = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")";
    body__elem.addEventListener("click", equal)
    body[0].append(body__elem);
}

function game_drow(num) {
    answer = Math.floor(Math.random() * 50);
    let a = Math.floor(Math.random() * num);
    for (let i = 0; i < num; i++) {
        if (i === a) {
            createElement_body(answer)
        } else {
            createElement_body()
        }
    }
    number[0].innerHTML = answer;
}

function сountdown() {
    let time_set = document.querySelector("#time");
    if (time === 0) {
        if(score.innerHTML <1200 && score.innerHTML>800) {
            alert("Час вийшов. Твій результат = " + score.innerHTML + "  Молодець! В тебе чудовий результат");
            clearInterval(s);
        }
        else if(score.innerHTML <8000 && score.innerHTML>300) {
            alert("Час вийшов. Твій результат = " + score.innerHTML + "  Чудово! Твій результата середній.Зроби ще щвидше і краще.");
            clearInterval(s);
        } 
        else if(score.innerHTML <300 && score.innerHTML>0) {
            alert("Час вийшов. Твій результат = " + score.innerHTML+ "  Ти можеш набагато краще. Вперед!");
            clearInterval(s);
        }
     }
    if (time < 10) {
        time_set.innerHTML = "00:0" + time--;
    } else {
        time_set.innerHTML = "00:" + time--;
    }
}
let s = setInterval(сountdown, 1000)

game_drow(strong);