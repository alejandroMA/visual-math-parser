'use strict';

const Stack = require('../../structures/Stack');


function getInnerScopesList(query, start, end) {
    let bracesStack = Stack();
    let scopesList = [];

    for (let i = start; i <= end; i++) {
        if (query[i] === '(') {
            bracesStack.push(i);
        }

        if (query[i] === ')') {
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

    return scopesList;
}

module.exports = getInnerScopesList;
