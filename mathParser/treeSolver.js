'use strict';


function treeSolver(tree) {
    if ((tree.leftChild === undefined) && (tree.rightChild === undefined)) {
        let number = tree.data;
        return number;
    }

    let symbol = tree.data;
    let leftNumber = treeSolver(tree.leftChild);
    let rightNumber = treeSolver(tree.rightChild);

    return mathOperation(symbol, rightNumber, leftNumber);
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

module.exports = treeSolver;
