// VARIABLES
var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
var repoNameEl = document.querySelector("#repo-name");


var getRepoName = function() {
    // grab repo name from url query string
    var queryString = document.location.search;
    var repoName = queryString.split("=")[1];

    if (repoName) {
        // display repo name on the page
        repoNameEl.textContent = repoName;

        getRepoIssues(repoName);
    } else {
        // if no repo was given, redirect to the homepage
        document.location.replace("./index.html");
    }
};


// FETCHING THE URL
var getRepoIssues = function(repo) {
    console.log(repo);
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    // this fetches the apiUrl variable URL
    fetch(apiUrl).then(function(response) {
        // if the request was successful
        if (response.ok) {
            // if the response was ok, this brings back data 
            response.json().then(function(data) {
                // pass response data to dom function
                displayIssues(data);

                // check if api has paginated issues
                if (response.headers.get("Link")) {
                    displayWarning(repo);
                }
            });
        } else {
            // if not successful, redirect to homepage
            document.location.replace("./index.html");
        }

        var displayIssues = function(issues) {

            // 
            if (issues.length === 0) {
                issueContainerEl.textContent = "This repo has no open issues!"
                return;
            }

            // creating for loop, looping over the response data and creating an <a> element for each issue
            for (var i = 0; i < issues.length; i++) {
                // create a link element to take users to the issue on github
                var issueEl = document.createElement("a");
                // creates a class for the element
                issueEl.classList = "list-item flex-row justify-space-between align-center";
                // sets the attribute to that element, for each element
                issueEl.setAttribute("href", issues[i].html_url);
                // sets the link into another tab when clicked on on the webpage
                issueEl.setAttribute("target", "_blank");


                issueContainerEl.appendChild(issueEl);

                // create span to hold issue title
                var titleEl = document.createElement("span");
                titleEl.textContent = issues[i].title;

                // append to container
                issueEl.appendChild(titleEl);

                // create a type element
                var typeEl = document.createElement("span");

                // check if issue is an actual issue or a pull request
                if (issues[i].pull_request) {
                    typeEl.textContent = "(Pull request)";
                } else {
                    typeEl.textContent = "(Issue)";
                }

                // append to container
                issueEl.appendChild(typeEl);
            }
        }

        var displayWarning = function(repo) {
            limitWarningEl.textContent = "To see more than 30 issues, visit ";

            var linkEl = document.createElement("a");
            linkEl.textContent = "See More Issues on GitHub.com";
            linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
            linkEl.setAttribute("target", "_blank");

            // append to warning container
            limitWarningEl.appendChild(linkEl);
        };


    });
}

// getRepoIssues("facebook/react");
getRepoName();