
let iPosition
let jPosition

let labyrinth

function start() {
    iPosition = 9
    jPosition = 5
    drawLabyrinth(iPosition, jPosition)
}

var lootI =  Math.floor(Math.random() * 10) + 1;
var lootJ =  Math.floor(Math.random() * 10) + 1;
var rndI =  Math.floor(Math.random() * 10) + 1;
var rndJ =  Math.floor(Math.random() * 10) + 1;
function drawLabyrinth(iPos, jPos) {
    labyrinth = ""
    let i = 0
    let j = 0

    for (i = 0; i <= 9; i++) {
        for (j = 0; j <= 9; j++) {
            if (iPos == i && jPos == j) {
                labyrinth += "<div> X </div>"
            }
            else if(lootI == i && lootJ == j)
            {
                labyrinth += "<div id='loot'> Loot </div>"
            }
            else if(rndI == i && rndJ == j)
            {
                labyrinth += "<div id='monster'> M </div>"
            }
            else if(i > 2 && i < 6 && j % 8 == 0)
            {
                labyrinth += "<div id='wall'>Wall</div>"
            }
            else if(j > 4 && i < 6 && i % 5 == 0 || i == 9 && j < 3 && j > 0)
            {
                labyrinth += "<div id='wall'>Wall</div>"
            }
            else {
                labyrinth += "<div> i." + i + "| j." + j + "</div>"
            }
        }
    }
    document.getElementById("frame").innerHTML = labyrinth
}

function move(value) {
    if (value == 'North' && iPosition > 0) {
        iPosition--;
        drawLabyrinth(iPosition, jPosition)
    }
    else if (value == 'West' && jPosition > 0) {
        jPosition--;
        drawLabyrinth(iPosition, jPosition)
    }
    else if (value == 'East' && jPosition < 9) {
        jPosition++;
        drawLabyrinth(iPosition, jPosition)
    }
    else if (value == 'South' && iPosition < 9) {
        iPosition++;
        drawLabyrinth(iPosition, jPosition)
    }

    if(iPosition == 0 && jPosition == 4) {
        gameWon()
    }
}

function gameWon() {
    labyrinth = "<h1>Congrats, you won!</h1>"
    document.getElementById("frame").innerHTML = labyrinth
}