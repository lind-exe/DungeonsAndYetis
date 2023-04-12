
let iPosition
let jPosition

let labyrinth
let array = [
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
    [1, 3, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
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
    iPosition = 9
    jPosition = 5
    points = 0
    document.getElementById("statusText").innerHTML = ""
    document.getElementById("direction").innerHTML = "North"
    document.getElementById('background').style.backgroundImage = "url(resources/center-open.png)";
    drawLabyrinth(iPosition, jPosition)
}

function drawLabyrinth(iPos, jPos) {
    //console.log(array)
    document.getElementById("points").innerHTML = "Points: " + points

    labyrinth = ""
    let i = 0
    let j = 0
    var innerArray = array[i].length;


    for (i = 0; i < array.length; i++) {

        for (j = 0; j < innerArray; j++) {
            //console.log('[' + i + ', ' + j + '] = ' + array[i][j])
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
            else {
                labyrinth += "<div> O </div>" // gör inget
            }
        }
    }
    document.getElementById("frame").innerHTML = labyrinth
    let value = document.getElementById("direction").innerHTML
    addPictures(iPosition, jPosition, value)
}

function move(value) {
    if (value == 'North' && iPosition > 0) {
        if (array[iPosition - 1][jPosition] == 1) {
            document.getElementById("statusText").innerHTML = "Wall"
        }
        else {
            iPosition--;
            document.getElementById("direction").innerHTML = "North"
            drawLabyrinth(iPosition, jPosition)
        }
    }
    else if (value == 'West' && jPosition > 0) {
        if (array[iPosition][jPosition - 1] == 1) {
            document.getElementById("statusText").innerHTML = "Wall"
        }
        else {
            jPosition--;
            document.getElementById("direction").innerHTML = "West"
            drawLabyrinth(iPosition, jPosition)
        }
    }
    else if (value == 'East' && jPosition < 9) {
        if (array[iPosition][jPosition + 1] == 1) {
            document.getElementById("statusText").innerHTML = "Wall"
        }
        else {
            jPosition++;
            document.getElementById("direction").innerHTML = "East"
            drawLabyrinth(iPosition, jPosition)
        }
    }
    else if (value == 'South' && iPosition < 9) {
        if (array[iPosition + 1][jPosition] == 1) {
            document.getElementById("statusText").innerHTML = "Wall"
        }
        else
            iPosition++;
        document.getElementById("direction").innerHTML = "South"
        drawLabyrinth(iPosition, jPosition)
    }

    if (array[iPosition][jPosition] == 2) {
        points += 500
        drawLabyrinth(iPosition, jPosition)
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
        if (jPlus == 1 && jMinus == 1 && iMinus == 0) {
            document.getElementById('background').style.backgroundImage = "url(resources/center-open.png)";
        }
        if (iMinus == 1 && jMinus == 1 && jPlus == 0) {
            document.getElementById('background').style.backgroundImage = "url(resources/east-open.png)";
        }
        if (jMinus == 1 && jPlus == 0 && iMinus == 0) {
            document.getElementById('background').style.backgroundImage = "url(resources/east-center-open.png)";
        }
        if (jMinus == 0 && iMinus == 0 && jPlus == 1) {
            document.getElementById('background').style.backgroundImage = "url(resources/west-center-open.png)";
        }
        if (jMinus == 0 && iMinus == 0 && jPlus == 0) {
            document.getElementById('background').style.backgroundImage = "url(resources/all-open.png)";
        }
        if (jMinus == 0 && iMinus == 1 && jPlus == 1) {
            document.getElementById('background').style.backgroundImage = "url(resources/west-open.png)";
        }
        if (jMinus == 1 && jPlus == 1 && iMinus == 1) {
            document.getElementById('background').style.backgroundImage = "url(resources/dead-end.png)";
        }
    }
    else if (value == "East") {
        if (iPlus == 1 && jPlus == 1 && iMinus == 0) {

            document.getElementById('background').style.backgroundImage = "url(resources/west-open.png)";
        }
        if (jPlus == 1 && iMinus == 0 && iPlus == 0) {
            document.getElementById('background').style.backgroundImage = "url(resources/west-east-open.png)";
        }
    }
    else if (value == "West") {
        if (jMinus == 1 && iPlus == 1 && iMinus == 1) {
            document.getElementById('background').style.backgroundImage = "url(resources/dead-end.png)";
        }
        if (iMinus == 1 && iPlus == 1 && jMinus == 0) {
            document.getElementById('background').style.backgroundImage = "url(resources/center-open.png)";
        }
        if (jMinus == 1 && iPlus == 1 && iMinus == 0) {
            document.getElementById('background').style.backgroundImage = "url(resources/east-open.png)";

        }

    }
    else if (value == "South") {
        if (jPlus == 1 && jMinus == 1 && iPlus == 0) {
            document.getElementById('background').style.backgroundImage = "url(resources/center-open.png)";
        }
        if (iPlus == 1 && jMinus == 1 && jPlus == 0) {
            document.getElementById('background').style.backgroundImage = "url(resources/east-open.png)";
        }
        if (jMinus == 1 && jPlus == 0 && iPlus == 0) {
            document.getElementById('background').style.backgroundImage = "url(resources/east-center-open.png)";
        }
        if (jMinus == 0 && iPlus == 0 && jPlus == 1) {
            document.getElementById('background').style.backgroundImage = "url(resources/west-center-open.png)";
        }
        if (jMinus == 0 && iPlus == 0 && jPlus == 0) {
            document.getElementById('background').style.backgroundImage = "url(resources/all-open.png)";
        }
        if (jMinus == 0 && iPlus == 1 && jPlus == 1) {
            document.getElementById('background').style.backgroundImage = "url(resources/west-open.png)";
        }
        if (jMinus == 1 && jPlus == 1 && iPlus == 1) {
            document.getElementById('background').style.backgroundImage = "url(resources/dead-end.png)";
        }
    }


    // if (array[iPosition + 1] == 1 && array[jPosition + 1] == 1) {
    //     //visa bild med de väggarna etc
    // }
    // else if (array[iPosition + 1] == 1 && array[jPosition + 1] == 1) {
    //     //visa bild med de väggarna etc
    // }
    changeCompass(value)
}

function gameWon() {
    labyrinth = "<h1>Congrats, you won!</h1>"
    document.getElementById('background').style.backgroundImage = "url(resources/all-open.png)";
    document.getElementById("frame").innerHTML = labyrinth
}