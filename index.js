const express = require('express')
const mysql = require('mysql2')
const ejs = require('ejs');
const bodyParser = require('body-parser');

const app = express()
const port = 3000

require('dotenv').config();
const {MyHost,MyUser,MyPassword,MyDatabase} = process.env;

app.set('view engine','ejs');
app.set('views','./views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const connection =  mysql.createConnection({
    host:MyHost,
    user:MyUser,
    password:MyPassword,
    database:MyDatabase
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
    
    //ดึงข้อมูลในฐานข้อมูล
    const SelectDataSQL = 'SELECT * FROM user'
    connection.query(SelectDataSQL,(err,result) =>{
        if(err){
            console.log("Have someting wrong");
        }else{
            console.log("Select data successfull");
            res.render('file',{result});
            //connection.end();
                    
        }
    })
})

app.post('/edit-data',(req,res)=>{

    const id = req.body.EmtId;

    const fname = req.body.fname;
    const lname = req.body.lname;
    const sex = req.body.sex;
    const email = req.body.gmail;
    const degree = req.body.degree;

    const query = `
        UPDATE user 
        SET user_fname = ?, user_lname = ?, user_sex = ?, user_mail = ?, user_enducation = ?
        WHERE user_id = ?;
    `;

    connection.query(query, [fname, lname, sex, email, degree, id], (error, results, fields) => {
        if (error) {
            console.error('Error updating user:', error);
        } else {
            console.log('User updated successfully:', results);
            res.redirect('/')
        }
});})

app.post('/delete-data',(req,res) =>{

    const id = req.body.EmtId;
    if (!id) {
        return res.status(400).send('Invalid data: Missing EmtId');
    }
    const DeleteSQL = 'DELETE FROM user WHERE user_id = ?;'
    connection.query(DeleteSQL,[id],(err,result) =>{
        if(err){
            console.log(err)
        }
        else{
            console.log("Delete Data in database Successful",result);
            res.redirect('/')
        }
    })
})

app.post('/add-data',(req,res) =>{
    const fname = req.body.fname;
    const lname = req.body.lname;
    const sex = req.body.sex;
    const email = req.body.gmail;
    const address = req.body.address;
    const degree = req.body.degree;

    const SQLadd = 'INSERT INTO user (user_fname, user_lname, user_sex, user_mail,user_address,user_enducation) VALUES (?,? ,?,?,?,?);'

    connection.query(SQLadd,[fname,lname,sex,email,address,degree],(err,result) =>{
        if (err) {
            console.error('Error updating user:', err);
        } else {
            console.log('add user successfully:', result);
            res.redirect('/')
        }
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})