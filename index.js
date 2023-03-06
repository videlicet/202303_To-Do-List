const toDoFormInput = document.getElementById('to-do-form')
const startingInputValue = document.getElementById('new-to-do');
const toDoList = document.getElementById('to-do-items');
let newToDo = '';

addEventListener('change', (element) => {
    newToDo = element.target.value;
})


const deleteToDoItem = (element) => {
    console.log(element);
};

const changeToDoItem = (element) => {
    console.log(element);
    /*let clickedElement;
    let changedText = 'changed text';
    clickedElement.innerText = changedText;*/
};

const addNewToDo = (element) => {
        element.preventDefault();

        let listItem = document.createElement('li');
        let listItemCheckbox = document.createElement('input');
        let listItemChangeButton = document.createElement('button');
        let listItemDeleteButton = document.createElement('button');

        listItem.innerText = newToDo;
        listItemCheckbox.type = 'checkbox';
        listItemDeleteButton.innerText = 'delete';
        listItemDeleteButton.type = 'button';
        listItemChangeButton.innerText = 'change';
        listItemChangeButton.type = 'button';
        listItem.appendChild(listItemCheckbox);
        listItem.appendChild(listItemDeleteButton);
        listItem.appendChild(listItemChangeButton);

        listItemDeleteButton.addEventListener('click', deleteToDoItem());
        listItemChangeButton.addEventListener('click', changeToDoItem());

        toDoList.appendChild(listItem);

        startingInputValue.value = '';
        console.log(listItem);
}

toDoFormInput.addEventListener('submit', addNewToDo);