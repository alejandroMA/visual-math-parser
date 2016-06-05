'use strict';

const queryParser = require('./queryParser');
const treeSolver = require('./treeSolver');

function mathParser(query) {
    let tree = queryParser(query);
    let result = treeSolver(tree);

    return result;
}

module.exports = mathParser;
