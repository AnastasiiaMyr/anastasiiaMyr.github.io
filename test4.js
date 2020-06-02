"use strict"
const score = document.getElementById("play_score")
const c = document.getElementById("ctx")
const ctx = c.getContext('2d');
const scores = document.getElementById("play_score");
let time = 30;
c.width = 570;
c.height = 400;
let s = 0; /// Направление;
const dir = document.querySelectorAll(".direction");
dir.forEach(element => {
    element.addEventListener("click", (event) => {
        switch (event.target.value) {
            case "◀":
                if (inRad(0) === s) {
                    scores.innerHTML = 20 + +score.innerHTML
                    angleFish();
                }
                break;
            case "▲":
                if (inRad(90) === s) {
                    scores.innerHTML = 20 + +score.innerHTML
                    angleFish();
                }
                break;
            case "▼":
                if (inRad(270) === s) {
                    scores.innerHTML = 20 + +score.innerHTML
                    angleFish();
                }
                break;
            case "►":
                if (inRad(180) === s) {
                    scores.innerHTML = 20 + +score.innerHTML
                    angleFish();
                }
                break;
        }

    })
});

function inRad(num) {
    return num * Math.PI / 180;
}
let direction = [inRad(0), inRad(90), inRad(180), inRad(270)]
    //90 Up
    //180 Right
    //270 Down
    //0 left

let fish = [{
        x: 150,
        y: 50,
        angle: 0,
        color: 0,
    }, {
        x: 250,
        y: 50,
        angle: 0,
        color: 0,
    }, {
        x: 350,
        y: 50,
        angle: 0,
        color: 0,
    }, { ////line 1
        x: 150,
        y: 200,
        angle: 0,
        color: 0,
    }, {
        x: 250,
        y: 200,
        angle: 0,
        color: 0,
    }, {
        x: 350,
        y: 200,
        angle: 0,
        color: 0,
    }, { ////line 2
        x: 150,
        y: 350,
        angle: 0,
        color: 0,
    }, {
        x: 250,
        y: 350,
        angle: 0,
        color: 0,
    }, {
        x: 350,
        y: 350,
        angle: 0,
        color: 0,
    } ////line 3
]

function randomColor() {
    let color = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")";
    return color;
}

function random(max) {
    return Math.floor(Math.random() * max);
}

function angleFish() {
    let n = random(5);
    let color = randomColor();
    let angles = direction[random(4)];
    for (let i = 0; i < 9; i++) {
        fish[i].color = color;
        if (i === n) {
            fish[i].angle = direction[random(4)];
            s = fish[i].angle;
        } else {
            fish[i].angle = angles;
        }
    }
    createFish(fish);
}


function createFish(arr) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, c.width, c.height);
    for (let i = 0; i < 9; i++) {
        let s = 0,
            d = 0;
        if (arr[i].angle === direction[1]) {
            s = -40; //Oy
            d = -30; //Ox
        } else if (arr[i].angle === direction[2]) {
            s = -65; //Ox
            d = 0; //Oy
        } else if (arr[i].angle === direction[3]) {
            s = -35; //Oy
            d = 25; //Ox
        }

        ctx.translate(arr[i].x, arr[i].y);
        ctx.rotate(arr[i].angle);
        ctx.beginPath();
        ctx.moveTo(s, d);
        ctx.lineTo(s - 50 * -1, d - (-1 * 50));
        ctx.lineTo(s - 50 * -1, d - (-1 * 5));
        ctx.lineTo(s - 70 * -1, d - (-1 * 20));
        ctx.lineTo(s - 70 * -1, d + (-1 * 20));
        ctx.lineTo(s - 50 * -1, d + (-1 * 5));
        ctx.lineTo(s - 50 * -1, d + (-1 * 50));
        ctx.closePath();
        ctx.strokeStyle = "silver";
        ctx.fillStyle = fish[i].color;
        ctx.fill();
        ctx.stroke();
        ctx.rotate(-arr[i].angle);

        ctx.translate(-arr[i].x, -arr[i].y);
    }

}

function сountdown() {
    let time_set = document.querySelector("#time");
    if (time === 0) {
        alert("Час вийшов. Ваш результат = " + scores.innerHTML);
        clearInterval(s);
    }
    if (time < 10) {
        time_set.innerHTML = "00:0" + time--;
    } else {
        time_set.innerHTML = "00:" + time--;
    }
}
let k = setInterval(сountdown, 1000)
angleFish();