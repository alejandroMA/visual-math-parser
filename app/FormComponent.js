'use strict';

// <div class="form">
//     <label>Quey: </label>
//     <input type="text" name="query">
//     <button>Go!</button>
// </div>

function FormComponent() {
    let form = document.createElement('div');
        form.className = 'form';

    let label = document.createElement('label');
        label.textContent = 'Quey: ';
    let input = document.createElement('input');
        input.type = 'text';
        input.name = 'query';
    let button = document.createElement('button');
        button.textContent = 'Go!';

    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(button);

    return {
        getDomNode() {
            return form;
        },
        onButtonClick(callback) {
            button.addEventListener('click', callback);
            input.addEventListener('keyup', function(event) {
                event.preventDefault();
                if (event.keyCode == 13) {
                    callback();
                }
            });
        },
        getQuery() {
            return input.value;
        }
    };
}

module.exports = FormComponent;
