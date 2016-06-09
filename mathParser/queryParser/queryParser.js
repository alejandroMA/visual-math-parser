'use strict';

const Node = require('../../structures/Node');
const getOuterScope = require('./getOuterScope');
const scopeIterator = require('./scopeIterator');


let SYMBOLS_ORDERD = [
    {symbol: '-', priority: 1},
    {symbol: '+', priority: 1},
    {symbol: '*', priority: 2},
    {symbol: '/', priority: 2},
    {symbol: '^', priority: 3}
];


function queryParserImp(query) {
    query = trimWhitSpaces(query);

    let start = 0;
    let end = query.length - 1;
    return queryParser(query, start, end);
}

function trimWhitSpaces(string) {
    return string.replace(/\s/g, '');
}

function queryParser(query, start, end) {
    ajustRangeToOuterScope();

    return buildTree();


    function ajustRangeToOuterScope() {
        let outerScope = getOuterScope(query, start, end);
        start = outerScope.start;
        end = outerScope.end;
    }

    function buildTree() {
        let symbolI = findLowestPrioritySymbol();

        if (symbolI === -1) {
            let string = query.slice(start, end + 1);
            return Node(Number(string));
        }

        let rootNode = Node(query[symbolI]);
        rootNode.leftChild = queryParser(query, start, symbolI - 1);
        rootNode.rightChild = queryParser(query, symbolI + 1, end);

        return rootNode;
    }

    function findLowestPrioritySymbol() {
        let outerScopeIterator = scopeIterator(query, start, end);

        let symbolI = -1;
        let priority = SYMBOLS_ORDERD.length + 1;

        for (let i = outerScopeIterator.length - 1; i >= 0; i--) {
            let index = outerScopeIterator[i];

            if (isCharAtIndexAnOperator(index)) {
                let operator = query[index];
                let symbolPriority = getSymbolPriority(operator);

                if (symbolPriority < priority) {
                    symbolI = index;
                    priority = symbolPriority;
                }
            }
        }

        return symbolI;
    }

    function isCharAtIndexAnOperator(index) {
        if (query[index] === '-') {
            return isCharAtIndexMinusOperator(index);
        }

        for (let i = 0; i < SYMBOLS_ORDERD.length; i++) {
            let operator = SYMBOLS_ORDERD[i];

            if (query[index] === operator.symbol) {
                return true;
            }
        }

        return false;
    }

    function isCharAtIndexMinusOperator(index) {
        // "-" duality as operator and part of a negative number
        if (query[index] !== '-') {
            return false;
        }

        if (index === start) {
            return false;
        } else if (isCharAtIndexAnOperator(index - 1)) {
            return false;
        }

        return true;
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


module.exports = queryParserImp;
