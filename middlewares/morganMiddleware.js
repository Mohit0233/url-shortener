const morgan = require("morgan");
const chalk = require("chalk");

module.exports = morgan(function (tokens, req, res) {
    const status = tokens.status(req, res);
    const statusColor = status >= 500
        ? 'red' : status >= 400
            ? 'yellow' : status >= 300
                ? 'cyan' : 'green';

    const methodColor = (method) => {
        switch (method) {
            case 'GET':
                return 'green';
            case 'POST':
                return 'magenta';
            case 'DELETE':
                return 'red';
            case 'PUT':
                return 'blue';
            case 'HEAD':
                return 'grey';
            default:
                return 'white';
        }
    }

    return chalk[methodColor(tokens.method(req, res))](padRight(tokens.method(req, res), 8))
        + ' ' + chalk.reset(padRight(tokens.url(req, res), 30))
        + ' ' + chalk[statusColor](status)
        + ' ' + chalk.reset(padLeft(tokens['response-time'](req, res) + ' ms', 8))
        + ' ' + chalk.reset('-')
        + ' ' + chalk.reset(tokens.res(req, res, 'content-length') || '-')
        + ' ' + chalk.reset('length')
});


function padLeft(str, len) {
    return len > str.length
        ? (new Array(len - str.length + 1)).join(' ') + str
        : str
}

function padRight(str, len) {
    return len > str.length
        ? str + (new Array(len - str.length + 1)).join(' ')
        : str
}

