drawLabyrinth()

function drawLabyrinth() {
    let labyrinth = ""
    let i = 0
    let j = 0

    for(i = 0; i<=10; i++) {
        labyrinth += "<div> i." + i + "| j."+ j +"</div>"
        for(j = 0; j<=10; j++) {
            labyrinth += "<div> i." + i + "| j."+ j +"</div>"
        }
    }
    document.getElementById("frame").innerHTML = labyrinth
}