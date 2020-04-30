'use strict';

const express = require(`express`);
const path = require(`path`);
const fs = require(`fs-extra`);
const listsApi = express.Router();

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '172.17.0.3', //ip de 'db'
    user: 'root',
    password: 'root',
    database: 'ListTodo'
});

listsApi.get(`/`, async(req, res) => {
    connection.query('SELECT * from Listes;', function(error, results) {
        if (error) throw error;
        res.json(results);
    });
});

listsApi.post(`/`, async(req, res) => {
    let liste = req.body;
    connection.query('INSERT into Listes(label, description) values(?,?);', [liste.label, liste.description], function(error, results) {
        if (error) throw error;
        liste.id = results.insertId
        res.json(liste);
    });
});

listsApi.put(`/:id`, async(req, res) => {
    let listeId = req.params.id;
    let liste = req.body;
    connection.query('Update Listes set label = ?, description = ? where id = ?;', [liste.label, liste.description, listeId], function(error, results) {
        if (error) throw error;
        res.json(liste);
    });
});

module.exports = listsApi;