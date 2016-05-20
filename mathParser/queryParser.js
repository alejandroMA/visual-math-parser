'use strict';

const node = require('../structures/node');


function queryParser(query) {
    let SYMBOLS_ORDERD = [
        {symbol: '-', priority: 1},
        {symbol: '+', priority: 1},
        {symbol: '*', priority: 2},
        {symbol: '/', priority: 2},
        {symbol: '^', priority: 3}
    ];
    query = trimWhitSpaces(query);

    let start = 0;
    let end = query.length;

    return queryParser(start, end);


    function trimWhitSpaces(string) {
        return string.replace(/\s/g, '');
    }

    function queryParser(start, end) {
        let symbolI = findLowestPrioritySymbol(start, end);

        if (symbolI > -1) {
            let rootNode = node(query[symbolI]);
            rootNode.leftChild = queryParser(start, symbolI - 1);
            rootNode.rightChild = queryParser(symbolI + 1, end);

            return rootNode;
        } else {
            let number = Number(query.slice(start, end + 1));
            return node(number);
        }
    }

    function findLowestPrioritySymbol(start, end) {
        let symbolI = -1;
        let priority = SYMBOLS_ORDERD.length + 1;

        for (let i = end; i >= start; i--) {
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
            if (char === SYMBOLS_ORDERD[i].symbol) {
                return true;
            }
        }

        return false;
    }

    function getSymbolPriority(symbol) {
        for (let i = 0; i < SYMBOLS_ORDERD.length; i++) {
            if (symbol === SYMBOLS_ORDERD[i].symbol) {
                return SYMBOLS_ORDERD[i].priority;
            }
        }

        return -1;
    }
}

module.exports = queryParser;
