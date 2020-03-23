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
    
    
    const li = document.createElement('li');
    
    const span = createElement('span', 'textContent', text);
    
    
    li.appendChild(span);
    
    const label = document.createElement('label');
    label.textContent = 'confirmed';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    
    label.appendChild(checkbox);
    li.appendChild(label);

    const editButton = document.createElement('button');
    editButton.textContent = 'edit';
    
    li.appendChild(editButton);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'remove';
   
    li.appendChild(removeButton);

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
        if (button.textContent === 'remove') {
            ul.removeChild(li);
        } else if (button.textContent === 'edit') {
            const span = li.firstElementChild;
            const inputName = document.createElement('input');
            inputName.type = 'text';
            inputName.value = span.textContent;
            li.insertBefore(inputName, span);
            li.removeChild(span);
            button.textContent = 'save';
        } else if (button.textContent === 'save') {
            const inputName = li.firstElementChild;   //this was bit you forgot to reverse so didnt reference first child
            const span = document.createElement('span'); //also didnt reverse this bit
            span.textContent = inputName.value;
            li.insertBefore(span, inputName);
            li.removeChild(inputName);
            button.textContent = 'edit';
        }
    } 
    });

});