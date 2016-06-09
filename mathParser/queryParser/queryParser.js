'use strict';

const Node = require('../../structures/Node');
const getOuterScope = require('./getOuterScope');
const scopeIterator = require('./scopeIterator');


let OPERATORS_ORDERD = [
    {operator: '-', priority: 1},
    {operator: '+', priority: 1},
    {operator: '*', priority: 2},
    {operator: '/', priority: 2},
    {operator: '^', priority: 3}
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
        let operatorI = findLowestPriorityOperator();

        if (operatorI === -1) {
            let string = query.slice(start, end + 1);
            return Node(Number(string));
        }

        let rootNode = Node(query[operatorI]);
        rootNode.leftChild = queryParser(query, start, operatorI - 1);
        rootNode.rightChild = queryParser(query, operatorI + 1, end);

        return rootNode;
    }

    function findLowestPriorityOperator() {
        let outerScopeIterator = scopeIterator(query, start, end);

        let operatorI = -1;
        let priority = OPERATORS_ORDERD.length + 1;

        for (let i = outerScopeIterator.length - 1; i >= 0; i--) {
            let index = outerScopeIterator[i];

            if (isCharAtIndexAnOperator(index)) {
                let operator = query[index];
                let operatorPriority = getOperatorPriority(operator);

                if (operatorPriority < priority) {
                    operatorI = index;
                    priority = operatorPriority;
                }
            }
        }

        return operatorI;
    }

    function isCharAtIndexAnOperator(index) {
        if (query[index] === '-') {
            return isCharAtIndexMinusOperator(index);
        }

        for (let i = 0; i < OPERATORS_ORDERD.length; i++) {
            let operator = OPERATORS_ORDERD[i];

            if (query[index] === operator.operator) {
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

    function getOperatorPriority(operator) {
        for (let i = 0; i < OPERATORS_ORDERD.length; i++) {
            if (operator === OPERATORS_ORDERD[i].operator) {
                return OPERATORS_ORDERD[i].priority;
            }
        }

        return -1;
    }
}


module.exports = queryParserImp;
