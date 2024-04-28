const express = require('express')
const mysql = require('mysql2')
const app = express()
const port = 3000

function ConnectToDatabase(){
    const connection =  mysql.createConnection({
        host:'',
        user:'',
        password:'',
        database:''
    })
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})