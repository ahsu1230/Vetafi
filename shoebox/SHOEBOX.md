# Setting up Shoebox
Shoebox is the server that handles all control logic in the application. This includes authentication, handling user information, it is basically the bulk of the main logic put together into a box, like a shoebox!

### Install Node
If you haven't already, we'll need to install node. Run the following at the same directory level as _package.json_.
```
$ npm install
```

### Have a MongoDb instance running
Refer to the [MongoDb installation page](https://docs.mongodb.com/master/installation/) to install. We used Homebrew to install Mongo.
```
$ brew install mongodb
```

## Running Shoebox locally
Make sure a mongodb is setup, we assume the database is on port 27017.
```
$ mongod
```

Simply run the _start.sh_ script from the command line. The server should start up at port 3999.
```
$ ./start.sh
```

## Codebase Organization
The codebase directories are organized as such:
- builders		utilities used to build the web server and get it running
- config		configuration utilities to help bind together third-party services
- controllers		endpoint logic for requests
- commanders		app logic to manipulate databases
- domain		database access objects that represent db tables
- middlewares		utilities to help process requests before hitting the controllers

