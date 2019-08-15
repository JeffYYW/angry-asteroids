const container = document.querySelector('.container');
const playButton = document.querySelector('.controls');
const scoreContainer = document.querySelector('.scoreContainer');
const endScreen = document.querySelector('.endScreen')
const finalCount = document.getElementById('finalCount');
const title = document.querySelector('.titleOverlay');
const endTitle = document.querySelector('#endTitle');
const score = document.getElementById('scoreNumber')

const cvs = document.getElementById('canvas');

cvs.width = '1000';
cvs.height = window.innerHeight;

const ctx = cvs.getContext("2d");

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

// the two variables and functions below deal with the ship controller
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

const keyListener = (event) => {
    let keyState = false;
    controller.left = keyState;
    controller.right = keyState;

    if (event.type == "keydown") {
        keyState = true;

        if (event.keyCode === 37) {
            controller.left = keyState;
        }
        if (event.keyCode === 39) {
            controller.right = keyState;
        }
    } else {
        keyState = false;
    }
}

const moveShip = () => {
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

// score counter
let counter = 0

// collision detection
const collisionDetection = (array, index) => {
    if (array[index].laneX + 25 < ship.shipX + spaceShip.width &&
        array[index].laneX + array[index].asteroidType.width - 25 > ship.shipX &&
        array[index].laneY + 25 < ship.shipY + spaceShip.height &&
        array[index].laneY + array[index].asteroidType.height - 25 > ship.shipY) {
        stopProgram = true;
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

// this function draws the canvas and loops through the game
function draw() {
        
    // have two bg images scrolling one after the other
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

        // the following statements increase the difficulty when the counter reaches a specific number
        if (counter === 50 && asteroids.length < 7) {
            asteroids.push({
                asteroidType: asteroidImages[randomNumber(0, asteroidImages.length)],
                laneX: randomNumber(20, 900),
                laneY: -400,
                velocityY: 0,
                randomVelocity: randomDecimal(0.75, 0.83)
            })
        }

        if (counter === 100 && asteroids.length < 8) {
            asteroids.push({
                asteroidType: asteroidImages[randomNumber(0, asteroidImages.length)],
                laneX: randomNumber(20, 900),
                laneY: -450,
                velocityY: 0,
                randomVelocity: randomDecimal(0.75, 0.83)
            })
        }

        if (counter === 150 && asteroids.length < 9) {
            asteroids.push({
                asteroidType: asteroidImages[randomNumber(0, asteroidImages.length)],
                laneX: randomNumber(20, 900),
                laneY: -500,
                velocityY: 0,
                randomVelocity: randomDecimal(0.75, 0.83)
            })
        }

        if (counter === 200 && asteroids.length < 10) {
            asteroids.push({
                asteroidType: asteroidImages[randomNumber(0, asteroidImages.length)],
                laneX: randomNumber(20, 900),
                laneY: -550,
                velocityY: 0,
                randomVelocity: randomDecimal(0.75, 0.83)
            })
        }

        // -----------------------------------------------------
        
        ship.shipX += ship.velX;
        ship.shipY += ship.velY;
        // make the ship gradually slow down
        ship.velX *= 0.9;
        ship.velY *= 0.9;
        
    ctx.drawImage(spaceShip, ship.shipX, ship.shipY)

    if (counter === 300) {
        displayWinScreen()
        winScreenShown = true;
        return
    }

    if (stopProgram === false) {
        requestAnimationFrame(draw);
    } else {
        showEndScreen()
        return
    }
}

// these functions and variables deal with displaying the end screens
let winScreenShown = false;
let stopProgram = false;
let showTitle = true;

const showEndScreen = () => {
    endScreen.style.display = 'flex';
    finalCount.innerHTML = counter;
}

const displayWinScreen = () => {
    endScreen.style.display = 'flex';
    endTitle.style.fontSize = "24px";
    endTitle.style.padding = "0 60px";
    endTitle.innerHTML = 'You made it through! The odds of winning were 3,720 to 1!';
    finalCount.innerHTML = counter;
}



/* =============================================== */
/* Game starts here*/
/* =============================================== */

// wait for images to load before drawing
spaceShip.onload = () => {
    title.addEventListener('click', event => {
        title.classList.add("fadeOut")
        scoreContainer.style.display = 'block';
        draw();
    })
    document.addEventListener('keypress', event => {
        if (event.keyCode === 13 && showTitle === true) {
            showTitle = false;
            title.classList.add("fadeOut")
            scoreContainer.style.display = 'block';
            draw();
        }
    })
}


// these functions reload the game when end screens are shown
playButton.addEventListener('click', event => {
    location.reload();
})

document.addEventListener('keypress', event => {
    if (event.keyCode === 13 && stopProgram === true || winScreenShown === true) {
        location.reload();
    }
})



// *************** References ***************

// http://atomicrobotdesign.com/blog/htmlcss/build-a-vertical-scrolling-shooter-game-with-html5-canvas-part-6/
    // scrolling bg
// https://www.youtube.com/watch?v=8uIt9a2XBrw&t=368s
// https://www.youtube.com/watch?v=1oNsZCqQDeE
// https://www.youtube.com/watch?v=L07i4g-zhDA
// https://stackoverflow.com/questions/14178769/smooth-keydown-animation-on-canvas-in-javascript
// https://stackoverflow.com/questions/38420047/how-to-add-touch-screen-functionalitytap-left-right-side-of-screen-in-html5-mo


