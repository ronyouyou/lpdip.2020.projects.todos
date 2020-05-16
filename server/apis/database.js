'use strict';

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'db', //ip de 'db'
    user: 'root',
    password: 'root',
    database: 'ListTodo',
    port: '3306'
});

module.exports = connection;