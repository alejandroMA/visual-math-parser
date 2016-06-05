'use strict';

const getInnerScopesList = require('./getInnerScopesList');


function getOuterScope(query, start, end) {
    let range = {start: start, end: end};
    let firstInnerScope = getInnerScopesList(query, start, end)[0] || undefined;

    if (firstInnerScope) {
        trimRangeWhiteSpaceBeforefirstInnerScope();
        trimRangeWhiteSpaceAfterFirtsInnerScope();

        if (firstInnerScopeEqualsRange()) {
            return getOuterScope(
                query,
                firstInnerScope.start + 1,
                firstInnerScope.end - 1
            );
        }
    }

    return {
        start: start,
        end: end
    };


    function trimRangeWhiteSpaceBeforefirstInnerScope() {
        for (let i = start; i < firstInnerScope.start; i++) {
            if (query[i] === ' ') {
                range.start += 1;
            }
        }
    }

    function trimRangeWhiteSpaceAfterFirtsInnerScope() {
        for (let i = end; i > firstInnerScope.end; i--) {
            if (query[i] === ' ') {
                range.end -= 1;
            }
        }
    }

    function firstInnerScopeEqualsRange() {
        let startIsEqual = (firstInnerScope.start === range.start);
        let endIsEqual = (firstInnerScope.end === range.end);

        return startIsEqual && endIsEqual;
    }
}

module.exports = getOuterScope;
