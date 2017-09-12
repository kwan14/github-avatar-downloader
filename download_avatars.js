
var request = require("request");
var fs = require("fs");

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
    cb(error, JSON.parse(body));
  })
}

getRepoContributors("jquery", "jquery", (err, result) => {
  console.log("Errors:", err);
  result.forEach((currentValue) => {
    downloadImageByURL(currentValue.avatar_url, "avatars/" + currentValue.login + ".jpg");
  })
})



function downloadImageByURL(url, filepath) {
  request.get(url).pipe(fs.createWriteStream(filepath));
}

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");