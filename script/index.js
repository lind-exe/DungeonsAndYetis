let joke

getJoke()

function getJoke() {
    const url = "https://api.api-ninjas.com/v1/jokes/"
    const jokeDiv = document.getElementById("jokeDiv")

    fetch(url)
        .then(function (response) { return response.json() })
        .then(function (data) {
            joke = data

            joke.map(function (joke) {
                let jokeString = document.createElement("h1")
                jokeString.innerHTML = joke

                jokeDiv.appendChild(jokeString)

            })
        })
}