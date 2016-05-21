'use strict';

const getInnerScopesList = require('./getInnerScopesList');


function getOuterScope(query, start, end) {
    let range = {start: start, end: end};
    let innerScope = getInnerScopesList(query, start, end)[0] || undefined;

    if (innerScope) {
        trimWhiteSpaceBeforeInnerScope();
        trimWhiteSpaceAfterInnerScope();

        if (innerScopeEqualsRange()) {
            return getOuterScope(query, innerScope.start + 1, innerScope.end - 1);
        }
    }

    return {
        start: start,
        end: end
    };


    function trimWhiteSpaceBeforeInnerScope() {
        for (let i = start; i < innerScope.start; i++) {
            if (query[i] === ' ') {
                range.start += 1;
            }
        }
    }

    function trimWhiteSpaceAfterInnerScope() {
        for (let i = end; i > innerScope.end; i--) {
            if (query[i] === ' ') {
                range.end -= 1;
            }
        }
    }

    function innerScopeEqualsRange() {
        let startIsEqual = (innerScope.start === range.start);
        let endIsEqual = (innerScope.end === range.end);

        return startIsEqual && endIsEqual;
    }
}

module.exports = getOuterScope;
