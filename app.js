const express = require('express')
const app = express()
const axios = require('axios')
const bodyParser = require('body-parser')
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/'));

io.on('connection', function (socket) {
  console.log('A user connected');

  //io.sockets.emit('broadcast',{ description: ' clients connected!'});

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    console.log('A user disconnected');
  });
});


app.post('/get', (req, res) => {
  let data = { ...req.body, "date": new Date().toDateString(), "time": new Date().toLocaleTimeString() }
  //console.log(req.body)
  io.sockets.emit('broadcast', { ...data })

  res.send("data posted")
  axios.post('https://myburger-b33d0.firebaseio.com/locaswin.json', data)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })

})

http.listen(process.env.PORT || 4000, () => {
  console.log('yup listening')
})