'use strict';

const mathParser = require('../mathParser');
const TreeView = require('./TreeView');
const TreeAnimation = require('./TreeAnimation');
const FormComponent = require('./FormComponent');
const PlayPauseComponent = require('./PlayPauseComponent');


let container = document.querySelector('.container');
let treeAnimation = TreeAnimation();
let form = FormComponent();
let playPause = PlayPauseComponent();
let treeView = undefined;

playPause.deactivate();
container.appendChild(form.getDomNode());
container.appendChild(playPause.getDomNode());
treeView = TreeView(container);


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

    if ((query !== '') && !isNaN(result)) {
        treeAnimation.pause();
        treeView.clear();
        treeAnimation.clear();

        form.setResult(result);

        treeAnimation.newQuery(query);
        treeAnimation.play();

        playPause.setValue('play');
        playPause.activate();
    } else {
        form.setResult('Invalid expression!');
    }
});
