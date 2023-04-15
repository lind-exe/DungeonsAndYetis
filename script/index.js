getJoke()

function getJoke() {
    const url = "https://api.chucknorris.io/jokes/random/"
    const jokeDiv = document.getElementById("jokeDiv")

    fetch(url)
        .then(function (response) { return response.json() })
        .then(function (data) {

            let jokeString = document.createElement("h1")
            jokeString.innerHTML = data.value

            jokeDiv.appendChild(jokeString)
        })
}

function startgame() {
    let button = document.getElementById("button")
}