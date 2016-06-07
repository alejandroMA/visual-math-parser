'use strict';

const mathParser = require('../mathParser');
const queryParser = require('../mathParser/queryParser');
const TreeView = require('./TreeView');
const TreeAnimation = require('./TreeAnimation');
const FormComponent = require('./FormComponent');
const PlayPauseComponent = require('./PlayPauseComponent');


let treeAnimation = TreeAnimation();
let container = document.querySelector('.container');
let form = FormComponent();
    container.appendChild(form.getDomNode());
let playPause = PlayPauseComponent();
    playPause.deactivate();
    container.appendChild(playPause.getDomNode());
let treeView = TreeView(container);


treeAnimation.onSetStep(function() {
    let tree = treeAnimation.getCurrentState();
    treeView.render(tree);
});

treeAnimation.onDone(function() {
    playPause.setValue('pause');
    playPause.deactivate();
});

playPause.onValueChange(function() {
    if (playPause.getValue() == 'play') {
        treeAnimation.play();
    } else if (playPause.getValue() == 'pause') {
        treeAnimation.pause();
    }
});

form.onButtonClick(function() {
    let query = '((3-(2/1))+((4.3+1)*5)+4*3-(2*5)) - 14';
    query = form.getQuery();
    let result = mathParser(query);
    // query = '(5+3)*(2-1)';
    // query = '2^8 * 4 - 20';
    console.log(query);
    console.log(result);
    console.log(!isNaN(result));
    if ((query !== '') && !isNaN(result)) {
        treeAnimation.pause();
        treeView.clear();
        treeAnimation.clear();

        treeAnimation.newQuery(query);
        treeAnimation.play();

        playPause.setValue('play');
        playPause.activate();
    }
});



// setTimeout(function() {
//     treeAnimation.pause();
//     setTimeout(function() {
//         treeAnimation.play();
//     }, 1000);
// }, 5000);
