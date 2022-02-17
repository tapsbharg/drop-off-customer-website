const { parse } = require('url');
const express = require('express');
const next = require('next');

const env = process.env.NODE_ENV || 'development';
const port = parseInt(process.env.PORT, 10) || 3000;
const app = next({ dev: env === 'development' });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('*', (req, res) => {
    handle(req, res, parse(req.url, true));
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.info(`> Ready on port ${port}`);
  });
});