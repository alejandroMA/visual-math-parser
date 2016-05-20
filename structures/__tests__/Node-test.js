'use strict';

jest.unmock('../Node');

describe('node', function() {
    it('returns a node object with the given data', function() {
        const Node = require('../Node');
        expect(Node('+')).toEqual({
            data: '+',
            leftChild: undefined,
            rightChild: undefined
        });
    });
});
