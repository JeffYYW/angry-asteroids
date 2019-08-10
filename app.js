const cvs = document.getElementById('canvas');
cvs.width = '1000';
cvs.height = window.innerHeight;

const ctx = cvs.getContext("2d");


const car = new Image();
const asteroidBig = new Image();
const asteroidOne = new Image();
const asteroidTwo = new Image();
const asteroidThree = new Image();
const asteroidFour = new Image();
const asteroidFive = new Image();
const asteroidSix = new Image();
const bg = new Image();


car.src = "./assets/ship.png";
asteroidBig.src = "./assets/asteroidBig.png";
asteroidOne.src = "./assets/asteroidOne.png";
asteroidTwo.src = "./assets/asteroidTwo.png";
asteroidThree.src = "./assets/asteroidThree.png";
asteroidFour.src = "./assets/asteroidFour.png";
asteroidFive.src = "./assets/asteroidFive.png"
asteroidSix.src = "./assets/asteroidSix.png"
bg.src = "./assets/starfield.jpg";

let cX = 600;
let cY = canvas.height - 190;

// have acceleration but auto deceleration
// make left and right movement very slight

let velX = 0;
let velY = 0;
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

function randomNumber(min, max) {
    let num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}

function setBounds() {
    if (cX <= 10) {
        cX = 10
        velX = 0;
    }
    if (cX + car.width >= cvs.width) {
        cX = cvs.width - car.width;
        velX = 0;
    }
}

// randomizing cars
const carType = [asteroidBig, asteroidOne, asteroidTwo, asteroidThree, asteroidFour, asteroidFive, asteroidSix]
let randomCar = 0

const lanes = [
    {
        carType: carType[randomNumber(0, carType.length)],
        laneX: randomNumber(120, 310),
        laneY: -randomNumber(50, 200),
        velocityY: 0
    },
    {
        carType: carType[randomNumber(0, carType.length)],
        laneX: randomNumber(400, 560),
        laneY: -randomNumber(50, 200),
        velocityY: 0
    },
    {
        carType: carType[randomNumber(0, carType.length)],
        laneX: randomNumber(650, 790),
        laneY: -randomNumber(50, 200),
        velocityY: 0
    },
    {
        carType: carType[randomNumber(0, carType.length)],
        laneX: randomNumber(120, 310),
        laneY: -500,
        velocityY: 0
    },
    {
        carType: carType[randomNumber(0, carType.length)],
        laneX: randomNumber(400, 560),
        laneY: -550,
        velocityY: 0
    },
    {
        carType: carType[randomNumber(0, carType.length)],
        laneX: randomNumber(650, 790),
        laneY: -450,
        velocityY: 0
    }
]

let counter = 0

// multiples of 13 or 14 will send rogue asteroids

const laneTraffic = (lane, Xmin, Xmax, velMin, velMax) => {
    const randomVelocity = randomNumber(velMin, velMax)
    lanes[lane].laneY += lanes[lane].velocityY;
    lanes[lane].velocityY++;
    lanes[lane].velocityY *= randomVelocity;

    if (lanes[lane].laneX + 25 < cX + car.width &&
        lanes[lane].laneX + lanes[lane].carType.width - 25 > cX &&
        lanes[lane].laneY + 10 < cY + car.height &&
        lanes[lane].laneY + lanes[lane].carType.height - 10 > cY) {
        alert('collision!')
    }

    // const randomHeight = randomNumber(100, 200)

    if (lanes[lane].laneY > canvas.height) {
        counter += 1;
        lanes[lane].laneX = randomNumber(Xmin, Xmax);
        lanes[lane].laneY = -lanes[lane].carType.height - 100

        randomCar = randomNumber(0, carType.length)
        lanes[lane].carType = carType[randomCar]
    }

    ctx.drawImage(lanes[lane].carType, lanes[lane].laneX, lanes[lane].laneY)
}

// background initial values
let bgX = 0
let bgY = 0
let bgY2 = -1250
let bgVelY = 0

// car.width = 94
// canvas.width = 1000

// asteroid widths 80 to 100

let minVel = 0.85
let maxVel = 0.9

