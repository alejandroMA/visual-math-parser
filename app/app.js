'use strict';

const mathParser = require('../mathParser');
const queryParser = require('../mathParser/queryParser');
const TreeView = require('./treeView');

let container = document.querySelector('.container');
let svg = document.createElement('svg');


container.appendChild(svg);

let treeView = TreeView(svg);

let bTree = queryParser('(5+3)*(2-1)');
// console.log(binaryTreeToTree(bTree));

treeView.render(binaryTreeToTree(bTree));

setTimeout(function() {
    bTree = queryParser('(8)*(2-1)');
    treeView.render(binaryTreeToTree(bTree));
}, 1500);

setTimeout(function() {
    bTree = queryParser('(8)*(1)');
    treeView.render(binaryTreeToTree(bTree));
}, 3000);


setTimeout(function() {
    bTree = queryParser('8');
    treeView.render(binaryTreeToTree(bTree));
}, 4500);

// treeView.render({
//         'data': '-',
//         'children': [
//             {
//                 'data': '+',
//                 'children': [
//                     {
//                         'data': '5'
//                     },
//                     {
//                         'data': '2'
//                     }
//                 ]
//             },
//             {
//                 'data': '*',
//                 'children': [
//                     {
//                         'data': '2'
//                     },
//                     {
//                         'data': '6'
//                     }
//                 ]
//             }
//         ]
//     });

// setTimeout(function() {
//     treeView.render({
//         'data': '-',
//         'children': [
//             {
//                 'data': '7'
//             },
//             {
//                 'data': '12'
//             }
//         ]
//     });

// }, 2000);


// setTimeout(function() {
//     treeView.render({
//         'data': '-5'
//     });

// }, 4000);


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
