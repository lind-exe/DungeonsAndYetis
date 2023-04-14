let joke = ""

function getJoke() {
    const url = "https://api.api-ninjas.com/v1/jokes"

    fetch(url)
        .then(function (response) { return response.json })
        .then(function(data){
            joke
        })
}