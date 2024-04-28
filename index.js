const express = require('express')
const mysql = require('mysql2')
const app = express()
const port = 3000

require('dotenv').config();
const {MyHost,MyUser,MyPassword,MyDatabase} = process.env;


const connection =  mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'usermanagement'
})

//ตรวจสอบ Conection ว่าเชื่อมต่อได้หรือไม่
    connection.connect((err) =>{
        if(err){
            console.log("Erorr conection to Database");
            console.log(err)
        }else{
            console.log('Database is conected successfully !');
        }
    })


app.get('/', (req, res) => {
    const SelectDataSQL = 'SELECT * FROM user'
    connection.query(SelectDataSQL,(err,result) =>{
        if(err){
            console.log("การดึงข้อมูลผิดพลาด");
        }else{
            console.log("เลือกข้อมูลเรียบร้อยแล้ว");
            res.send('Hello World!');
            connection.end();        
        }
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})