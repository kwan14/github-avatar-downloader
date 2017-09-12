
var request = require("request");

console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = "kwan14";
var GITHUB_TOKEN = "9aacaec0a02e03f944dfb9bec1536e94ac87659b";


function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = "https://" + GITHUB_USER + ":" + GITHUB_TOKEN + "@api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors";
  var options = {
    url : requestURL,
    headers : {
      "User-Agent" : "request"
    }
  };
  request(options, (error, response, body) => {
    console.log(body);
  })
}

getRepoContributors("jquery", "jquery", (err, result) => {
  console.log("Errors:", err);
  console.log("Result:", result);
})