'use strict';

const getInnerScopesList = require('./getInnerScopesList');


function OuterScopeIterator(query, start, end) {
    let innerScopesList = getInnerScopesList(query, start, end);
    let outerScopeIterator = [];

    for (let i = start; i <= end; i++) {
        if (!isIndexinInnerScopes(i)) {
            outerScopeIterator.push(i);
        }
    }

    return outerScopeIterator;


    function isIndexinInnerScopes(index) {
        for (let i = 0; i < innerScopesList.length; i++) {
            if (isIndexInScope(index, innerScopesList[i])) {
                return true;
            } 
        }
        return false;
    }

    function isIndexInScope(index, scope) {
        return (index >= scope.start) && (index <= scope.end);
    }
}


module.exports = OuterScopeIterator;
