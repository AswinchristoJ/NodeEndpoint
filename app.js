const express = require('express')
const app = express()
const axios = require('axios')

app.get('/',(req,res)=>{
console.log(req.query)
res.send(`<form action="/get" method="get">
  First name:<br>
  <input type="text" name="firstname" value="Mickey">
  <br>
  Last name:<br>
  <input type="text" name="lastname" value="Mouse">
  <br><br>
  <input type="submit" value="Submit">
</form>`)
})

app.get('/get',(req,res)=>{
console.log(req.query)
res.send(req.query)

axios.post('https://myburger-b33d0.firebaseio.com/locaswin.json',req.query)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
})

})

app.listen(process.env.PORT||4000,()=>{
console.log('yup listening')
})