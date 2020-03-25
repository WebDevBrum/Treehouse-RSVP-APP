document.addEventListener('DOMContentLoaded', () => { 

    const form = document.getElementById('registrar');
    const input = form.querySelector('input');

    const mainDiv = document.querySelector('.main'); // selected as creating filter box
    const ul = document.getElementById('invitedList');

    // below concerns filter checkbox
    const div = document.createElement('div');
    const filterLabel = document.createElement('label');
    const filterCheckBox = document.createElement('input');

    filterLabel.textContent = "Hide those who haven't responded";
    filterCheckBox.type = 'checkbox';
    div.appendChild(filterLabel);
    div.appendChild(filterCheckBox);
    mainDiv.insertBefore(div, ul);

    filterCheckBox.addEventListener('change', (e) => {
        const isChecked = e.target.checked;
        const lis = ul.children;
        if(isChecked) {
            for(let i = 0; i < lis.length; i += 1){
            let li = lis[i];
            if (li.className === 'responded') {
                li.style.display = ''; //this will show element eg if hiding with display = 'none'

            } else {
                li.style.display = 'none'; //this will hide element

            }
        } 
        } else {
            for(let i = 0; i < lis.length; i += 1) {
            let li = lis[i];
            li.style.display = ''; //this will show element eg if hiding with display = 'none'
            // so in this case would show all elements if the checkbox is unchecked
        }

        }
    });


    //above concerns filter checkbox


    function createLI(text) { //function created as submit lister got busy, note use of 'text' made transition easier to manage
        // refactored from eg
        // const label = document.createElement('label');
        // label.textContent = 'confirmed';
        function createElement(elementName, property, value) {
            const element = document.createElement(elementName);
            element[property] = value; //note square brackets instead of dot , which takes a string
            return element;
        }

        //refactored from eg
        //const editButton = createElement('button', 'textContent', 'edit');
        //li.appendChild(editButton);
        //after creating above function
        //good method was to coph in repeating part into a function and break down

        function appendToLi(elementName, property, value) {
            const element = createElement(elementName, property, value);
            li.appendChild(element);
            return element;
        }
    
        const li = document.createElement('li');
        appendToLi('span', 'textContent', text);
        //instead of label.appendChild(checkbox);
        // so creates label element and appends to li followed by appending a checkbox element within the li to the label
        appendToLi('label', 'textContent', 'confirmed')
            .appendChild(createElement('input', 'type', 'checkbox')); //note use over two lines
        appendToLi('button', 'textContent', 'edit');
        appendToLi('button', 'textContent', 'remove');
        return li;
    }


    form.addEventListener('submit', (e) => {
    e.preventDefault(); //cancels default behaviour eg page refresh on submit
    const text = input.value;
    input.value = '';
    const li = createLI(text);
    ul.appendChild(li);
    });

    ul.addEventListener('change', (e) => {
        const checkbox = event.target;
        const checked = checkbox.checked;
        const listItem = checkbox.parentNode.parentNode;

        if (checked) {
            listItem.className = 'responded';
        } else {
            listItem.className = '';
        }
    });

    ul.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const button = e.target; 
        const li = button.parentNode; 
        const ul = li.parentNode;
        const action = button.textContent;
        const nameActions = {
            remove: () => {
                ul.removeChild(li);
            },
            edit: () => {
                const span = li.firstElementChild;
                const inputName = document.createElement('input');
                inputName.type = 'text';
                inputName.value = span.textContent;
                li.insertBefore(inputName, span);
                li.removeChild(span);
                button.textContent = 'save';
             },
             save: () => {
                const inputName = li.firstElementChild;   //this was bit you forgot to reverse so didnt reference first child
                const span = document.createElement('span'); //also didnt reverse this bit
                span.textContent = inputName.value;
                li.insertBefore(span, inputName);
                li.removeChild(inputName);
                button.textContent = 'edit';
             }

        };
        
        // select and run action in buttons name
         nameActions[action]();

        //replaces below 
        // if (action === 'remove') {
        //     nameActions.remove();
        // } else if (action === 'edit') {
        //     nameActions.edit();
        // } else if (action === 'save') {
        //     nameActions.save();
        // }
    } 
    });

});