const express = require('express');
const router = require('./routes');
const app = express();
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000'
}));

router(app);

const port = 8081;
const server = app.listen(port, () => console.log(`Server listening on port ${port}`));

module.exports = server;