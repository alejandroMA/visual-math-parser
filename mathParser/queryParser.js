'use strict';

const Node = require('../structures/Node');


function queryParser(query) {
    let SYMBOLS_ORDERD = [
        {symbol: '-', priority: 1},
        {symbol: '+', priority: 1},
        {symbol: '*', priority: 2},
        {symbol: '/', priority: 2},
        {symbol: '^', priority: 3}
    ];

    let start = 0;
    let end = query.length;

    return queryParser(start, end);

    function queryParser(start, end) {
        let symbolI = findLowestPrioritySymbol(start, end);

        if (symbolI > -1) {
            let rootNode = Node(query[symbolI]);
            rootNode.leftChild = queryParser(start, symbolI - 1);
            rootNode.rightChild = queryParser(symbolI + 1, end);

            return rootNode;
        } else {
            let string = trimWhitSpaces(query.slice(start, end + 1));
            let number = Number(string);
            return Node(number);
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

    function trimWhitSpaces(string) {
        return string.replace(/\s/g, '');
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
