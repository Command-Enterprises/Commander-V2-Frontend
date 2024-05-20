const express = require('express');
const Unblocker = require('unblocker');
const pug = require('pug');

const app = express();

const unblockerConfig = {
    prefix: '/ub/',
    processContentTypes: [
        'text/html',
        'text/css',
        'text/javascript'
    ]
};

const unblocker = new Unblocker(unblockerConfig);

app.use(unblocker);

const data = {
    title: 'Google Docs'
};

app.get('/', (req, res) => {
    const pugCompiled = pug.compileFile('views/index.pug');
    res.send(pugCompiled({ data }));
});

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}!`);
}).on('upgrade', unblocker.onUpgrade);