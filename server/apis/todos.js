'use strict';

const express = require(`express`);
const path = require(`path`);
const fs = require(`fs-extra`);
const todosApi = express.Router();

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '172.17.0.3', //ip de 'db'
    user: 'root',
    password: 'root',
    database: 'ListTodo'
});

todosApi.get(`/`, async(req, res) => {
    connection.query('SELECT * from Todos;', function(error, results) {
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

todosApi.post(`/`, async(req, res) => {
    let todo = req.body;
    connection.query('INSERT into Todos(label, idList, isDone) values(?,?,?);', [todo.label, todo.idList, false], function(error, results) {
        if (error) throw error;
        todo.id = results.insertId
        todo.isDone = false;
        res.json(todo);
    });
});

todosApi.put(`/:id`, async(req, res) => {
    let todoId = req.params.id;
    let todo = req.body;
    connection.query('Update Todos set label = ?, isDone = ? where id = ?;', [todo.label, todo.isDone, todoId], function(error, results) {
        if (error) throw error;
        res.json(todo);
    });
});

todosApi.delete(`/:id`, async(req, res) => {
    let todoId = req.params.id;
    connection.query('DELETE from Todos where id=?;', [todoId], function(error, results) {
        console.log("Tâche " + todoId + " supprimée.")
        res.json(results);
    });
});

module.exports = todosApi;