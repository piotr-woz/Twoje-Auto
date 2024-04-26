const path = require('path');

module.exports = {
    entry: './js/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './js'),
    },
}

// npm init -y
// npm install webpack webpack-cli --save-dev
// npm run build

// npm install - przywrócenie katalogu "node_modules"