'use strict';

const node = require('../structures/node');


function queryParser(query) {
    let SYMBOLS_ORDERD = ['-', '+', '/', '*', '^'];

    return parser(query);

    function parser(query) {
        query = trimWhitSpaces(query);

        let start = 0;
        let end = query.length;

        return queryParser(query, start, end);
    }

    function trimWhitSpaces(string) {
        return string.replace(/\s/g, '');
    }

    function queryParser(query, start, end) {
        let symbolI = findLowestPrioritySymbol(query, start, end);

        if (symbolI > -1) {
            let rootNode = node(query[symbolI]);
            rootNode.leftChild = queryParser(query, start, symbolI - 1);
            rootNode.rightChild = queryParser(query, symbolI + 1, end);

            return rootNode;
        } else {
            return node(query.slice(start, end + 1));
        }
    }

    function findLowestPrioritySymbol(query, start, end) {
        let symbolI = -1;
        let priority = SYMBOLS_ORDERD.length;

        for (let i = start; i < end; i++) {
            if (charIsSymbol(query[i])) {
                let symbolPriority = getSymbolPriority(query[i]);
                if (symbolPriority < priority) {
                    symbolI = i;
                    priority = symbolPriority;
                }
            }
        }

        return symbolI;
    }

    function charIsSymbol(char) {
        for (let i = 0; i < SYMBOLS_ORDERD.length; i++) {
            if (char === SYMBOLS_ORDERD[i]) {
                return true;
            }
        }

        return false;
    }

    function getSymbolPriority(symbol) {
        for (let i = 0; i < SYMBOLS_ORDERD.length; i++) {
            if (symbol === SYMBOLS_ORDERD[i]) {
                return i;
            }
        }

        return -1;
    }
}

module.exports = queryParser;
