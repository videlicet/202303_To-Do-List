const toDoFormInput = document.getElementById('to-do-form')
const startingInput = document.getElementById('new-to-do');
const toDoList = document.getElementById('to-do-items');
let toDoCounter = 0;
let newToDo = '';

addEventListener('change', (element) => {
    newToDo = element.target.value;
})

const deleteToDoItem = (element) => {
    //console.log(element.target);
    element.currentTarget.parentNode.remove();
};

const setChangedText = (element) => {
    let replacingText = '';
    let elementHereId = element.currentTarget.parentNode.id;
    let elementHereCounter = elementHereId.charAt(elementHereId.length - 1);
    let changeInput = document.getElementById(`change-to-do-input${elementHereCounter}`);
    
    replacingText = changeInput.value;
    element.target.parentNode.firstChild.innerText = replacingText;
    element.target.parentNode.firstChild.addEventListener('dblclick', changeToDoItem);

    let changedTextInput = document.getElementById(`change-to-do-input${elementHereCounter}`);
    let listItemChangeButton = document.getElementById(`change-to-do-button${elementHereCounter}`);

    changedTextInput.style.display = 'none';
    listItemChangeButton.style.display = 'none';
}

const changeToDoItem = (element) => {
    element.currentTarget.removeEventListener('click', changeToDoItem);

    let elementHereId = element.currentTarget.id;
    let elementHereCounter = elementHereId.charAt(elementHereId.length - 1);
    let changedTextInput = document.getElementById(`change-to-do-input${elementHereCounter}`);
    let listItemChangeButton = document.getElementById(`change-to-do-button${elementHereCounter}`);

    changedTextInput.style.display = 'block';
    listItemChangeButton.style.display = 'block';

    listItemChangeButton.addEventListener('click', setChangedText);

    document.addEventListener('click', function(event) {
        if (event.target == changedTextInput) { 
            return
        } else {
            changedTextInput.style.display = 'none';
            listItemChangeButton.style.display = 'none';
        }
    });
};


const addNewToDo = (element) => {
    element.preventDefault();
    
    let listItem = document.createElement('li');
    let listItemText = document.createElement('span');
    let listItemCheckbox = document.createElement('input');
    let listItemDeleteButton = document.createElement('button');
    let changedTextInput = document.createElement('input');
    let listItemChangeButton = document.createElement('button');

    listItem.id = `to-do-item${toDoCounter}`;
    listItemText.innerText = newToDo;
    listItemCheckbox.type = 'checkbox';
    listItemDeleteButton.innerText = 'delete';
    listItemDeleteButton.type = 'button';
    changedTextInput.type = 'text';
    changedTextInput.value = newToDo;
    changedTextInput.name = `change-to-do-input${toDoCounter}`;
    changedTextInput.id = `change-to-do-input${toDoCounter}`;
    changedTextInput.style.display = 'none';
    listItemChangeButton.innerText = 'Confirm';
    listItemChangeButton.type = 'button';
    listItemChangeButton.id = `change-to-do-button${toDoCounter}`;
    listItemChangeButton.style.display = 'none';

    listItem.appendChild(listItemText);
    listItem.appendChild(listItemCheckbox);
    listItem.appendChild(listItemDeleteButton);
    listItem.appendChild(changedTextInput);
    listItem.appendChild(listItemChangeButton);

    listItemDeleteButton.addEventListener('click', deleteToDoItem);
    listItem.addEventListener('dblclick', changeToDoItem);

    toDoList.appendChild(listItem);

    startingInput.value = '';
    toDoCounter++;
}

toDoFormInput.addEventListener('submit', addNewToDo);