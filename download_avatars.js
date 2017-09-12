
var request = require("request");
var fs = require("fs");

console.log('Welcome to the GitHub Avatar Downloader!');

// Please replace these values with a valid GitHub user and token

var GITHUB_USER = "kwan14";
var GITHUB_TOKEN = "9aacaec0a02e03f944dfb9bec1536e94ac87659b";

var owner = process.argv[2];
var name = process.argv[3];

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

function downloadImageByURL(url, filepath) {
  request.get(url).pipe(fs.createWriteStream(filepath));
}

if(owner === undefined || name === undefined) {
  console.log("Usage: node download_avatar <repository_owner> <repository_name>");
} else {
  getRepoContributors(owner, name, (err, result) => {
    result.forEach((currentValue) => {
      downloadImageByURL(currentValue.avatar_url, "avatars/" + currentValue.login + ".jpg");
    })
  })
}




