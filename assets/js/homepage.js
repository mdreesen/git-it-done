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

// Need to add an eventListener to the <form> element to execute a function on submission
// This is for the form, need to reference the form element
// userFormEl is for getting the form, the nameInputEl is for the click
var userFormEl = document.querySelector("#user-form");

// This is for the input element
var nameInputEl = document.querySelector("#username");

// Need to create a function called formSubmitHandler to be executed upon a form submission browser event
// the event argument is inserted into the function's "()"
// the (event) contains information about the event
var formSubmitHandler = function(event) {
    event.preventDefault();
    console.log(event);

    // update this function to get the value of the form <input>
    // get "value" from "input element"
    var username = nameInputEl.value.trim();

    // creating if statement so that the user needs to put in the username
    // got username from the "username" variable that gets the value
    if (username) {
        // got the first function created, passed in the username argument
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a github username");
    }

    // send it over to getUserRepos()
}

// this is the eventListener when the submit button is clicked
// it fires off the formSubmitHandler function
userFormEl.addEventListener("submit", formSubmitHandler);

// Capturing the form's input data to use elsewhere in the app
// getUserRepos("github");