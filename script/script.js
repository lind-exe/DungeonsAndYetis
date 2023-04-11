
let iPosition
let jPosition

start()

function start() {
    iPosition = 9
    jPosition = 5
    drawLabyrinth(iPosition, jPosition)
}

function drawLabyrinth(iPos, jPos) {
    let labyrinth = ""
    let i = 0
    let j = 0

    for (i = 0; i <= 9; i++) {
        for (j = 0; j <= 9; j++) {
            if (iPos == i && jPos == j) {
                labyrinth += "<div> X </div>"
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
    if (value == 'West' && jPosition > 0) {
        jPosition--;
        drawLabyrinth(iPosition, jPosition)
    }
    if (value == 'East' && jPosition < 9) {
        jPosition++;
        drawLabyrinth(iPosition, jPosition)
    }
    if (value == 'South' && iPosition < 9) {
        iPosition++;
        drawLabyrinth(iPosition, jPosition)
    }
}