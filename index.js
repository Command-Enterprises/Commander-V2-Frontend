const express = require('express');
const Unblocker = require('unblocker');
const pug = require('pug');
const Corrosion = require('corrosion');
const { createBareServer } = require('@tomphttp/bare-server-node');

const app = express();

const bare = createBareServer('/~/bare/');

const corrosion = new Corrosion({
    codec: 'xor',
    prefix: '/~/corrosion/'
});

const unblockerConfig = {
    prefix: '/~/unblocker/',
    processContentTypes: [
        'text/html',
        'text/css',
        'text/javascript'
    ]
};

const unblocker = new Unblocker(unblockerConfig);

app.use(unblocker);

app.get(corrosion.prefix, (req, res) => {
    corrosion.request(req, res);
});

app.get(corrosion.prefix + ':url', (req, res) => {
    corrosion.request(req, res);
});

app.get(bare.directory, (req, res) => {
    bare.routeRequest(req, res);
});

const data = {
    title: 'Google Docs'
};

app.get('/', (req, res) => {
    const pugCompiled = pug.compileFile('views/index.pug');
    res.send(pugCompiled({ data }));
});

app.use('/dynamic/', express.static('views/public/dynamic'));

app.use('/public/', express.static('views/public'));

app.use('/uv/', express.static('views/public/uv'));

app.get('/sw.js', (req, res) => res.sendFile('views/sw.js', { root: './' }));

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}!`);
}).on('upgrade', (req, socket, head) => {
    unblocker.onUpgrade();
    bare.routeUpgrade(req, socket, head);
    corrosion.upgrade(req, socket, head);
});