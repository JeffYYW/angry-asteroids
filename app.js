const cvs = document.getElementById('canvas');
cvs.width = '1000';
cvs.height = window.innerHeight;

const ctx = cvs.getContext("2d");


const car = new Image();
const carRed = new Image();
const bg = new Image();

car.src = "./assets/car-small.png";
carRed.src = "./assets/car-red-small.png";
bg.src = "./assets/roadBackground.jpg";

// carRed.onload = () => {
//     ctx.drawImage(carRed, 400, 100)
// }

// car.onload = () => {
//     ctx.drawImage(car, cX, cY)
// }

let cX = 600;
let cY = 450;

// left
document.addEventListener("keydown", event => {
    if (event.keyCode === 37 && cX > 10) {
        cX -= 20;
    }
});

// right
document.addEventListener("keydown", event => {
    if (event.keyCode === 39 && cX < cvs.width - 150) {
        cX += 20;
    }
});

// up
document.addEventListener("keydown", event => {
    if (event.keyCode === 38 && cY > 10) {
        cY -= 20;
    }
});

// down
document.addEventListener("keydown", event => {
    if (event.keyCode === 40 && cY < cvs.height - 255) {
        cY += 20;
    }
});



const laneOne = [];

laneOne[0] = {
    x : 500,
    y : 0
}

const laneTwo = [];

laneTwo[0] = {
    x: 250,
    y: 50
}

function draw() {

        ctx.drawImage(bg,0,0);

        for (let i = 0; i < laneOne.length; i++) {
            // console.log(i)
            ctx.drawImage(carRed, laneOne[i].x, laneOne[i].y)
            laneOne[i].y++;
            if (laneOne[i].y === canvas.height - 360) {
                laneOne.push({
                    x: 500,
                    y: 0 - car.height
                })
            }
            if (laneOne[i].y === canvas.height) {
                laneOne.shift()
                i--
            }
            // rectangle vs rectangle collision
            if (laneOne[i].x < cX + car.width &&
                laneOne[i].x + carRed.width > cX &&
                laneOne[i].y < cY + car.height &&
                laneOne[i].y + carRed.height > cY) {
                alert('collision!')
            }
        }

        for (let j = 0; j < laneTwo.length; j++) {
            console.log(j)
            ctx.drawImage(carRed, laneTwo[j].x, laneTwo[j].y)
            laneTwo[j].y = laneTwo[j].y + 2;
            if (laneTwo[j].y === canvas.height - 300) {
                laneTwo.push({
                    x: 250,
                    y: 0 - car.height
                })
            }

            if (laneTwo[j].y === canvas.height) {
                laneTwo.shift()
                j--
            }
        }

        ctx.drawImage(car, cX, cY)

    requestAnimationFrame(draw);

}

car.onload = () => {
    draw();
}


// https://www.youtube.com/watch?v=1oNsZCqQDeE
// https://www.youtube.com/watch?v=L07i4g-zhDA
