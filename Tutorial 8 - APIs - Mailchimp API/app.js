const express = require("express");
const request = require("request");
const bodyParser = require("body-parser")
const https = require('node:https');

const app = express();
// const port = 3000;

const dirName = __dirname;
const signUpPage = dirName + "/signup.html"
const successPage = dirName + "/success.html"
const failurePage = dirName + "/failure.html"


const mailchimp_API = "66ce81c446e1db816f144ca41fe91008-us1";
const mailchimp_listID = "59127ae60a";
const mailchimp_APIServerID = "us14"

app.listen(process.env.PORT || port, function() { //Deploying in Heroku
  console.log("App listening on port " + port);
});
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(signUpPage);
})

app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }],
  }
  const url = "https://us14.api.mailchimp.com/3.0/lists/" + mailchimp_listID;
  const options = {
    method: "POST",
    auth: "victor:" + mailchimp_API

  }
  const jsonData = JSON.stringify(data);
  const request = https.request(url, options, function(response) {
    if (response.statusCode === 200) {
      res.sendFile(successPage);
    } else {
      res.sendFile(failurePage);
    }
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  });
  request.write(jsonData);
  request.end();
})

app.post("/failure", function(req, res) {
  res.redirect("/");
})