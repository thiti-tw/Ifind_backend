const express = require('express');
const router = express.Router();
//const conn = require('./dbconnect');
const pool = require('../../dbconnect'); //database
const mysql = require('mysql');
const bcrypt = require('bcryptjs');


router.get('/', (req, res) => {

    pool.query('SELECT * from user', (error, results, fields) => {
        if (error) throw error;
        res.status(200).json(results);
    });
});

router.post('/register', (req, res) => {
    let data = req.body; //json object
    /*let sql = 'select count(email, username) as checkmail, checkusername from user where username = ?';
    sql = mysql.format(sql, [data.username]);*/

    let sql = 'select count(username) as checkusername from user where username = ?';
    sql = mysql.format(sql, [data.username]);

    pool.query(sql,async function  (error, results, fields) {
        if(error) throw error;
        if(results[0].checkusername == 0){
            const encryptpass = await bcrypt.hash(data.password,10);
            let sql = 'INSERT into user (username, password, name, lastname)' +
                'VALUES (?, ?, ?, ?)';
            sql = mysql.format(sql, [data.username, encryptpass, data.name, data.lastname]);

            pool.query(sql, function (error, results, fields) {
                if (error) throw error;
                if (results.affectedRows == 1) {
                    res.status(201).json({
                        message: "register success"
                    });
                } else {
                    res.status(400).json({
                        message: "register failed"
                    });
                }
        
            });          
        }else{
            res.status(400).json({
                message : "username already used"
            });
        }
    });
});

router.delete('/:userId', (req, res) => { //delete user
    let id = req.params.userId;
    let sql = 'delete from user where id = ?'
    sql = mysql.format(sql, [id]);

    pool.query(sql, (error, results, fields) => {
        if (error) throw error;
        if(results.affectedRows == 1){
            res.status(200).json({
                message : "Delete success"
            });
        }else{
            res.status(400).json({
                message : "Delete failed"
            });
        }
        
    });
});

router.get('/search/:userId', (req, res) => { //search user
    let id = req.params.userId;
    let sql = 'select * from user where id = ?'
    sql = mysql.format(sql, [id]);

    pool.query(sql, (error, results, fields) => {
        if (error) throw error;
       // console.log(results[0]);
        if(results[0] != null){
            res.status(200).json(results);
        } else {
            res.status(400).json({
                message : "No user found"
            });
        }
        
    });
});


module.exports = router;