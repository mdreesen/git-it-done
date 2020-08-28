var getUserRepos = function(user) {
    // formatting the API url differently from
    // fetch("https://api.github.com/users/octocat/repos").then(function(response)
    // This adds a parameter
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // Make a request to the URL
    fetch(apiUrl)
        .then(function(response) {
            // This checks to see if the user put in bogus search data
            // if this is ok, bring back user data
            // this this is not ok, alert the user this is not right
            if (response.ok) {
                response.json().then(function(data) {
                    displayRepos(data, user);
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function(error) {
            // Notice this catch() getting chained onto the end of the then() method
            // This is when the request fails to get info from github
            alert("Unable to connect to Github");
        });
}

// Need to add an eventListener to the <form> element to execute a function on submission
// This is for the form, need to reference the form element
// userFormEl is for getting the form, the nameInputEl is for the click
var userFormEl = document.querySelector("#user-form");

// This is for the input element
var nameInputEl = document.querySelector("#username");

var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

// Need to create a function called formSubmitHandler to be executed upon a form submission browser event
// the event argument is inserted into the function's "()"
// the (event) contains information about the event
var formSubmitHandler = function(event) {
    event.preventDefault();
    // console.log(event);

    // update this function to get the value of the form <input>
    // get "value" from "input element"
    // when we submit the form, we get that value from the input form
    var username = nameInputEl.value
        // this makes it so that if a user does a search, spaces do not matter
        .trim();

    // creating if statement so that the user needs to put in the username
    // got username from the "username" variable that gets the value
    // We check that theres a value in the userName variable, wouldn't want to make an HTTP request without a userName
    if (username) {
        // got the first function created, passed in the username argument
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a github username");
    }

    // send it over to getUserRepos()
}


// This function will accept both the array of the repository data and the term we searched for as parameters
var displayRepos = function(repos, searchTerm) {

    // clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    // loop over repos
    // this goes over each repo searched
    for (var i = 0; i < repos.length; i++) {

        if (repos.length === 0) {
            repoContainerEl.textContent = "No repositories found.";
            return;
        }

        // format repo name
        // taking the repo and putting the data to the page with the repo[i]
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        // create a contain for each repo
        // next we create and style the div element
        // changed the div to get an anchor tag
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

        // create a span element to hold repository name
        // create a span to hold the formatted repo names
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // append to container
        // append the github names and have each content appended to the page
        repoEl.appendChild(titleEl);

        // create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML =
                "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // append to container
        // this appends the "if" statement to each of the repos searched
        // it brings back issues if there are any
        // red check-mark if there are issues, blue check-mark if there are none
        repoEl.appendChild(statusEl);

        // append container to the dom
        repoContainerEl.appendChild(repoEl);
    }
};

// this is the eventListener when the submit button is clicked
// it fires off the formSubmitHandler function
userFormEl.addEventListener("submit", formSubmitHandler);

// Capturing the form's input data to use elsewhere in the app
// getUserRepos("github");