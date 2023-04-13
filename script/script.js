let play = document.getElementById('startButton')
let iPosition
let jPosition
let audio = new Audio("audio.mp3");
let labyrinth
let array = [
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
    [1, 3, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 2, 0, 0, 2, 1],
    [1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 2, 0, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 1, 0, 3, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1]
]
let points = 0


function start() {
    // någon metod där den slumpar ut loot och monster istället för en path 
    iPosition = 9
    jPosition = 5
    points = 0
    document.getElementById("up").value = "North";
    document.getElementById("left").value = "West";
    document.getElementById("right").value = "East";
    document.getElementById("down").value = "South";
    document.getElementById("statusText").innerHTML = ""
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
    let i = 0
    let j = 0
    var innerArray = array[i].length;


    for (i = 0; i < array.length; i++) {

        for (j = 0; j < innerArray; j++) {
            var current = array[i][j]
            if (iPos == i && jPos == j) {
                labyrinth += "<div id='player'> X </div>"
            }
            else if (current == 1) {
                labyrinth += "<div id='wall'>i." + i + "| j." + j + "</div>"
            }
            else if (current == 2) {
                labyrinth += "<div id='loot'> Loot </div>"
            }
            else if (current == 3) {
                labyrinth += "<div id='monster'> M </div>"
            }
            else if (current == 0) {
                labyrinth += "<div id='path'> i." + i + "| j." + j + "</div>"
            }
        }
    }
    document.getElementById("frame").innerHTML = labyrinth
    let value = document.getElementById("up").value

    addPictures(iPosition, jPosition, value)
}

function move(value) {
    document.getElementById('lootImg').style.backgroundImage = "";
    document.getElementById('monsterImg').style.backgroundImage = "";
    document.getElementById("statusText").innerHTML = "";

    if (value == 'North') {
        if (array[iPosition - 1][jPosition] != 1) {
            iPosition--;
            document.getElementById("up").value = "North";
            document.getElementById("left").value = "West";
            document.getElementById("right").value = "East";
            document.getElementById("down").value = "South";
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
            drawLabyrinth(iPosition, jPosition)
        }
    }
    if (iPosition == 0 && jPosition == 4) {
        gameWon()
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
        document.getElementById("statusText").innerHTML = "You found a treasure containing 300 points!"
    }
    if (array[iPosition][jPosition] == 3) {
        //knapp dyker upp 
        document.getElementById("statusText").innerHTML = "You encounter a monster, fight or leave it alone?"
        document.getElementById('monsterImg').style.backgroundImage = "url(resources/kennyrich.png)";
        // man ska inte kunna gå förrän monstret är borta
    }

    changeCompass(value)
}

function fightMonster() {
    document.getElementById('monsterImg').style.backgroundImage = "url(resources/kenny1.png)";
    document.getElementById("statusText").innerHTML = "The monster is angry, fight for your life!"
    document.getElementById("attack").style.backgroundColor = "red";
    document.getElementById("attack").style.color = "black";
}
function fight() {
    points += 500
    array[iPosition][jPosition] = 0
    document.getElementById("statusText").innerHTML = "You loot the monster and receive 500 points"
    document.getElementById('monsterImg').style.backgroundImage = "";
    document.getElementById("attack").style.backgroundColor = "";
    document.getElementById("attack").style.color = "";
}
function leaveMonster() {
    document.getElementById("statusText").innerHTML = "The monster gifts you 100 points to show their gratitude"
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
    document.getElementById('background').style.backgroundImage = "url(resources/all-open.png)"; // göra en unik för slutet(utomhus/en dörr?)
    document.getElementById("frame").innerHTML = labyrinth
}