'use strict';

const mathParser = require('../mathParser');
const TreeView = require('./TreeView');
const TreeAnimation = require('./TreeAnimation');
const FormComponent = require('./FormComponent');
const SliderComponent = require('./SliderComponent');
const PlayPauseComponent = require('./PlayPauseComponent');
const debounce = require('./debounce');

let container = document.querySelector('.app');
let treeAnimation = TreeAnimation();
let form = FormComponent();
let controlsContainer = document.createElement('div');
let slider = SliderComponent();
let playPause = PlayPauseComponent();
let treeView = undefined;

playPause.deactivate();
slider.disable();

container.appendChild(form.getDomNode());
controlsContainer.className = 'controls-container';
controlsContainer.appendChild(playPause.getDomNode());
controlsContainer.appendChild(slider.getDomNode());
container.appendChild(controlsContainer);
treeView = TreeView(container);

form.onButtonClick(function() {
    let query = '((3-(2/1))+((4.3+1)*5)+4*3-(2*5)) - 14';
    query = form.getQuery();
    let result = mathParser(query);

    if (query !== '' && !isNaN(result)) {
        form.setResult(result);

        treeAnimation.pause();
        treeView.clear();
        treeAnimation.clear();

        treeAnimation.newQuery(query);

        slider.updateOptions(
            {
                range: {
                    min: 1,
                    max: treeAnimation.getStepsLenght()
                }
            },
            false
        );
        slider.set(treeAnimation.getStep() + 1);
        slider.enable();

        playPause.setValue('pause');
        playPause.activate();

        treeAnimation.play();
    } else {
        form.setResult('Invalid expression!');
    }
});

const debouncedSetStep = debounce(step => {
    if (step !== treeAnimation.getStep()) {
        treeAnimation.setStep(step);
    }
}, 100);

treeAnimation.onSetStep(function() {
    let tree = treeAnimation.getCurrentState();
    slider.set(treeAnimation.getStep() + 1);
    treeView.render(tree);
});

treeAnimation.onDone(function() {
    if (playPause.getValue() !== 'play') {
        playPause.setValue('play');
    }
});
treeAnimation.onPause(function() {
    if (playPause.getValue() !== 'play') {
        playPause.setValue('play');
    }
});
treeAnimation.onPlay(function() {
    if (playPause.getValue() !== 'pause') {
        playPause.setValue('pause');
    }
});

slider.onStart(function() {
    treeAnimation.pause();
});
slider.onSlide(function(values) {
    treeAnimation.pause();

    debouncedSetStep(parseInt(values[0]) - 1);
});
slider.onChange(function(values) {
    treeAnimation.pause();

    debouncedSetStep(parseInt(values[0]) - 1);
});
slider.onMouseDown(function() {
    treeAnimation.pause();
});

playPause.onValueChange(function() {
    if (playPause.getValue() === 'play' && treeAnimation.isPlaying()) {
        treeAnimation.pause();
    } else if (playPause.getValue() === 'pause' && !treeAnimation.isPlaying()) {
        if (treeAnimation.getStep() === treeAnimation.getStepsLenght() - 1) {
            treeAnimation.setStep(0);
        }
        treeAnimation.play();
    }
});
