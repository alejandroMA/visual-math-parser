'use strict';

jest.unmock('../../../structures/Stack');
jest.unmock('../getInnerScopesList');

describe('getInnerScopesList', function() {
    const getInnerScopesList = require('../getInnerScopesList');
    let query;

    beforeEach(function() {
        query = null;
    });

    it('list inner scopes in "(2+4) - (9*3) + (4/2)"', function() {
        query = '(2+4) - (9*3) + (4/2)';

        expect(getInnerScopesList(query, 0, query.length - 1))
        .toEqual([
            { start: 0, end: 4 },
            { start: 8, end: 12 },
            { start: 16, end: 20 }
        ]);
    });

    it('list inner scopes in " ((2+4) - (5*7)) "', function() {
        query = ' ((2+4) - (5*7)) ';

        expect(getInnerScopesList(query, 0, query.length - 1))
        .toEqual([
            { start: 1, end: 15 }
        ]);
    });

    it('list inner scopes in "((2+4)*(2-4)) + (2*4) * ((2-3)/0)"', function() {
        query = '((2+4)*(2-4)) + (2*4) * ((2-3)/0)';

        expect(getInnerScopesList(query, 0, query.length - 1))
        .toEqual([
            { start: 0, end: 12 },
            { start: 16, end: 20 },
            { start: 24, end: 32 }
        ]);
    });

});
