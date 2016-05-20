'use strict';

jest.unmock('../treeSolver');
jest.unmock('../queryParser');
jest.unmock('../../structures/Node');

describe('treeSolver', function() {
    const treeSolver = require('../treeSolver');
    const queryParser = require('../queryParser');
    let tree;

    beforeEach(function() {
        tree = undefined;
    });

    it('resolves tree from "2+4*12/3-1"', function() {
        tree = queryParser('2+4*12/3-1');

        expect(treeSolver(tree)).toEqual(17);
    });

    it('resolves tree from "2^8 * 4 - 20"', function() {
        tree = queryParser('2^8 * 4 - 20');

        expect(treeSolver(tree)).toEqual(1004);
    });
});
