const mysql = require('mysql');


const pool = mysql.createPool({
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'ifind',
    password : 'T2qe6&9u',
    database : 'comsci_ifind',
    
});

module.exports = pool;