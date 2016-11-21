'use strict';

var path = require('path');


module.exports = {
    entry: './app/app.js',
    output: {
        path: path.join(__dirname, '/static/'),
        filename: 'app.min.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: [/node_modules/, /bower_components/, /vendor/],
                loader: 'babel',
                query: {
                    presets: ['es2015'],
                    cacheDirectory: true
                }
            }
        ]
    }
};
