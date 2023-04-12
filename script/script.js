
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

    addPictures(iPosition, jPosition, value)
}

function addPictures(iPosition, jPosition, value) {
    //var deadEnd = "url(resources/dead\ End.png)"
    // var frontOpen = "resources/Front\ Open.png"
    // var rightOpen = "resources/Right\ open.png"

    //var background = document.getElementById("background")
    if (value == 'North') {
        if (array[iPosition - 1] == 0 && array[jPosition + 1] == 1 && array[jPosition - 1] == 1) {
            let img = document.createElement("img")
            img.src = url("resources/Right\ open.png")
            img.setAttribute("id", "background")
        }
        else if (array[iPosition - 1] == 1 && array[jPosition - 1] == 1 && array[jPosition + 1] == 0) {
            background.style.backgroundImage = rightOpen
        }
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