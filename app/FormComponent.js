'use strict';

// <div class="form">
//     <label>Math expression: </label>
//     <input type="text" name="query">
//     <button>Go!</button>
// </div>

function FormComponent() {
    let form = document.createElement('div');
        form.className = 'form';

    let div1 = document.createElement('div');
    let label = document.createElement('label');
        label.textContent = 'Math expression: ';
    let input = document.createElement('input');
        input.type = 'text';
        input.name = 'query';
    let button = document.createElement('button');
        button.textContent = 'Go!';

    let div2 = document.createElement('div');
    let labelSpan = document.createElement('label');
        labelSpan.textContent = 'Result: ';
    let span = document.createElement('span');
        span.textContent = '0';

    div1.appendChild(label);
    div1.appendChild(input);
    div1.appendChild(button);

    div2.appendChild(labelSpan);
    div2.appendChild(span);

    form.appendChild(div1);
    form.appendChild(div2);

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
        },
        setResult(result) {
            span.textContent = String(result);
        }
    };
}

module.exports = FormComponent;
