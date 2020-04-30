'use strict';

const express = require(`express`);
const path = require(`path`);
const fs = require(`fs-extra`);
const api = express.Router();

async function defineApis() {
    const testApi = require(`./test.js`);
    api.use(`/test`, testApi);
    if (await fs.exists(path.resolve(__dirname, `lists.js`))) {
        const listsApi = require(`./lists.js`);
        try {
            api.use(`/lists`, listsApi);
        } catch (e) {
            console.log(`Invalid lists API : `, e);
        }
    }
    if (await fs.exists(path.resolve(__dirname, `todos.js`))) {
        const todosApi = require(`./todos.js`);
        try {
            api.use(`/todos`, todosApi);
        } catch (e) {
            console.log(`Invalid todos API : `, e);
        }
    }

    if (await fs.exists(path.resolve(__dirname, `../_apis/`, `lists.js`))) {
        const listsApi = require(`../_apis/lists.js`);
        try {
            api.use(`/lists`, listsApi);
        } catch (e) {}
    }
    if (await fs.exists(path.resolve(__dirname, `../_apis/`, `todos.js`))) {
        const todosApi = require(`../_apis/todos.js`);
        try {
            api.use(`/todos`, todosApi);
        } catch (e) {}
    }
}

defineApis();

module.exports = api;