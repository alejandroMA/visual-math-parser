'use strict';


function treeBuildingBySteps(_tree) {
    let steps = [];

    steps.push(copyObject(_tree));
    treeSolver(_tree);

    steps.reverse();
    return steps;

    function treeSolver(tree) {
        if ((tree.leftChild === undefined) && (tree.rightChild === undefined)) {
            return;
        }
        
        treeSolver(tree.rightChild);
        tree.rightChild = undefined;
        steps.push(copyObject(_tree));

        treeSolver(tree.leftChild);
        tree.leftChild = undefined;
        steps.push(copyObject(_tree));

        return;
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

module.exports = treeBuildingBySteps;
