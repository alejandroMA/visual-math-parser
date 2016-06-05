'use strict';

jest.unmock('../Stack');
jest.unmock('../StackUnderFlowError');

describe('Stack', function() {
    const Stack = require('../Stack');
    const StackUnderFlowError = require('../StackUnderFlowError');
    let stack;

    beforeEach(function() {
        stack = Stack();
        stack.push(2);
        stack.push(5);
    });

    it('can peek, push, pop', function() {
        expect(stack.peek()).toBe(5);
        expect(stack.pop()).toBe(5);
        expect(stack.pop()).toBe(2);
    });

    it('it has size', function() {
        expect(stack.size).toBe(2);
    });

    it('can can check for emptyness', function() {
        expect(stack.isEmpty()).toBe(false);
        stack.pop();
        stack.pop();
        expect(stack.isEmpty()).toBe(true);
    });

    it('throws on underflow', function() {
        stack.pop();
        stack.pop();

        expect(stack.pop).toThrowError(StackUnderFlowError);
    });
});
