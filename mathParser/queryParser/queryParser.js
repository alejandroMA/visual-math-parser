'use strict';

const Node = require('../../structures/Node');
const getOuterScope = require('./getOuterScope');
const OuterScopeIterator = require('./outerScopeIterator');


let SYMBOLS_ORDERD = [
    {symbol: '-', priority: 1},
    {symbol: '+', priority: 1},
    {symbol: '*', priority: 2},
    {symbol: '/', priority: 2},
    {symbol: '^', priority: 3}
];


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
            if (start > end) {
                return Node(0);
            }

            let string = trimWhitSpaces(query.slice(start, end + 1));
            return Node(Number(string));
        }

        let rootNode = Node(query[symbolI]);
        rootNode.leftChild = queryParser(query, start, symbolI - 1);
        rootNode.rightChild = queryParser(query, symbolI + 1, end);

        return rootNode;
    }

    function findLowestPrioritySymbol() {
        let outerScopeIterator = OuterScopeIterator(query, start, end);

        let symbolI = -1;
        let priority = SYMBOLS_ORDERD.length + 1;

        for (let i = outerScopeIterator.length - 1; i >= 0; i--) {
            let index = outerScopeIterator[i];
            let char = query[index];
            if (charIsSymbol(char)) {
                let symbolPriority = getSymbolPriority(char);
                if (symbolPriority < priority) {
                    symbolI = index;
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

function queryParserImp(query) {
    let start = 0;
    let end = query.length - 1;
    return queryParser(query, start, end);
}

module.exports = queryParserImp;
