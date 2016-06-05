'use strict';

jest.unmock('../../../structures/Stack');
jest.unmock('../getInnerScopesList');
jest.unmock('../scopeIterator');

describe('scopeIterator', function() {
    const scopeIterator = require('../scopeIterator');
    let query;

    beforeEach(function() {
        query = null;
    });

    it('returns iterator for "(2+4) - (9*3) + (4/2)"', function() {
        query = '(2+4) - (9*3) + (4/2)';

        expect(scopeIterator(query, 0, query.length - 1))
        .toEqual([5, 6, 7, 13, 14, 15]);
    });

    it('freturns iterator for "((2+4)*(2-4)) + (2*4) * ((2-3)/0)"', function() {
        query = '((2+4)*(2-4)) + (2*4) * ((2-3)/0)';

        expect(scopeIterator(query, 0, query.length - 1))
        .toEqual([13, 14, 15, 21, 22, 23]);
    });

    it('freturns iterator for "( (((3+2) - 2) ))"', function() {
        query = '(((3+2) - 2) )';

        expect(scopeIterator(query, 0, query.length - 1))
        .toEqual([]);
    });

});
