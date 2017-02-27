/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var bodyParser = require('body-parser');
var http = require('https');
require('dotenv').config();

// OpenWhisk Javascript SDK settings
var openwhisk = require('openwhisk');
var options = {apihost: process.env.OpenWhisk_HOST, api_key: process.env.OpenWhisk_AuthKey};
var ow = openwhisk(options);

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:
true }));
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');


/****************************/
//       API Code           //
/****************************/
//Invoke an Action
app.get("/api/v1/invoke/action/:actionName", function(req, res) {
     ow.actions.invoke({actionName: req.params.actionName, blocking: true, params: req.query }).then(function(param) {
        // Return the result of the OpenWhisk call
        //res.send(JSON.stringify(param.response.result));
        var result = JSON.stringify(param.response.result);
        res.setHeader('Content-Type', 'application/json');
        res.send(result);
        //res.render('main', {response:result,request:req.protocol + '://' + req.get('Host') + req.url +"<br>method:"+ req.method});
    }).catch(function(err) {res.send("Error: " + JSON.stringify(err));});
});

app.post("/api/v1/invoke/action/:actionName", function(req,res) {
 ow.actions.invoke({actionName: req.params.actionName, blocking: true, params: req.body }).then(function(param) {
   // Return the result of the OpenWhisk call
   //res.send(JSON.stringify(param.response.result));
   var result = JSON.stringify(param.response.result);
   res.setHeader('Content-Type', 'application/json');
   res.send(result);
   //res.render('main', {response:result,request:req.protocol + '://' + req.get('Host') + req.url +"<br>method:"+ req.method});
 }).catch(function(err) {res.send("Error: " + JSON.stringify(err));});
});

app.post("/api/v1/invoke/trigger/:triggerName", function(req, res) {
   ow.triggers.invoke({triggerName: req.params.triggerName, params: req.body}).then(function(param) {
     var result = JSON.stringify(param);
     res.setHeader('Content-Type', 'application/json');
     res.send(result);
     console.log(result);
   }).catch(function(err) {res.send("Error: " + JSON.stringify(err));});
});

// List actions, packages, namespaces, triggers and routes
app.get("/api/v1/list/:param",function(req,res)
{
  switch(req.params.param)
  {
    case "actions":
      ow.actions.list().then(function(param){
        var response = JSON.stringify(param,null,2);
        res.setHeader('Content-Type', 'application/json');
        res.send(response);
      }).catch(function(err) {res.send("Error: " + JSON.stringify(err));});
   break;

   case "activations":
     ow.activations.list().then(function(param){
       var response = JSON.stringify(param,null,2);
       res.setHeader('Content-Type', 'application/json');
       res.send(response);
     }).catch(function(err) {res.send("Error: " + JSON.stringify(err));});
   break;

   case "packages":
     ow.packages.list().then(function(param){
       var response = JSON.stringify(param,null,2);
       res.setHeader('Content-Type', 'application/json');
       res.send(response);
     }).catch(function(err) {res.send("Error: " + JSON.stringify(err));});
  break;

  case "routes":
    ow.routes.list().then(function(param){
      var response = JSON.stringify(param,null,2);
      res.setHeader('Content-Type', 'application/json');
      res.send(response);
    }).catch(function(err) {res.send("Error: " + JSON.stringify(err));});
 break;

 case "triggers":
   ow.triggers.list().then(function(param){
     var response = JSON.stringify(param,null,2);
     res.setHeader('Content-Type', 'application/json');
     res.send(response);
   }).catch(function(err) {res.send("Error: " + JSON.stringify(err));});
  break;

  case "rules":
    ow.rules.list().then(function(param){
      var response = JSON.stringify(param,null,2);
      res.setHeader('Content-Type', 'application/json');
      res.send(response);
    }).catch(function(err) {res.send("Error: " + JSON.stringify(err));});
   break;

  case "namespaces":
     ow.namespaces.list().then(function(param){
       var response = JSON.stringify(param,null,2);
       res.setHeader('Content-Type', 'application/json');
       res.send(response);
     }).catch(function(err) {res.send("Error: " + JSON.stringify(err));});
    break;

   default:
      res.send("Error: " + JSON.stringify({
      "status": "404",
      "source": { "pointer": "Check the url you have entered" },
      "detail": "Resource not found."
    }));
    break;

 }

});

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
