const bodyParser = require('body-parser');
const carro = require('./router/carro');
const marca = require('./router/marca');

module.exports = (app) => {
    app.use(
        bodyParser.json(),
        carro,
        marca
    )
};