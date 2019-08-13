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


spaceShip.src = "./assets/rocketShip.png";
asteroidBig.src = "./assets/asteroidBig.png";
asteroidOne.src = "./assets/asteroidOne.png";
asteroidTwo.src = "./assets/asteroidTwo.png";
asteroidThree.src = "./assets/asteroidThree.png";
asteroidFour.src = "./assets/asteroidFour.png";
asteroidFive.src = "./assets/asteroidFive.png"
asteroidSix.src = "./assets/asteroidSix.png"
bg.src = "./assets/starfield.jpg";


// put in object

const ship = {
    shipX: 450,
    shipY: canvas.height - 200,
    velX: 0,
    velY: 0
}


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
        ship.velX -= 1;
    }
    if (controller.right) {
        ship.velX += 1;
    }
}

// generate random number between min and max values
const randomNumber = (min, max) => {
    let num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}

// for generating a random number lower than 1 and between min and max values
const randomDecimal = (min, max) => {
    let num = Math.random() * (max - min) + min;
    return num;
}

// ship won't go past the screens on the left and right sides
const setBounds = () => {
    if (ship.shipX <= 10) {
        ship.shipX = 10
        ship.velX = 0;
    }
    if (ship.shipX + spaceShip.width >= cvs.width) {
        ship.shipX = cvs.width - spaceShip.width;
        ship.velX = 0;
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

// collision detection
const collisionDetection = (array, index) => {
    if (array[index].laneX + 25 < ship.shipX + spaceShip.width &&
        array[index].laneX + array[index].asteroidType.width - 25 > ship.shipX &&
        array[index].laneY + 25 < ship.shipY + spaceShip.height &&
        array[index].laneY + array[index].asteroidType.height - 15 > ship.shipY) {
        alert('collision!')
    }
}

// set asteroid's Y velocity and position
// velocity is increased by 1 with every iteration, but by multiplying it with a number less than 1, it will get closer and closer to 0, thus slowing it down gradually
// cant just change the Y position since it is redrawn everytime and the program will stutter. Using velocity allows smoother animation and makes it easier to randomize the asteroid velocity
const setVelocityY = (array, index) => {
    array[index].laneY += array[index].velocityY;
    array[index].velocityY++;
    array[index].velocityY *= array[index].randomVelocity;
}

// reset asteroid's position once it has passed the height of the canvas
const resetAsteroid = (array, index, Xmin, Xmax, velMin, velMax) => {
    if (array[index].laneY > canvas.height) {
        // increase score counter by 1
        counter += 1;
        score.innerHTML = counter;
        // asteroid's starting X position set to a random number
        // Y position reset and hard coded to have less overlap with other asteroids
        array[index].laneX = randomNumber(Xmin, Xmax);
        array[index].laneY = -array[index].asteroidType.height - 100
        // randomize asteroid type and velocity
        randomAsteroid = randomNumber(0, asteroidImages.length)
        array[index].asteroidType = asteroidImages[randomAsteroid]
        array[index].randomVelocity = randomDecimal(velMin, velMax)
    }
}

const renderAsteroid = (asteroid, Xmin, Xmax) => {

    setVelocityY(asteroids, asteroid);
    collisionDetection(asteroids, asteroid);
    resetAsteroid(asteroids, asteroid, Xmin, Xmax, 0.75, 0.83);
    ctx.drawImage(asteroids[asteroid].asteroidType, asteroids[asteroid].laneX, asteroids[asteroid].laneY);
}

const rogueObjects = [
    {
        asteroidType: asteroidImages[randomNumber(0, asteroidImages.length)],
        laneX: randomNumber(-50, 650),
        laneY: -450,
        velocityY: 0,
        randomVelocity: randomDecimal(0.78, 0.86)
    },
    {
        asteroidType: asteroidImages[randomNumber(0, asteroidImages.length)],
        laneX: randomNumber(650, 1050),
        laneY: -450,
        velocityY: 0,
        randomVelocity: randomDecimal(0.78, 0.86)
    }
]

const rogueAsteroidLeft = (asteroid, Xmin, Xmax) => {

    setVelocityY(rogueObjects, asteroid);
    rogueObjects[asteroid].laneX += 3;
    collisionDetection(rogueObjects, asteroid);
    resetAsteroid(rogueObjects, asteroid, Xmin, Xmax, 0.78, 0.9);
    ctx.drawImage(rogueObjects[asteroid].asteroidType, rogueObjects[asteroid].laneX, rogueObjects[asteroid].laneY);
}

const rogueAsteroidRight = (asteroid, Xmin, Xmax) => {

    setVelocityY(rogueObjects, asteroid);
    rogueObjects[asteroid].laneX -= 3;
    collisionDetection(rogueObjects, asteroid);
    resetAsteroid(rogueObjects, asteroid, Xmin, Xmax, 0.78, 0.9);
    ctx.drawImage(rogueObjects[asteroid].asteroidType, rogueObjects[asteroid].laneX, rogueObjects[asteroid].laneY);
}

// background initial values

const backgroundValues = {
    bgX: 0,
    bgY: 0,
    bgY2: -1250,
    bgVelY: 0
}

function draw() {
        
    // have two bg images scrolling one after the other
    console.log(backgroundValues.bgY)
    ctx.drawImage(bg, backgroundValues.bgX, backgroundValues.bgY);
    ctx.drawImage(bg, backgroundValues.bgX, backgroundValues.bgY2);
        if (backgroundValues.bgY > canvas.height) {
            backgroundValues.bgY = -1250;
        }
        if (backgroundValues.bgY2 > canvas.height) {
            backgroundValues.bgY2 = -1250;
        }
        backgroundValues.bgY += backgroundValues.bgVelY
        backgroundValues.bgY2 += backgroundValues.bgVelY
        backgroundValues.bgVelY++
        backgroundValues.bgVelY *= 0.73;

        // -----------------------------------------------------------------
        // ship won't go past the screens on the left and right sides
        setBounds()

        document.addEventListener("keydown", keyListener)
        document.addEventListener("keyup", keyListener)
        moveShip()

        // -------------------------------------------------

        // loop through asteroids array and render them
        for (i = 0; i < asteroids.length; i++) {
            renderAsteroid(i, 20, 900)
        }

        // render rogue asteroids
        rogueAsteroidLeft(0, -50, 650)
        rogueAsteroidRight(1, 650, 1050)
  
        // -----------------------------------------------------
        
        ship.shipX += ship.velX;
        ship.shipY += ship.velY;
        // add friction to make car slow down realistically
        ship.velX *= 0.9;
        ship.velY *= 0.9;
        
    ctx.drawImage(spaceShip, ship.shipX, ship.shipY)

    requestAnimationFrame(draw);
}

// wait for images to load before drawing
// switch to promise
spaceShip.onload = () => {
    draw();
}


// cant use the same asteroid or it will conflict with the one already on screen
        // the score will remain at 20 longer than expected, so the page will fill with asteroids


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


// ********before refactor***********

// let shipX = 450;
// let shipY = canvas.height - 200;

// let velX = 0;
// let velY = 0;

// let bgX = 0
// let bgY = 0
// let bgY2 = -1250
// let bgVelY = 0

// car.width = 94
// canvas.width = 1000

// asteroid widths 80 to 100

// const renderAsteroid = (asteroid, Xmin, Xmax) => {
//     // set asteroid's Y velocity and position
//     // velocity is increased by 1 with every iteration, but by multiplying it with a number less than 1, it will get closer and closer to 0, thus slowing it down gradually
//     // cant just change the Y position since it is redrawn everytime and the program will stutter. Using velocity allows smoother animation and makes it easier to randomize the asteroid velocity

//     asteroids[asteroid].laneY += asteroids[asteroid].velocityY;
//     asteroids[asteroid].velocityY++;
//     asteroids[asteroid].velocityY *= asteroids[asteroid].randomVelocity;

//     // collision detection

//     if (asteroids[asteroid].laneX + 25 < shipX + spaceShip.width &&
//         asteroids[asteroid].laneX + asteroids[asteroid].asteroidType.width - 25 > shipX &&
//         asteroids[asteroid].laneY + 25 < shipY + spaceShip.height &&
//         asteroids[asteroid].laneY + asteroids[asteroid].asteroidType.height - 15 > shipY) {
//         alert('collision!')
//     }

//     // reset asteroid's position once it has passed the height of the canvas
 
//     if (asteroids[asteroid].laneY > canvas.height) {
//         // increase score counter by 1
//         counter += 1;
//         score.innerHTML = counter;
//         // asteroid's starting X position set to a random number
//         // Y position reset and hard coded to have less overlap with other asteroids
//         asteroids[asteroid].laneX = randomNumber(Xmin, Xmax);
//         asteroids[asteroid].laneY = -asteroids[asteroid].asteroidType.height - 100
//         // randomize asteroid type and velocity
//         randomAsteroid = randomNumber(0, asteroidImages.length)
//         asteroids[asteroid].asteroidType = asteroidImages[randomAsteroid]
//         asteroids[asteroid].randomVelocity = randomDecimal(0.75, 0.83)
//     }

//     ctx.drawImage(asteroids[asteroid].asteroidType, asteroids[asteroid].laneX, asteroids[asteroid].laneY)
// }

// const rogueAsteroidLeft = (asteroid, Xmin, Xmax) => {
//     rogueObjects[asteroid].laneY += rogueObjects[asteroid].velocityY;
//     rogueObjects[asteroid].velocityY++;
//     rogueObjects[asteroid].velocityY *= rogueObjects[asteroid].randomVelocity;

//     rogueObjects[asteroid].laneX += 3

//     if (rogueObjects[asteroid].laneX + 25 < shipX + spaceShip.width &&
//         rogueObjects[asteroid].laneX + rogueObjects[asteroid].asteroidType.width - 25 > shipX &&
//         rogueObjects[asteroid].laneY + 25 < shipY + spaceShip.height &&
//         rogueObjects[asteroid].laneY + rogueObjects[asteroid].asteroidType.height - 15 > shipY) {
//         alert('collision!')
//     }

//     if (rogueObjects[asteroid].laneY > canvas.height) {
//         counter += 1;
//         score.innerHTML = counter;
//         rogueObjects[asteroid].laneX = randomNumber(Xmin, Xmax);
//         rogueObjects[asteroid].laneY = -rogueObjects[asteroid].asteroidType.height - 100

//         randomAsteroid = randomNumber(0, asteroidImages.length)
//         rogueObjects[asteroid].asteroidType = asteroidImages[randomAsteroid]
//         rogueObjects[asteroid].randomVelocity = randomDecimal(0.78, 0.9)
//     }

//     ctx.drawImage(rogueObjects[asteroid].asteroidType, rogueObjects[asteroid].laneX, rogueObjects[asteroid].laneY)
// }