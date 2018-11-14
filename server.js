// load the express library, which should be in the node_modules folder
// if you don't have a node_modules folder inside this basic-template folder
// see the README.md file in the root directory of this repo for instructions
const express = require('express')

// here we call the express() function which returns a default express server
// application. we assign it to a variable called 'app'
const app = express()

// here we'll import the http module, this is part of the standard node.js
// libraries. we'll use it to connect our express server with our socket.io
const http = require('http').Server(app)

// here we import the socket.io library and connect it to our http object
const io = require('socket.io')(http)


// here we create a variable that will contain our port number, this is set
// either in the terminal when we launch the app like: node server.js 3000
// otherwise  defaults to port 80, which requires sudo, ex: sudo node server.js
const port = process.argv[2] || 80

// we can serve up an entire directory of static files using express.static()
// instead of having to define all the app.get() paths individually
app.use( express.static(__dirname+'/www') )


// here we use socket.io to listen for connections from new clients
io.on('connection',function(socket){
    // when a new user connects, log this in the terminal
    console.log('new user!')

    // here we're listening for the 'enter-click' event from our client
    // this is an event we made up and we emit on the client side (index.html)
    socket.on('enter-click',function(data){
        // when we receive the 'enter-click' event, pass the data we got from
        // the client to all the other connected clients using broadcast.emit(),
        // let's emit an event called 'new-msg' which the clients are
        // listening for. 
        socket.broadcast.emit('new-msg',data)
    })

    // when this particular user disconnects, log this in the terminal
    socket.on('disconnect',function(){
        console.log('user left :(')
    })
})


// start listening for requests from potential clients, notice that here we are
// using the 'http' variable, instead of the 'app' variable like in our other
// example, because http links our app with our socket.io
http.listen( port, function(err){
    if(err){ // if there's an error, log it to terminal
        console.log(err)
    } else { // otherwise, log the following...
        console.log(`server is listening, visit http://localhost:${port}`)
    }
})
