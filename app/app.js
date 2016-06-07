'use strict';

const mathParser = require('../mathParser');
const queryParser = require('../mathParser/queryParser');
const TreeView = require('./treeView');
const treeSolvingBySteps = require('./treeSolvingBySteps');
const treeBuildingBySteps = require('./treeBuildingBySteps');


let container = document.querySelector('.container');
let treeView = TreeView(container);

let query = '((3-(2/1))+((4.3+1)*5)+4*3-(2*5)) - 14';
// query = '(5+3)*(2-1)';
// query = '2^8 * 4 - 20';

let steps = treeBuildingBySteps(queryParser(query));
steps = steps.concat(treeSolvingBySteps(queryParser(query)));

treeView.render(steps[0]);

let duration = 500;
let step = 0;
let interval = setInterval(update, duration);


function update() {
    if (step >= steps.length) {
        clearInterval(interval);
        return;
    }

    treeView.render(binaryTreeToTree(steps[step]));
    step++;
}


function binaryTreeToTree(binaryTree) {
    if (binaryTree === undefined) {
        return;
    }

    if (binaryTree.leftChild !== undefined || binaryTree.rightChild !== undefined) {
        binaryTree.children = [];
    }
    
    if (binaryTree.leftChild !== undefined) {
        binaryTreeToTree(binaryTree.leftChild);
        binaryTree.children.push(binaryTree.leftChild);
    }

    if (binaryTree.rightChild !== undefined) {
        binaryTreeToTree(binaryTree.rightChild);
        binaryTree.children.push(binaryTree.rightChild);
    }

    return binaryTree;

}
