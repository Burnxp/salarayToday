
const newTodo = document.getElementById('newTodo');

let todos = ['Essen', 'Trinken', 'lernen'];


function speichern(){
    todos.push(newTodo.value);
    console.log(todos)
    
    const listItem = document.createElement('li');
    const xButton = document.createElement('button');
    listItem.textContent = newTodo.value;
    xButton.textContent = 'X';
    xButton.onclick = () => loeschen(newTodo.value);
    list.appendChild(listItem)
    listItem.appendChild(xButton)
    newTodo.value = "";
    
}


const list = document.getElementById('todoList')

function loadList(){
    list.innerHTML = '';
    for (const todo of todos){
    const listItem = document.createElement('li');
    const xButton = document.createElement('button');
    listItem.textContent = todo;
    xButton.textContent = 'X';
    xButton.onclick = () => loeschen(todo);

    listItem.appendChild(xButton);
    list.appendChild(listItem)
}
}



const erledigt = document.getElementById('erledigt');
function loeschen(todo){
    todos = todos.filter(t => t !== todo);
    const listItem = document.createElement('li');
    listItem.textContent += `${todo}`;
    erledigt.appendChild(listItem)
    loadList();
    
}
loadList();