'use strict';

const queryParser = require('../mathParser/queryParser');
const treeSolvingBySteps = require('./treeSolvingBySteps');
const treeBuildingBySteps = require('./treeBuildingBySteps');


function TreeAnimation() {
    let query = '';
    let duration = 250;
    let steps = [];
    let step = 0;
    let play = false;

    let setStepCallBack = function() {};
    let doneCallBack = function() {};
    let pauseCallBack = function() {};
    let playCallBack = function() {};
    let interval = undefined;

    let chageIndex = 0;

    function update() {
        if (step >= steps.length - 1) {
            clearInterval(interval);
            doneCallBack();
            return;
        } else if (step === chageIndex) {
            clearInterval(interval);
            duration = 500;
            setTimeout(function() {
                if (play) {
                    interval = setInterval(update, duration);
                }
            }, 1000);
        }

        step++;
        setStepCallBack();
    }

    function calculateNewSteps() {
        step = 0;
        steps = treeBuildingBySteps(queryParser(query));

        chageIndex = steps.length - 1;

        steps = steps.concat(treeSolvingBySteps(queryParser(query)));
        setStepCallBack();
    }

    return {
        newQuery(newQuery) {
            query = newQuery;
            calculateNewSteps();
        },
        play() {
            play = true;
            interval = setInterval(update, duration);
            playCallBack();
        },
        pause() {
            play = false;
            clearInterval(interval);
            pauseCallBack();
        },
        onSetStep(callback) {
            setStepCallBack = callback;
        },
        onDone(callback) {
            doneCallBack = callback;
        },
        onPause(callback) {
            pauseCallBack = callback;
        },
        onPlay(callback) {
            playCallBack = callback;
        },
        clear() {
            query = '';
            step = 0;
            steps = [];
        },
        setDuration(newDuration) {
            duration = newDuration;
        },
        next() {
            if (step < steps.length -1) {
                step++;
                setStepCallBack();
            }
        },
        setStep(i) {
            i = (i < 0) ? 0 : i;
            step = i;
            setStepCallBack();
        },
        getStep() {
            return step;
        },
        getCurrentState() {
            return steps[step];
        },
        getStateForStep(i) {
            return steps[i];
        }
    };
}

module.exports = TreeAnimation;
