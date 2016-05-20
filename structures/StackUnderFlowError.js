'use strict';

function StackUnderFlowError(message) {
    if (!(this instanceof StackUnderFlowError)) {
        return new StackUnderFlowError();
    }

    this.name = 'StackUnderFlowError';
    this.message = (message || 'StackUnderFlow');
}
StackUnderFlowError.prototype = Error.prototype;

module.exports = StackUnderFlowError;
