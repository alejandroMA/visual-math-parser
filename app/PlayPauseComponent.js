'use strict';

// <div>
//     <button class="play-pause"><i class="icon"></i></button>
// </div>

function PlayPauseComponent() {
    let value = 'pause';
    let active = true;
    let valueChangeCallback = function() {};

    let div = document.createElement('div');

    let button = document.createElement('button');
        button.className = 'play-pause';

    let icon = document.createElement('i');
        icon.className = 'icon-play';

    button.appendChild(icon);
    div.appendChild(button);

    button.addEventListener('click', function() {
        toogleValue();
    });

    function toogleValue() {
        if (active) {
            updateUI();
            value = (value === 'play') ? 'pause' : 'play';
            valueChangeCallback();
        }
    }

    function updateUI() {
        icon.className = 'icon-' + value;
    }

    return {
        getDomNode() {
            return div;
        },
        onValueChange(callback) {
            valueChangeCallback = callback;
        },
        getValue() {
            return value;
        },
        toogleValue() {
            return toogleValue();
        },
        setValue(newValue) {
            updateUI();
            value = newValue;
        },
        deactivate() {
            active = false;
        },
        activate() {
            active = true;
        }
    };
}

module.exports = PlayPauseComponent;
