'use strict';

jest.unmock('../../../structures/Stack');
jest.unmock('../getInnerScopesList');
jest.unmock('../getOuterScope');

describe('getOuterScope', function() {
    const getOuterScope = require('../getOuterScope');
    let query;

    beforeEach(function() {
        query = null;
    });

    it('finds outer scope in "(2+4) - (9*3) + (4/2)"', function() {
        query = '(2+4) - (9*3) + (4/2)';

        expect(getOuterScope(query, 0, query.length - 1))
        .toEqual({
            start: 0,
            end: query.length - 1
        });
    });

    it('finds outer scope in " ((2+4) - (5*7)) "', function() {
        query = ' ((2+4) - (5*7)) ';

        expect(getOuterScope(query, 0, query.length - 1))
        .toEqual({
            start: 2,
            end: query.length - 1 - 2
        });
    });

    it('finds outer scope in "( (((3+2) - 2) ))"', function() {
        query = '( (((3+2) - 2) ))';

        expect(getOuterScope(query, 0, query.length - 1))
        .toEqual({
            start: 4,
            end: query.length - 1 - 4
        });
    });

});
