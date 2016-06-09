'use strict';


function treeSolver(tree) {
    if ((tree.leftChild === undefined) && (tree.rightChild === undefined)) {
        let number = tree.data;
        return number;
    }

    let operator = tree.data;
    let leftNumber = treeSolver(tree.leftChild);
    let rightNumber = treeSolver(tree.rightChild);

    return mathOperation(operator, rightNumber, leftNumber);
}

function mathOperation(operator, rightNumber, leftNumber) {
    let result = undefined;

    switch (operator) {
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

module.exports = treeSolver;
