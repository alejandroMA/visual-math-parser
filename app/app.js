'use strict';

const mathParser = require('../mathParser');
const queryParser = require('../mathParser/queryParser');
const TreeView = require('./treeView');

let container = document.querySelector('.container');
let svg = document.createElement('svg');


container.appendChild(svg);

let treeView = TreeView(svg);

let bTree = queryParser('((3-(2/1))+((4+1)*5)+4*3-(2*5)) - 14');
// console.log(binaryTreeToTree(bTree));

treeView.render(binaryTreeToTree(bTree));

// setTimeout(function() {
//     bTree = queryParser('(8)*(2-1)');
//     treeView.render(binaryTreeToTree(bTree));
// }, 1500);

// setTimeout(function() {
//     bTree = queryParser('(8)*(1)');
//     treeView.render(binaryTreeToTree(bTree));
// }, 3000);


// setTimeout(function() {
//     bTree = queryParser('8');
//     treeView.render(binaryTreeToTree(bTree));
// }, 4500);


function binaryTreeToTree(binaryTree) {
    if (binaryTree === undefined) {
        return;
    }

    if (binaryTree.leftChild !== undefined && binaryTree.rightChild !== undefined) {
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
