const express = require(`express`);
const bodyParser = require(`body-parser`);
const path = require(`path`);
const fs = require(`fs-extra`);
const app = express();
const port = 3001;
const api = require(`./apis/index.js`);
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '172.17.0.3', //ip de 'db'
    user: 'root',
    password: 'root',
    database: 'ListTodo'
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(`/api`, api);

app.all(`*`, async(req, res, next) => {
    if (req.originalUrl.indexOf(`/api`) !== 0) {
        const fileRelativePath = req.originalUrl === `/` ? `/index.html` : req.originalUrl;
        let filePath = path.resolve(__dirname, `../client/dist${fileRelativePath}`);
        if (!(await fs.exists(filePath))) {
            filePath = path.resolve(__dirname, `../client/dist/index.html`);
        }
        return res.sendFile(filePath);
    }

    next();
});

app.all(`*`, (req, res) => {
    res.status(404);
    res.end(`Page not found : ${req.originalUrl}`);
});

app.listen(port, () => console.log(`Todos API listening on port ${port}`));