function draw() {
        
        // have two bg images scrolling one after the other
        console.log(bgY)
        ctx.drawImage(bg, bgX, bgY);
        ctx.drawImage(bg, bgX, bgY2);
        if (bgY > canvas.height) {
            bgY = -1250;
        }
        if (bgY2 > canvas.height) {
            bgY2 = -1250;
        }
        bgY += bgVelY
        bgY2 += bgVelY
        bgVelY++
        bgVelY *= 0.7;

        // -----------------------------------------------------------------
        setBounds()

        document.addEventListener("keydown", keyListener)
        document.addEventListener("keyup", keyListener)
        moveCar()

        // -------------------------------------------------

        laneTraffic(0, 120, 310, minVel, maxVel);
        laneTraffic(1, 400, 560, minVel, maxVel);
        laneTraffic(2, 650, 790, minVel, maxVel);
        laneTraffic(3, 120, 300, minVel, maxVel);
        laneTraffic(4, 400, 550, minVel, maxVel);
        laneTraffic(5, 650, 790, minVel, maxVel);

        
        // -----------------------------------------------------
        
        cX += velX;
        cY += velY;
        // add friction to make car slow down realistically
        velX *= 0.9;
        velY *= 0.9;
        
        ctx.drawImage(car, cX, cY)

    requestAnimationFrame(draw);
}

// wait for images to load before drawing
// switch to promise
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

// http://atomicrobotdesign.com/blog/htmlcss/build-a-vertical-scrolling-shooter-game-with-html5-canvas-part-6/
    // scrolling bg
// https://www.youtube.com/watch?v=8uIt9a2XBrw&t=368s
// https://www.youtube.com/watch?v=1oNsZCqQDeE
// https://www.youtube.com/watch?v=L07i4g-zhDA
// https://stackoverflow.com/questions/14178769/smooth-keydown-animation-on-canvas-in-javascript
// https://stackoverflow.com/questions/38420047/how-to-add-touch-screen-functionalitytap-left-right-side-of-screen-in-html5-mo


// ********old code***********

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

// must use length in the loop since it iterates to a number too fast. 
        // for (let j = 0; j < laneTwo.length; j++) {
        //     console.log(j)
        //     ctx.drawImage(carRed, laneTwo[j].x, laneTwo[j].y)
        //     laneTwo[j].y = laneTwo[j].y + 2;
        //     if (laneTwo[j].y === canvas.height - 300) {
        //         laneTwo.push({
        //             x: randomNumber(300, 350),
        //             y: -750
        //         })
        //     }

        //     if (laneTwo[j].y > canvas.height) {
        //         laneTwo.shift()
        //         j--
        //     }
        // }

        // const randoVel = randomNumber(0.7, 0.9)
        // redCarY += velRedY
        // velRedY++
        // velRedY *= randoVel;

        // const rando = randomNumber(100, 150)

        // if (redCarY > canvas.height) {
        //     redCarY = -carRed.height - rando
        // }

        // if (redCarX + 25 < cX + car.width &&
        //     redCarX + carRed.width - 25 > cX &&
        //     redCarY + 10 < cY + car.height &&
        //     redCarY + carRed.height - 10 > cY) {
        //     alert('collision!')
        // }

        // ctx.drawImage(carRed, redCarX, redCarY)

        // for (let i = 0; i < laneOne.length; i++) {
        //     // console.log(i)
        //     ctx.drawImage(carType[randomCar], laneOne[i].x, laneOne[i].y)
        //     laneOne[i].y++;
        //     if (laneOne[i].y === canvas.height - 360) {
        //         laneOne.push({
        //             x: 500,
        //             // test randomizing cars. original was 0 - car.height
        //             y: -500 - car.height
        //         })
        //     }
        //     // rectangle vs rectangle collision
        //     if (laneOne[i].x + 25 < cX + car.width &&
        //         laneOne[i].x + carRed.width - 25 > cX &&
        //         laneOne[i].y + 10 < cY + car.height &&
        //         laneOne[i].y + carRed.height -10 > cY) {
        //         alert('collision!')
        //     }
        //     // remove array item when it disappears off screen to save memory space, offset counter by 1 to compensate
        //     if (laneOne[i].y === canvas.height) {
        //         laneOne.shift()
        //         i--
        //         // test randomizing cars

        //         randomCar = randomNumber(0, 4)
        //     }
        // }