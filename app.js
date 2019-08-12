const cvs = document.getElementById('canvas');
cvs.width = '1000';
cvs.height = window.innerHeight;

const ctx = cvs.getContext("2d");

const score = document.getElementById('scoreNumber')

const spaceShip = new Image();
const asteroidBig = new Image();
const asteroidOne = new Image();
const asteroidTwo = new Image();
const asteroidThree = new Image();
const asteroidFour = new Image();
const asteroidFive = new Image();
const asteroidSix = new Image();
const bg = new Image();


spaceShip.src = "./assets/ship.png";
asteroidBig.src = "./assets/asteroidBig.png";
asteroidOne.src = "./assets/asteroidOne.png";
asteroidTwo.src = "./assets/asteroidTwo.png";
asteroidThree.src = "./assets/asteroidThree.png";
asteroidFour.src = "./assets/asteroidFour.png";
asteroidFive.src = "./assets/asteroidFive.png"
asteroidSix.src = "./assets/asteroidSix.png"
bg.src = "./assets/starfield.jpg";

let cX = 600;
let cY = canvas.height - 200;

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

function moveShip() {
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

function randomDecimal(min, max) {
    let num = Math.random() * (max - min) + min;
    return num;
}

function setBounds() {
    if (cX <= 10) {
        cX = 10
        velX = 0;
    }
    if (cX + spaceShip.width >= cvs.width) {
        cX = cvs.width - spaceShip.width;
        velX = 0;
    }
}

// randomizing asteroids
const asteroidImages = [asteroidBig, asteroidOne, asteroidTwo, asteroidThree, asteroidFour, asteroidFive, asteroidSix]
let randomAsteroid = 0

const asteroids = [
    {
        asteroidType: asteroidImages[randomNumber(0, asteroidImages.length)],
        laneX: randomNumber(20, 900),
        laneY: -randomNumber(50, 200),
        velocityY: 0,
        randomVelocity: randomDecimal(0.75, 0.83)
    },
    {
        asteroidType: asteroidImages[randomNumber(0, asteroidImages.length)],
        laneX: randomNumber(20, 900),
        laneY: -randomNumber(50, 200),
        velocityY: 0,
        randomVelocity: randomDecimal(0.75, 0.83)
    },
    {
        asteroidType: asteroidImages[randomNumber(0, asteroidImages.length)],
        laneX: randomNumber(20, 900),
        laneY: -randomNumber(50, 200),
        velocityY: 0,
        randomVelocity: randomDecimal(0.75, 0.83)
    },
    {
        asteroidType: asteroidImages[randomNumber(0, asteroidImages.length)],
        laneX: randomNumber(20, 900),
        laneY: -500,
        velocityY: 0,
        randomVelocity: randomDecimal(0.75, 0.83)
    },
    {
        asteroidType: asteroidImages[randomNumber(0, asteroidImages.length)],
        laneX: randomNumber(20, 900),
        laneY: -550,
        velocityY: 0,
        randomVelocity: randomDecimal(0.75, 0.83)
    },
    {
        asteroidType: asteroidImages[randomNumber(0, asteroidImages.length)],
        laneX: randomNumber(20, 900),
        laneY: -450,
        velocityY: 0,
        randomVelocity: randomDecimal(0.75, 0.83)
    }
]

let counter = 0

// multiples of 13 or 14 will send rogue asteroids

const renderAsteroid = (asteroid, Xmin, Xmax) => {
    // const randomVelocity = randomNumber(velMin, velMax)
    asteroids[asteroid].laneY += asteroids[asteroid].velocityY;
    asteroids[asteroid].velocityY++;
    asteroids[asteroid].velocityY *= asteroids[asteroid].randomVelocity;

    if (asteroids[asteroid].laneX + 25 < cX + spaceShip.width &&
        asteroids[asteroid].laneX + asteroids[asteroid].asteroidType.width - 25 > cX &&
        asteroids[asteroid].laneY + 15 < cY + spaceShip.height &&
        asteroids[asteroid].laneY + asteroids[asteroid].asteroidType.height - 15 > cY) {
        alert('collision!')
    }

    // const randomHeight = randomNumber(100, 200)

    if (asteroids[asteroid].laneY > canvas.height) {
        counter += 1;
        score.innerHTML = counter;
        asteroids[asteroid].laneX = randomNumber(Xmin, Xmax);
        asteroids[asteroid].laneY = -asteroids[asteroid].asteroidType.height - 100

        randomAsteroid = randomNumber(0, asteroidImages.length)
        asteroids[asteroid].asteroidType = asteroidImages[randomAsteroid]
        asteroids[asteroid].randomVelocity = randomDecimal(0.75, 0.83)
    }

    ctx.drawImage(asteroids[asteroid].asteroidType, asteroids[asteroid].laneX, asteroids[asteroid].laneY)
}

// const rogueObjects = [
//     {
//         x: 50,
//         y: -100
//     }
// ]

// const rogueAsteroid = function() {
//     for (let i = 0; i < rogueObjects.length; i++) {
//         // console.log(i)
//         ctx.drawImage(asteroids[0], rogueObjects[i].x, rogueObjects[i].y)
//         rogueObjects[i].y = rogueObjects[i].y + 7;
//         rogueObjects[i].x = rogueObjects[i].x + 1;
//         if (rogueObjects[i].y === canvas.height) {
//             rogueObjects.push({
//                 x: randomNumber(300, 350),
//                 y: -100
//             })
//         }

//         if (rogueObjects[i] + 25 < cX + car.width &&
//             rogueObjects[i] + rogueObjects[i].width - 25 > cX &&
//             rogueObjects[i] + 10 < cY + car.height &&
//             rogueObjects[i] + rogueObjects[i].height - 10 > cY) {
//             alert('collision!')
//         }

//         if (rogueObjects[i].y > canvas.height) {
//             rogueObjects.shift()
//             i--
//         }
//     }
// }

// background initial values
let bgX = 0
let bgY = 0
let bgY2 = -1250
let bgVelY = 0

// car.width = 94
// canvas.width = 1000

// asteroid widths 80 to 100

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
        bgVelY *= 0.73;

        // -----------------------------------------------------------------
        setBounds()

        document.addEventListener("keydown", keyListener)
        document.addEventListener("keyup", keyListener)
        moveShip()

        // -------------------------------------------------

        // for loop lanes array

        for (i = 0; i < asteroids.length; i++) {
            renderAsteroid(i, 20, 900)
        }

        // laneTraffic(0, 20, 900);
        // laneTraffic(1, 20, 900);
        // laneTraffic(2, 20, 900);
        // laneTraffic(3, 20, 900);
        // laneTraffic(4, 20, 900);
        // laneTraffic(5, 20, 900);
  
        

        // cant use the same asteroid or it will conflict with the one already on screen
        if (counter % 20 === 0) {
            // laneTraffic(0, 20, 900)
        }

        
        // -----------------------------------------------------
        
        cX += velX;
        cY += velY;
        // add friction to make car slow down realistically
        velX *= 0.9;
        velY *= 0.9;
        
        ctx.drawImage(spaceShip, cX, cY)

    requestAnimationFrame(draw);
}

// wait for images to load before drawing
// switch to promise
spaceShip.onload = () => {
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

        // original lanes

    // laneTraffic(0, 120, 310);
    // laneTraffic(1, 400, 560);
    // laneTraffic(2, 650, 790);
    // laneTraffic(3, 120, 300);
    // laneTraffic(4, 400, 550);
    // laneTraffic(5, 650, 790);