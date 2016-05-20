'use strict';

const StackUnderFlowError = require('./StackUnderFlowError');


function stack() {
    let _stack = [];

    return {
        push(data) {
            _stack.push(data);
        },
        pop() {
            if (_stack.length === 0) {
                throw new StackUnderFlowError();
            }

            return _stack.pop();
        },
        peek() {
            return _stack[_stack.length - 1];
        },
        isEmpty() {
            return (_stack.length === 0) ? true : false;
        },
        get size() {
            return _stack.length;
        }
    };
}

module.exports = stack;
