const toDoFormInput = document.getElementById('to-do-form')
const startingInputValue = document.getElementById('new-to-do');
const toDoList = document.getElementById('to-do-items');
let newToDo = '';

addEventListener('change', (element) => {
    newToDo = element.target.value;
})

const deleteToDoItem = (element) => {
    console.log(element.target);
    element.currentTarget.parentNode.remove();
};

const changeToDoItem = (element) => {
    console.log(element);
    let changedText = 'changed text';
    element.target.innerHTML = changedText;
};


const addNewToDo = (element) => {
        element.preventDefault();

        let listItem = document.createElement('li');
        let listItemText = document.createElement('span');
        let listItemCheckbox = document.createElement('input');
        //let listItemChangeButton = document.createElement('button');
        let listItemDeleteButton = document.createElement('button');

        listItemText.innerText = newToDo;
        listItemCheckbox.type = 'checkbox';
        listItemDeleteButton.innerText = 'delete';
        listItemDeleteButton.type = 'button';
        //listItemChangeButton.innerText = 'change';
        //listItemChangeButton.type = 'button';
        listItem.appendChild(listItemText);
        listItem.appendChild(listItemCheckbox);
        listItem.appendChild(listItemDeleteButton);
        //listItem.appendChild(listItemChangeButton);

        listItemDeleteButton.addEventListener('click', deleteToDoItem);
        //listItemChangeButton.addEventListener('click', changeToDoItem);
        listItem.addEventListener('click', changeToDoItem);

        toDoList.appendChild(listItem);

        startingInputValue.value = '';
        console.log(listItem);
}

toDoFormInput.addEventListener('submit', addNewToDo);