'use strict';

const express = require(`express`);
const listsApi = express.Router();
const connection = require('./database.js');

listsApi.get(`/`, async (req, res) => {
    connection.query('SELECT * from Listes;', function (error, results) {
        if (error) throw error;
        res.json(results);
    });
});

listsApi.post(`/`, async (req, res) => {
    connection.query('INSERT into Listes(label, description) values(?,?);', [req.body.label, req.body.description], function (error, results) {
        if (error) throw error;
        req.body.id = results.insertId
        res.json(req.body);
    });
});

listsApi.put(`/:id`, async (req, res) => {
    connection.query('Update Listes set label = ?, description = ? where id = ?;', [req.body.label, req.body.description, req.params.id], function (error, results) {
        if (error) throw error;
        res.json(req.body);
    });
});

module.exports = listsApi;