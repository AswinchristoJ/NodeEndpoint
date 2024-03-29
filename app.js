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

  d = new Date()
  d.setHours(d.getHours() + 5);
  d.setMinutes(d.getMinutes() + 30)
  d = d.toLocaleTimeString()

  let data = { ...req.body, "date": new Date().toDateString(), "time": d }
  console.log(new Date().toGMTString())
  io.sockets.emit('broadcast', { ...data })

  res.send("data posted")
  axios.post('https://damage-analyser.firebaseio.com/location.json', data)
    .then(function (response) {
      console.log('stored in firebase successfully');
    })
    .catch(function (error) {
      console.log(error);
    })

})

http.listen(process.env.PORT || 4000, () => {
  console.log('yup listening')
})