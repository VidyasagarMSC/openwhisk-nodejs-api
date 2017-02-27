# Node.js OpenWhisk REST API 

The API demonstrates a simple, reusable Node.js web application based on the Express framework that interacts with OpenWhisk APIs and provides an API to list and Invoke actions,Packages and API gateway routes. The app extensively uses JavaScript client library(npm package) for the OpenWhisk platform.

OpenWhisk is a serverless platform that lets developers quickly and easily build feature-rich apps that automatically trigger responses to events.


## Prerequisites
1. Bluemix account.
2. OpenWhisk CLI.
3. Cloudfoundry or Bluemix CLI.

## Getting Started
- Don’t have Bluemix account? <a title="(Opens in a new tab or window)" href="https://console.ng.bluemix.net/registration/" target="_blank">Sign up</a> to create a free trial account.
- Have a Bluemix account? Use <a title="(Opens in a new tab or window)" href="https://console.ng.bluemix.net/openwhisk/editor" target="_blank">this link</a>.

### Develop in your Browser

Try out OpenWhisk in your [Browser](https://console.ng.bluemix.net/openwhisk/editor) to create actions, automate actions using triggers, and explore public packages. Visit the [learn more](https://console.ng.bluemix.net/openwhisk/learn) page for a quick tour of the OpenWhisk User Interface.

### Setting up the OpenWhisk CLI

You can use the OpenWhisk command line interface (CLI) to set up your namespace and authorization key. Go to [Configure CLI](https://new-console.ng.bluemix.net/openwhisk/cli) and follow the instructions to install it.


## Run the app locally

- [Install Node.js][]
- Clone the repo
```
git clone https://github.com/VidyasagarMSC/openwhisk-nodejs-webui.git
```
- cd into the app directory
- Run `npm install` to install the app's dependencies
- Open manifest.yml file and provide a unique name,host.
- Create a newfile and save it as .env in the root of the folder.Add the below
  values to .env file and save

```
 OpenWhisk_HOST = "openwhisk.ng.bluemix.net"
 OpenWhisk_AuthKey=" "

```
<br>For OpenWhisk auth key, run the below command
```
wsk property get --auth
```
- Run `npm start` to start the app
- Access the running app in a browser at http://localhost:6007
## Push to Bluemix

- Go to the root of the folder on your terminal, run the below command
```
cf push
```
- Based on the artifacts in your manifest.yml file, NodeJS runtime is created and you can see your app running on the host your provided.


## Test REST API
-  GET /api/v1/invoke/action/{actionName} followed by simple query
-  POST /api/v1/invoke/action/{actionName} with a POST body eg., {"message":"test"}
-  POST /api/v1/invoke/trigger/{triggerName} with a POST body (if any)
-  GET /api/v1/list/{entity} entity = actions or packages or triggers or namespaces or activations or rules or routes


[Install Node.js]: https://nodejs.org/en/download/
