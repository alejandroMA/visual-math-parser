'use strict';

jest.unmock('../node');

describe('node', function() {
    it('returns a node object with the given data', function() {
        const node = require('../node');
        expect(node('+')).toEqual({
            data: '+',
            leftChild: undefined,
            rightChild: undefined
        });
    });
});
