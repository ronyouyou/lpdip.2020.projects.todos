'use strict';

const express = require(`express`);
const todosApi = express.Router();
const connection = require('./database.js');

todosApi.get(`/`, async (req, res) => {
    connection.query('SELECT * from Todos;', function (error, results) {
        if (error) throw error;
        results.forEach(todo => {
            if (todo.isDone == 0) {
                todo.isDone = false;
            } else {
                todo.isDone = true;
            }
        });
        res.json(results);
    });
});

todosApi.post(`/`, async (req, res) => {
    connection.query('INSERT into Todos(label, idList, isDone) values(?,?,?);', [req.body.label, req.body.idList, false], function (error, results) {
        if (error) throw error;
        req.body.id = results.insertId
        req.body.isDone = false;
        res.json(req.body);
    });
});

todosApi.put(`/:id`, async (req, res) => {
    connection.query('Update Todos set label = ?, isDone = ? where id = ?;', [req.body.label, req.body.isDone, req.params.id], function (error, results) {
        if (error) throw error;
        res.json(req.body);
    });
});

todosApi.delete(`/:id`, async (req, res) => {
    connection.query('DELETE from Todos where id=?;', [req.params.id], function (error, results) {
        res.json(results);
    });
});

module.exports = todosApi;