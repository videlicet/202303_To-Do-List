const toDoFormInput = document.getElementById('to-do-form')
const startingInput = document.getElementById('new-to-do');
const toDoList = document.getElementById('to-do-items');
let toDoCounter = 0;
let newToDo = '';

/* set container for new to-do item by detecting changed value*/

startingInput.addEventListener('change', (element) => {
    newToDo = element.target.value;
})


/*fucntion to quickly acces a to-do's counter*/

const getElementHereCounter =  (element) => {
    let elementHereId = element.currentTarget.parentNode.id;
    let elementHereCounter = elementHereId.charAt(elementHereId.length-1);
    return elementHereCounter;
}


/*set to-do item completed status*/

const setCompleted = (element) => {
    /*get elementHereCounter*/
    let elementHereCounter = getElementHereCounter(element);

    /*change current element status in local storage*/
    let localStorageObject = localStorage.getItem(`to-do-${elementHereCounter}`);
    localStorageObject = localStorageObject ? JSON.parse(localStorageObject) : {};
    if (localStorageObject['completed'] == false) {
        localStorageObject['completed']= true;
    } else  {
        localStorageObject['completed']= false;
    }
    localStorage.setItem(`to-do-${elementHereCounter}`, JSON.stringify(localStorageObject));
    //console.log(localStorage);

    /*strike through span*/
    if (document.getElementById(`to-do-span-${elementHereCounter}`).style.textDecoration == 'line-through') {
        document.getElementById(`to-do-span-${elementHereCounter}`).style.textDecoration = 'none';
        
    } else {
        document.getElementById(`to-do-span-${elementHereCounter}`).style.textDecoration = 'line-through';
    }
}

/*delete to-do item*/

const deleteToDoItem = (element) => {
    /*get elementHereCounter*/
    let elementHereCounter = getElementHereCounter(element);
    //console.log(elementHereCounter);

    /*remove current element from local storage*/
    localStorage.removeItem(`to-do-${elementHereCounter}`);

    /*remove current element from DOM*/
    element.currentTarget.parentNode.remove();
    console.log(localStorage);
};

/*change to-do item text*/

const setChangedText = (element) => {
    let replacingText = '';

    /*get elementHereCounter*/
    let elementHereCounter = getElementHereCounter(element);

    let changeInput = document.getElementById(`change-to-do-input${elementHereCounter}`);
    
    replacingText = changeInput.value;
    element.target.parentNode.firstChild.innerText = replacingText;
    element.target.parentNode.firstChild.addEventListener('dblclick', changeToDoItem);

    /*change current element in local storage*/
    let localStorageObject = localStorage.getItem(`to-do-${elementHereCounter}`);
    localStorageObject = localStorageObject ? JSON.parse(localStorageObject) : {};
    localStorageObject['name']= replacingText;
    localStorage.setItem(`to-do-${elementHereCounter}`, JSON.stringify(localStorageObject));
    //console.log(localStorage);

    let changedTextInput = document.getElementById(`change-to-do-input${elementHereCounter}`);
    let listItemChangeButton = document.getElementById(`change-to-do-button${elementHereCounter}`);

    document.getElementById(`to-do-span-${elementHereCounter}`).style.backgroundColor = 'rgb(167, 79, 138)';

    changedTextInput.style.display = 'none';
    listItemChangeButton.style.display = 'none';
}

/*change to-do item visibility and call text change*/

const changeToDoItem = (element) => {
    element.currentTarget.removeEventListener('click', changeToDoItem);

    let elementHereId = element.currentTarget.parentNode.id;
    let elementHereCounter = elementHereId.charAt(elementHereId.length - 1);
    let changedTextInput = document.getElementById(`change-to-do-input${elementHereCounter}`);
    let listItemChangeButton = document.getElementById(`change-to-do-button${elementHereCounter}`);

    changedTextInput.style.display = 'block';
    listItemChangeButton.style.display = 'block';
    changedTextInput.focus();

    console.log(1 == 1);
    /*strike through span*/
    if (1 == 1) {
        document.getElementById(`to-do-span-${elementHereCounter}`).style.backgroundColor = 'grey';
        
    } else {
        document.getElementById(`to-do-span-${elementHereCounter}`).style.backgroundColor = 'rgb(167, 79, 138)';
    }

    listItemChangeButton.addEventListener('click', setChangedText);

    document.addEventListener('mousedown', function(event) {
        if (event.target == changedTextInput || event.target == listItemChangeButton) { 
            return
        } else {
            document.getElementById(`to-do-span-${elementHereCounter}`).style.backgroundColor = 'rgb(167, 79, 138)';
            changedTextInput.style.display = 'none';
            listItemChangeButton.style.display = 'none';
        }
    });
};

/*add new to-do item*/

const addNewToDo = (element) => {
    element.preventDefault();
    
    /*create new to-do item*/
    let listItem = document.createElement('li');
    let listItemText = document.createElement('span');
    let listItemCheckbox = document.createElement('input');
    let listItemDeleteButton = document.createElement('button');
    let changedTextInput = document.createElement('input');
    let listItemChangeButton = document.createElement('button');

    /*set new to-do item properties*/
    listItem.id = `to-do-item${toDoCounter}`;
    listItemText.innerText = newToDo;
    listItemText.id = `to-do-span-${toDoCounter}`;
    listItemCheckbox.type = 'checkbox';
    listItemDeleteButton.innerText = 'delete';
    listItemDeleteButton.type = 'button';
    changedTextInput.type = 'text';
    changedTextInput.setAttribute('required', 'required');
    changedTextInput.value = newToDo;
    changedTextInput.name = `change-to-do-input${toDoCounter}`;
    changedTextInput.id = `change-to-do-input${toDoCounter}`;
    changedTextInput.style.display = 'none';
    listItemChangeButton.innerText = 'Confirm';
    listItemChangeButton.type = 'submit';
    listItemChangeButton.id = `change-to-do-button${toDoCounter}`;
    listItemChangeButton.style.display = 'none';

    /*append necessary elemtns to new to-do item*/
    listItem.appendChild(listItemText);
    listItem.appendChild(listItemCheckbox);
    listItem.appendChild(listItemDeleteButton);
    listItem.appendChild(changedTextInput);
    listItem.appendChild(listItemChangeButton);

    /*add delete and change functions*/
    listItemDeleteButton.addEventListener('click', deleteToDoItem);
    listItemText.addEventListener('dblclick', changeToDoItem);
    listItemCheckbox.addEventListener('change', setCompleted)

    /*append new to-do item*/
    toDoList.appendChild(listItem);

    /*set object in local storage*/
    localStorage.setItem(`to-do-${toDoCounter}`, JSON.stringify({name: newToDo, completed: false}));

    newToDo = '';
    startingInput.value = '';
    toDoCounter++;
}

toDoFormInput.addEventListener('submit', addNewToDo);