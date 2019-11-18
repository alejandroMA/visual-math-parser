'use strict';

const noUiSlider = require('nouislider');

// <div class="slider-container">
//    <div></div>
// </div>

function PlayPauseComponent() {
    let container = document.createElement('div');
    container.className = 'slider-container';

    let div = document.createElement('div');

    container.appendChild(div);

    let slider = noUiSlider.create(div, {
        behaviour: 'tap',
        start: 0,
        step: 1,
        range: {
            min: 0,
            max: 1
        },
        pips: {
            mode: 'steps',
            filter: () => 2,
            density: 100,
            stepped: true
        }
    });

    return {
        getDomNode() {
            return container;
        },
        set(newValue) {
            slider.set(newValue);
        },
        get() {
            return slider.get();
        },
        updateOptions(newOpts, fireSetFlag) {
            slider.updateOptions(newOpts, fireSetFlag);
        },
        onStart(callback) {
            slider.on('start', callback);
        },
        onSlide(callback) {
            slider.on('slide', callback);
        },
        onChange(callback) {
            slider.on('change', callback);
        },
        onMouseDown(callback) {
            container.addEventListener('mousedown', callback)
        },
        disable() {
            div.setAttribute('disabled', true);
        },
        enable() {
            div.removeAttribute('disabled');
        }
    };
}

module.exports = PlayPauseComponent;
