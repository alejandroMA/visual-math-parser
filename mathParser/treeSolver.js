'use strict';


function treeSolver(tree) {
    if ((tree.leftChild !== undefined) && (tree.rightChild !== undefined)) {
        let symbol = tree.data;
        let leftNumber = treeSolver(tree.leftChild);
        let rightNumber = treeSolver(tree.rightChild);

        return mathOperation(symbol, rightNumber, leftNumber);
    } else {
        return tree.data;
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

module.exports = treeSolver;
