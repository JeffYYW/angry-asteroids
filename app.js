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

let cX = 600;
let cY = 450;

// have acceleration but auto deceleration
// make left and right movement very slight

velX = 0;
velY = 0;
// maxSpeed = 10;

const controller = {
    left: false,
    right: false
}

function keyListener(event) {
    let keyState = false;
    controller.left = keyState;
    controller.right = keyState;

    if (event.type == "keydown") {
        keyState = true;
        console.log('keydown')

        if (event.keyCode === 37) {
            controller.left = keyState;
        }
        if (event.keyCode === 39) {
            controller.right = keyState;
        }
    } else {
        keyState = false;
        console.log('keyup')
    }
}

function moveCar() {
    if (controller.left) {
        velX -= 1;
    }
    if (controller.right) {
        velX += 1;
    }
}




// document.addEventListener("keydown", moveCar)

// function moveCar(event) {
//     // move left if cX is not too near the left side of the canvas
//     if (event.keyCode === 37 && cX > 10) {
//         cX -= 20;
//         // velX -= 1;
//     }
//     // move right if the left side of the car is not too near the right of the canvas
//     if (event.keyCode === 39 && cX < cvs.width - 150) {
//         cX += 20;
//         // velX += 1;
//     }
//     // move up if cY is not too near the top of the canvas 
//     if (event.keyCode === 38 && cY > 10) {
//         cY -= 20;
//         // velY -= 1;
//     }
//     // move down if the car's cY point + its height (bottom of car) is not too near the bottom of the canvas 
//     if (event.keyCode === 40 && cY < cvs.height - 255) {
//         cY += 20;
//         // velY += 1;
//     }
// }
    

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

// test randomizing cars
const carType = [car, carRed, car, carRed, car, carRed]
let q = 0

function draw() {

        ctx.drawImage(bg,0,0);
        document.addEventListener("keydown", keyListener)
        document.addEventListener("keyup", keyListener)
        moveCar()

        for (let i = 0; i < laneOne.length; i++) {
            // console.log(i)
            ctx.drawImage(carType[q], laneOne[i].x, laneOne[i].y)
            laneOne[i].y++;
            if (laneOne[i].y === canvas.height - 360) {
                laneOne.push({
                    x: 500,
                    // test randomizing cars. original was 0 - car.height
                    y: -500 - car.height
                })
            }
            // rectangle vs rectangle collision
            if (laneOne[i].x + 25 < cX + car.width &&
                laneOne[i].x + carRed.width - 25 > cX &&
                laneOne[i].y + 10 < cY + car.height &&
                laneOne[i].y + carRed.height -10 > cY) {
                alert('collision!')
            }
            // remove array item when it disappears off screen to save memory space, offset counter by 1 to compensate
            if (laneOne[i].y === canvas.height) {
                laneOne.shift()
                i--
                // test randomizing cars
                q += 1
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

        cX += velX;
        cY += velY;
        velX *= 0.9;
        velY *= 0.9;
        
        ctx.drawImage(car, cX, cY)

    requestAnimationFrame(draw);

}

// wait for images to load before drawing
car.onload = () => {
    draw();
}


// put key listeners in object to be able to press more than one key at a time
// play with velocity
// rotate car when turning
// randomize cars
// add more lanes
// add timer (get to work on time)
// touch screen functionality


// https://www.youtube.com/watch?v=1oNsZCqQDeE
// https://www.youtube.com/watch?v=L07i4g-zhDA
// https://stackoverflow.com/questions/14178769/smooth-keydown-animation-on-canvas-in-javascript
// https://stackoverflow.com/questions/38420047/how-to-add-touch-screen-functionalitytap-left-right-side-of-screen-in-html5-mo
