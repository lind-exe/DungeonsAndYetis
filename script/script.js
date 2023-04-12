
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
    document.getElementById("compass").innerHTML = "North"
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
    let value = document.getElementById("compass").innerHTML 
    addPictures(iPosition, jPosition, value)
}

function move(value) {
    if (value == 'North' && iPosition > 0) {
        if (array[iPosition - 1][jPosition] == 1) {
            document.getElementById("statusText").innerHTML = "Wall"
        }
        else {
            iPosition--;
            document.getElementById("compass").innerHTML = "North"
            drawLabyrinth(iPosition, jPosition)
        }
    }
    else if (value == 'West' && jPosition > 0) {
        if (array[iPosition][jPosition - 1] == 1) {
            document.getElementById("statusText").innerHTML = "Wall"
        }
        else {
            jPosition--;
            document.getElementById("compass").innerHTML = "West"
            drawLabyrinth(iPosition, jPosition)
        }
    }
    else if (value == 'East' && jPosition < 9) {
        if (array[iPosition][jPosition + 1] == 1) {
            document.getElementById("statusText").innerHTML = "Wall"
        }
        else {
            jPosition++;
            document.getElementById("compass").innerHTML = "East"
            drawLabyrinth(iPosition, jPosition)
        }
    }
    else if (value == 'South' && iPosition < 9) {
        if (array[iPosition + 1][jPosition] == 1) {
            document.getElementById("statusText").innerHTML = "Wall"
        }
        else
            iPosition++;
        document.getElementById("compass").innerHTML = "South"
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

function addPictures(iPosition, jPosition, value) {
    if (value == "North") {
        if ((array[iPosition - 1][jPosition] == 0) && (array[iPosition][jPosition + 1] == 1) && (array[iPosition][jPosition - 1] == 1)) {

            document.getElementById('background').style.backgroundImage="url(resources/center-open.png)";
        }
        else if ((array[iPosition - 1][jPosition] == 1) && (array[iPosition][jPosition - 1] == 1) && (array[iPosition][jPosition + 1] == 0)) {
            document.getElementById('background').style.backgroundImage="url(resources/east-open.png)";

        }
        else {
            document.getElementById("statusText").innerHTML = "hej"
        }

    }
    else if(value == "East") {
        if ((array[iPosition + 1][jPosition] == 1) && (array[iPosition][jPosition + 1] == 1) && (array[iPosition - 1][jPosition] == 0)) {

            document.getElementById('background').style.backgroundImage="url(resources/west-open.png)";
        }
        else {
            document.getElementById("statusText").innerHTML = "hej"
        }
    }
    else if(value == "West") {

    }
    else if(value == "South") {
        
    }


    // if (array[iPosition + 1] == 1 && array[jPosition + 1] == 1) {
    //     //visa bild med de väggarna etc
    // }
    // else if (array[iPosition + 1] == 1 && array[jPosition + 1] == 1) {
    //     //visa bild med de väggarna etc
    // }
}

function gameWon() {
    labyrinth = "<h1>Congrats, you won!</h1>"
    document.getElementById("frame").innerHTML = labyrinth
}