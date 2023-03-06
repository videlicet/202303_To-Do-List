const toDoFormInput = document.getElementById('to-do-form')
const add = document.getElementById('new-to-do');
const toDoList = document.getElementById('to-do-items');
let newToDo = '';

addEventListener('change', (element) => {
    newToDo = element.target.value;
})

const addNewToDo = (element) => {
        element.preventDefault();

        let listItem = document.createElement('li');
        listItem.innerText = newToDo;
        toDoList.appendChild(listItem);

        add.value = '';
}

toDoFormInput.addEventListener('submit', addNewToDo);