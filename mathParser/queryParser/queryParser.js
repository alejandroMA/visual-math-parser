'use strict';

const Node = require('../../structures/Node');
const getOuterScope = require('./getOuterScope');
const OperatorsHandler = require('./OperatorsHandler');
const prepareQuery = require('./prepareQuery');


function queryParserImp(query) {
    query = prepareQuery(query);
    let start = 0;
    let end = query.length - 1;

    return queryParser(query, start, end);
}

function queryParser(query, start, end) {
    ajustRangeToOuterScope();
    let tree = buildTree();

    return tree;


    function ajustRangeToOuterScope() {
        let outerScope = getOuterScope(query, start, end);
        start = outerScope.start;
        end = outerScope.end;
    }

    function buildTree() {
        let operatorsHandler = OperatorsHandler(query, start, end);
        let operatorI = operatorsHandler.findLowestPriorityOperator();

        if (operatorI === -1) {
            let string = query.slice(start, end + 1);
            return Node(Number(string));
        }

        let rootNode = Node(query[operatorI]);
        rootNode.leftChild = queryParser(query, start, operatorI - 1);
        rootNode.rightChild = queryParser(query, operatorI + 1, end);

        return rootNode;
    }
}


module.exports = queryParserImp;
