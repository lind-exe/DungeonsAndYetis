let play = document.getElementById('startButton')
let iPosition
let jPosition
let audio = new Audio("audio.mp3");
let labyrinth
let miniMap
let array = [
    [1, 1, 1, 1, 4, 1, 1, 1, 1, 1],
    [1, 3, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 2, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 2, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 1, 1],
    [1, 1, 1, 0, 1, 0, 1, 0, 0, 1],
    [1, 2, 0, 0, 1, 0, 0, 1, 1, 1],
    [1, 0, 1, 0, 1, 1, 3, 1, 2, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1]
]
let points = 0

function load() {
    // loading / progressbar ca 4 sek
    
}

function start() {
    iPosition = 9
    jPosition = 5
    points = 0
    document.getElementById("up").value = "North";
    document.getElementById("left").value = "West";
    document.getElementById("right").value = "East";
    document.getElementById("down").value = "South";
    document.getElementById("statusText").innerHTML = "";
    document.getElementById('background').style.backgroundImage = "url(resources/center-open.png)";


    playMusic();
    drawLabyrinth(iPosition, jPosition);
}

function playMusic() {
    audio.play()
    audio.volume = 0.1

}

function stopMusic() {
    audio.load()
}

function drawLabyrinth(iPos, jPos) {
    document.getElementById("points").innerHTML = "Points: " + points

    labyrinth = ""
    miniMap = ""
    let i = 0
    let j = 0
    var innerArray = array[i].length;

    if (array[iPosition][jPosition] == 4) {
        gameWon()
    }

    for (i = 0; i < array.length; i++) {

        for (j = 0; j < innerArray; j++) {
            var current = array[i][j]
            if (iPos == i && jPos == j) {
                labyrinth += "<div id='player'> X </div>"
                miniMap += "<div id='miniPlayer'></div>"
            }
            else if (current == 1) {
                labyrinth += "<div id='wall'>i." + i + "| j." + j + "</div>"
                // miniMap += "<div id='miniWall'></div>"
                miniMap += "<div id='miniSquare'></div>"
            }
            else if (current == 2) {
                labyrinth += "<div id='loot'> Loot </div>"
                // miniMap += "<div id='miniLoot'></div>"
                miniMap += "<div id='miniSquare'></div>"
            }
            else if (current == 3) {
                labyrinth += "<div id='monster'> M </div>"
                // miniMap += "<div id='miniMonster'></div>"
                miniMap += "<div id='miniSquare'></div>"
            }
            else if (current == 4) {
                labyrinth += "<div id='exit'> E </div>"
                miniMap += "<div id='miniGoal'></div>"
            }
            else if (current == 0) {
                labyrinth += "<div id='path'> i." + i + "| j." + j + "</div>"
                miniMap += "<div id='miniSquare'></div>"
            }
        }
    }
    document.getElementById("frame").innerHTML = labyrinth
    document.getElementById("miniMap").innerHTML = miniMap
    let value = document.getElementById("up").value

    addPictures(iPosition, jPosition, value)
}

function move(value) {
    document.getElementById('lootImg').style.backgroundImage = "";
    document.getElementById('monsterImg').style.backgroundImage = "";
    document.getElementById("statusText").innerHTML = "";

    let stepSound = new Audio("step2.mp3");

    if (value == 'North') {
        if (array[iPosition - 1][jPosition] != 1) {
            iPosition--;
            document.getElementById("up").value = "North";
            document.getElementById("left").value = "West";
            document.getElementById("right").value = "East";
            document.getElementById("down").value = "South";
            stepSound.play()
            drawLabyrinth(iPosition, jPosition)
        }
    }
    else if (value == 'West') {
        if (array[iPosition][jPosition - 1] != 1) {
            jPosition--;
            document.getElementById("up").value = "West";
            document.getElementById("left").value = "South";
            document.getElementById("right").value = "North";
            document.getElementById("down").value = "East";
            stepSound.play()
            drawLabyrinth(iPosition, jPosition)
        }
    }
    else if (value == 'East') {
        if (array[iPosition][jPosition + 1] != 1) {
            jPosition++;
            document.getElementById("up").value = "East";
            document.getElementById("left").value = "North";
            document.getElementById("right").value = "South";
            document.getElementById("down").value = "West";
            stepSound.play()
            drawLabyrinth(iPosition, jPosition)
        }
    }
    else if (value == 'South') {
        if (array[iPosition + 1][jPosition] != 1) {
            iPosition++;
            document.getElementById("up").value = "South";
            document.getElementById("left").value = "East";
            document.getElementById("right").value = "West";
            document.getElementById("down").value = "North";
            stepSound.play()
            drawLabyrinth(iPosition, jPosition)
        }
    }
}

