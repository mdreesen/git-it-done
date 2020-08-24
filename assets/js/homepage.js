var getUserRepos = function(user) {
    // formatting the API url differently from
    // fetch("https://api.github.com/users/octocat/repos").then(function(response)
    // This adds a parameter
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // Make a request to the URL
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        })
    })
}

getUserRepos("github");