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
            value = (value === 'play') ? 'pause' : 'play';
            updateUI();
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
            value = newValue;
            updateUI();
        },
        deactivate() {
            button.setAttribute('disabled', true);
            active = false;
        },
        activate() {
            button.removeAttribute('disabled');
            active = true;
        }
    };
}

module.exports = PlayPauseComponent;
