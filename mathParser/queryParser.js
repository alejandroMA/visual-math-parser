'use strict';

const Node = require('../structures/Node');
const Stack = require('../structures/Stack');


let SYMBOLS_ORDERD = [
    {symbol: '-', priority: 1},
    {symbol: '+', priority: 1},
    {symbol: '*', priority: 2},
    {symbol: '/', priority: 2},
    {symbol: '^', priority: 3}
];


function treeBuilder(query, start, end) {
    let scopesList = [];
    let outerScopeIterator = [];

    getInnerScopesList();
    getOuterScopeIterator();

    // console.log(start + ' ' + end);
    // console.log(scopesList);
    // console.log(outerScopeIterator);
    // console.log();

    return queryParser();

    function getInnerScopesList() {
        let bracesStack = Stack();
        scopesList = [];

        for (let i = start; i <= end; i++) {
            if (query[i] === '(') {
                bracesStack.push(i);
            } else if (query[i] === ')') {
                let start = bracesStack.pop();
                let end = i;

                if (bracesStack.isEmpty()) {
                    scopesList.push({
                        start: start,
                        end: end
                    });
                }
            }
        }

        if (scopesList.length === 1) {
            let realStart = start;
            let realEnd = end;

            for (let i = start; i < scopesList[0].start; i++) {
                if (query[i] === ' ') {
                    realStart += 1;
                }
            }

            for (let i = end; i > scopesList[0].end; i--) {
                if (query[i] === ' ') {
                    realEnd -= 1;
                }
            }

            if ((scopesList[0].start === realStart) && scopesList[0].end === realEnd) {
                start = realStart + 1;
                end = realEnd - 1;
                return getInnerScopesList(start, end);
            }
        }
    }

    function getOuterScopeIterator() {
        for (let i = start; i <= end; i++) {
            let isIndexinScope = false;
            for (let j = 0; j < scopesList.length; j++) {
                let scope = scopesList[j];
                // inOfScope
                if ((i >= scope.start) && (i <= scope.end)) {
                    isIndexinScope = true;
                } 
            }
            if (!isIndexinScope) {
                outerScopeIterator.push(i);
            }
        }
    }

    function queryParser() {
        let symbolI = findLowestPrioritySymbol();

        if (symbolI > -1) {
            let rootNode = Node(query[symbolI]);
            rootNode.leftChild = treeBuilder(query, start, symbolI - 1);
            rootNode.rightChild = treeBuilder(query, symbolI + 1, end);

            return rootNode;
        } else {
            if (start > end) {
                return Node(0);
            }

            let string = trimWhitSpaces(query.slice(start, end + 1));
            let number = Number(string);
            return Node(number);
        }
    }

    function findLowestPrioritySymbol() {
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
    return treeBuilder(query, start, end);
}

module.exports = queryParserImp;
