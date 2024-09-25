const express = require('express');
const router = require('./routes');
const app = express();

router(app);

const port = 8081;
const server = app.listen(port, () => console.log(`Server listening on port ${port}`));

module.exports = server;