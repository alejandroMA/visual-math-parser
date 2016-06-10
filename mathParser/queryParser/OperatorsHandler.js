'use strict';

const scopeIterator = require('./scopeIterator');


let OPERATORS_ORDERD = [
    {operator: '-', priority: 1},
    {operator: '+', priority: 1},
    {operator: '*', priority: 2},
    {operator: '/', priority: 2},
    {operator: '^', priority: 3}
];


function OperatorsHandler(query, start, end) {

    let findLowestPriorityOperator = function() {
        let outerScopeIterator = scopeIterator(query, start, end);

        let operatorI = -1;
        let priority = OPERATORS_ORDERD.length + 1;

        for (let j = outerScopeIterator.length - 1; j >= 0; j--) {
            let index = outerScopeIterator[j];

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
    };

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

    return {
        findLowestPriorityOperator,
        isCharAtIndexAnOperator,
        getOperatorPriority
    };
}


module.exports = OperatorsHandler;
