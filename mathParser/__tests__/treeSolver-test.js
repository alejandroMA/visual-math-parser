'use strict';

jest.disableAutomock();

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

    it('resolves tree from "((3-(2/1))+((4+1)*5)+4*3-(2*5)) - 14"', function() {
        tree = queryParser('((3-(2/1))+((4+1)*5)+4*3-(2*5)) - 14');

        expect(treeSolver(tree)).toEqual(14);
    });

    it('resolves tree from "-4 + 20"', function() {
        tree = queryParser('-4 + 20');

        expect(treeSolver(tree)).toEqual(16);
    });

    it('resolves tree from "-3 + (-4+5) + (-20+50)"', function() {
        tree = queryParser('-3 + (-4+5) + (-20+50)');

        expect(treeSolver(tree)).toEqual(28);
    });
});
