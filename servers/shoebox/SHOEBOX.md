# Settings up Shoebox
Shoebox is the server that handles all control logic in the application. This includes authentication, handling user information, it is basically the bulk of the main logic put together into a box, like a shoebox!

## Running Shoebox
Simply run the _start.sh_ script from the command line
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

