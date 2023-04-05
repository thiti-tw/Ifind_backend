const express = require('express');
const router = express.Router();
const pool = require('../../dbconnect'); //database
const mysql = require('mysql');
const bcrypt = require('bcryptjs'); //hashpassword
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    res.status(200).json({
        message: "Login route Ok"
    });
});

router.post('/login', (req, res) => {
    let data = req.body;    //json object
    let sql = 'select * from user where username = ?';
    sql = mysql.format(sql, [data.username]);

    /*console.log("Username : " + data.username);
    console.log("Password : " + data.password);*/

    pool.query(sql, async function (error, results, fields)  {
        if (error) throw error;
        if (results[0] != null) {
            const encryptpass = await bcrypt.compare(data.password, results[0].password);
            console.log("encrypt pass : "+encryptpass);
            if (encryptpass) { //login success
                
                const token = jwt.sign({
                    id: results[0].id
                },
                    "secret",
                );
                return res.status(201).json({
                    "status": "login success",
                    "token" : token
                });
            } else {
                res.status(400).json({
                    message: "password is invalid"
                });
            }
        } else {
            res.status(400).json({
                message: "Login Failed : no username exist"
            });
        }
    });
});

module.exports = router;