const express = require('express');
const router = express.Router();
const pool = require('../../dbconnect'); //database
const mysql = require('mysql');
const bcrypt = require('bcryptjs'); //hashpassword
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    res.status(200).json({
        message: "post route Ok"
    });
});

router.post('/create', (req, res) => {
    let data = req.body;    //json object
    let sql = "INSERT INTO `post` (`id`, `title`, `description`, `type`, `start`, `end`, `latitude`, `longitude`, `gender`, `age`, `amount`, `picture`) VALUES (NULL, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?);";
    sql = mysql.format(sql, [data.title,data.description, data.type, data.start, data.end, data.latitude, data.longitude, data.gender, data.age, data.amount, data.picture]);

    console.log("title : " + data.title);
    console.log("type : " + data.type);
    console.log("start : " + data.start);
    console.log("end : " + data.end);
    console.log("latitude : " + data.latitude);
    console.log("longitude : " + data.longitude);
    console.log("gender : " + data.gender);
    console.log("age : " + data.age);
    console.log("amount : " + data.amount);
    console.log("picture : " + data.picture);

    pool.query(sql, function (error, results, fields) {
        if (error) throw error;
        if (results.affectedRows == 1) {
            res.status(201).json({
                message: "insert post success"
            });
        } else {
            res.status(400).json({
                message: "insert post failed"
            });
        }

    });          
});

router.post('/update', (req, res) => {
    let data = req.body;    //json object
    let sql = "UPDATE `post` SET `title` = ?, `description` = ?, `type` = ?, `start` = ?, `end` = ?, `latitude` = ?, `longitude` = ?, `gender` = ?, `age` = ?, `amount` = ?, `picture` = ? WHERE `post`.`id` = ?;";
    sql = mysql.format(sql, [data.title,data.description, data.type, data.start, data.end, data.latitude, data.longitude, data.gender, data.age, data.amount, data.picture, data.id]);

    console.log("title : " + data.title);
    console.log("type : " + data.type);
    console.log("start : " + data.start);
    console.log("end : " + data.end);
    console.log("latitude : " + data.latitude);
    console.log("longitude : " + data.longitude);
    console.log("gender : " + data.gender);
    console.log("age : " + data.age);
    console.log("amount : " + data.amount);
    console.log("picture : " + data.picture);

    pool.query(sql, function (error, results, fields) {
        if (error) throw error;
        if (results.affectedRows == 1) {
            res.status(201).json({
                message: "update post success"
            });
        } else {
            res.status(400).json({
                message: "update post failed"
            });
        }

    });          
});

router.get('/get', (req, res) => {
    //let data = req.body;    //json object
    let sql = "SELECT * FROM `post` ORDER BY id DESC";
    //sql = mysql.format(sql, [data.title, data.type, data.start, data.end, data.latitude, data.longitude, data.gender, data.age, data.amount, data.picture]);

    pool.query(sql, (error, results, fields) => {
        if (error) throw error;
        res.status(200).json(results);
    }); 
});

module.exports = router;