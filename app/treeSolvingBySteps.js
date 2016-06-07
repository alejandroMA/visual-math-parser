'use strict';

function treeSolverBySteps(_tree) {
    let steps = [];

    steps.push(copyObject(_tree));
    treeSolver(_tree);

    return steps;

    function treeSolver(tree) {
        if ((tree.leftChild === undefined) && (tree.rightChild === undefined)) {
            return tree.data;
        }

        let symbol = tree.data;
        let leftNumber = treeSolver(tree.leftChild);
        let rightNumber = treeSolver(tree.rightChild);

        tree.leftChild = undefined;
        tree.rightChild = undefined;
        tree.data = mathOperation(symbol, rightNumber, leftNumber);

        steps.push(copyObject(_tree));

        return tree.data;
    }
}

function copyObject(obj) {
    if (typeof(obj) === 'object') {
        let clone = {};
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                clone[prop] = copyObject(obj[prop]);
            }
        }

        return clone;
    } else {
        return obj;
    }
}


function mathOperation(symbol, rightNumber, leftNumber) {
    let result = undefined;

    switch (symbol) {
        case '+':
            result = leftNumber + rightNumber;
            break;
        case '-':
            result = leftNumber - rightNumber;
            break;
        case '*':
            result = leftNumber * rightNumber;
            break;
        case '/':
            result = leftNumber / rightNumber;
            break;
        case '^':
            result = Math.pow(leftNumber, rightNumber);
            break;
    }

    return result;
}

module.exports = treeSolverBySteps;
