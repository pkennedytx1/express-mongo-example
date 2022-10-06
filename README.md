# Express Node API with a MongoDB Docker Image Basic Example
Howdy hey, this repo is designed to give you a first look into express and node API's as well as getting out feet wet with docker containers and mongodb.

## Getting Started
You will need to create your own .env file and place the following inside of it:
```
MONGO_CONNECTION_STRING=mongodb://root:rootpassword@localhost:27017
```
Now you are good to go and run the following:
```
npm install
npm start
```
When you look in the package.json file you can see that we are using docker compose in order to pull and spin up a docker image that already has an instance of mongo preloaded for us! There are other places we can have a mongo db. But, I find that containerized databases are the way to go. After that we spin up the server.js file.