function changeCompass(direction) {
    switch (direction) {
        case 'North':
            document.getElementById("dir1").innerHTML = "N";
            document.getElementById("dir2").innerHTML = "W";
            document.getElementById("dir3").innerHTML = "E";
            document.getElementById("dir4").innerHTML = "S";
            break;
        case 'West':
            document.getElementById("dir1").innerHTML = "W";
            document.getElementById("dir2").innerHTML = "S";
            document.getElementById("dir3").innerHTML = "N";
            document.getElementById("dir4").innerHTML = "E";
            break;
        case 'East':
            document.getElementById("dir1").innerHTML = "E";
            document.getElementById("dir2").innerHTML = "N";
            document.getElementById("dir3").innerHTML = "S";
            document.getElementById("dir4").innerHTML = "W";
            break;
        case 'South':
            document.getElementById("dir1").innerHTML = "S";
            document.getElementById("dir2").innerHTML = "E";
            document.getElementById("dir3").innerHTML = "W";
            document.getElementById("dir4").innerHTML = "N";
            break;
    }
}

function addPictures(iPosition, jPosition, value) {
    let iMinus = array[iPosition - 1][jPosition]
    let iPlus = array[iPosition + 1][jPosition]
    let jMinus = array[iPosition][jPosition - 1]
    let jPlus = array[iPosition][jPosition + 1]

    if (value == "North") {
        calculateBackground(jMinus, jPlus, iMinus)
    }
    else if (value == "East") {

        calculateBackground(iMinus, iPlus, jPlus)
    }
    else if (value == "West") {

        calculateBackground(iPlus, iMinus, jMinus)
    }
    else if (value == "South") {
        calculateBackground(jPlus, jMinus, iPlus)
    }

    if (array[iPosition][jPosition] == 2) {
        points += 300
        array[iPosition][jPosition] = 0
        document.getElementById('lootImg').style.backgroundImage = "url(resources/loot.png)";
        document.getElementById("statusText").innerHTML = "You found a treasure chest containing 300 points!"
    }
    if (array[iPosition][jPosition] == 3) {
        //knapp dyker upp 
        document.getElementById("statusText").innerHTML = "You encounter a yeti, fight or leave it alone?"
        document.getElementById('monsterImg').style.backgroundImage = "url(resources/kennyrich.png)";
        // man ska inte kunna gå förrän monstret är borta
    }
    if (array[iPosition][jPosition] == 4) {
        // knapp till dörren?
        document.getElementById("statusText").innerHTML = "You found the exit, click the door to leave"
        // document.getElementById('monsterImg').style.backgroundImage = "url(resources/exit.png)"; // du sätteer den två gånger
        // idk varför 
    }

    changeCompass(value)
}

function fightMonster() {
    document.getElementById('monsterImg').style.backgroundImage = "url(resources/kenny1.png)";
    document.getElementById("statusText").innerHTML = "The yeti is angry, fight for your life!"
    document.getElementById("attack").style.backgroundColor = "red";
    document.getElementById("attack").style.color = "black";
}
function fight() {
    points += 500
    array[iPosition][jPosition] = 0
    document.getElementById("statusText").innerHTML = "You loot the yeti and receive 500 points"
    document.getElementById('monsterImg').style.backgroundImage = "";
    document.getElementById("attack").style.backgroundColor = "";
    document.getElementById("attack").style.color = "";
}
function leaveMonster() {
    document.getElementById("statusText").innerHTML = "The yeti gifts you 100 points"
    points += 100
}

function calculateBackground(leftValue, rightValue, frontValue) {
    if (leftValue == 1 && rightValue == 1 && frontValue == 1) {
        document.getElementById('background').style.backgroundImage = "url(resources/dead-end.png)";
    }
    if ((leftValue != 1 && rightValue != 1 && frontValue != 1)) {
        document.getElementById('background').style.backgroundImage = "url(resources/all-open.png)";
    }

    if ((leftValue == 1 && rightValue == 1 && frontValue != 1)) {
        document.getElementById('background').style.backgroundImage = "url(resources/center-open.png)";
    }
    if ((leftValue == 1 && rightValue != 1 && frontValue == 1)) {
        document.getElementById('background').style.backgroundImage = "url(resources/east-open.png)";
    }
    if ((leftValue != 1 && rightValue == 1 && frontValue == 1)) {
        document.getElementById('background').style.backgroundImage = "url(resources/west-open.png)";
    }

    if ((leftValue == 1 && rightValue != 1 && frontValue != 1)) {
        document.getElementById('background').style.backgroundImage = "url(resources/east-center-open.png)";
    }
    if ((leftValue != 1 && rightValue == 1 && frontValue != 1)) {
        document.getElementById('background').style.backgroundImage = "url(resources/west-center-open.png)";
    }
    if ((leftValue != 1 && rightValue != 1 && frontValue == 1)) {
        document.getElementById('background').style.backgroundImage = "url(resources/west-east-open.png)";
    }

}

function gameWon() {
    labyrinth = "<h1>Congrats, you won!</h1>"
    document.getElementById('background').style.backgroundImage = "url(resources/exit.png)"; // du sätter den två gånger
    document.getElementById("frame").innerHTML = labyrinth
}