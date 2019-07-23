const express = require('express')
const app = express()
const axios = require('axios')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  console.log(req.query)
  res.send(`<form action="/get" method="post">
  First name:<br>
  <input type="text" name="firstname" value="Mickey">
  <br>
  Last name:<br>
  <input type="text" name="lastname" value="Mouse">
  <br><br>
  <input type="submit" value="Submit">
</form>`)
})

app.post('/get', (req, res) => {
  let data = {...req.body,"date":new Date()}
  //console.log(req.body)
  
  res.send("data posted")
  axios.post('https://myburger-b33d0.firebaseio.com/locaswin.json', data)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })

})

app.listen(process.env.PORT || 4000, () => {
  console.log('yup listening')
})