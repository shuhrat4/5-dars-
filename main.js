let elForm = document.querySelector(".todo-form")
let elInput = document.querySelector('.todo-input')
let elTodolist = document.querySelector(".todo-list")

let todos = []

elForm.addEventListener("submit", function (e) {
    e.preventDefault()
    const data = {
        id: todos.length,
        todoValue: elInput.value,
        isComplated: false
    }
    e.target.reset()
    todos.push(data)
    renderTodos(todos)
})

function renderTodos(arr) {
    elTodolist.innerHTML = null
    arr.forEach(item => {
        let elTodoItem = document.createElement('li')
        elTodoItem.className = `flex items-center justify-between bg-white p-2 rounded-lg ${item.isComplated ? "opacity-70 line-throught" : ""}`
        elTodoItem.innerHTML = `    
      <div class="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-3">
    <div class="flex items-center space-x-3">
        <span class="text-sm text-gray-500">${item.id}</span>
        <strong id="todo-text-${item.id}" class="text-lg text-gray-800">${item.todoValue}</strong>
    </div>
    <div class="flex items-center space-x-3">
        <div onclick="handleCompletedClick(${item.id})" class="w-6 h-6 flex items-center ml-2 justify-center cursor-pointer rounded-full border-2 border-gray-400 transition-all">
            <div class="w-full h-full ${item.isCompleted ? 'bg-blue-500' : ''} rounded-full"></div>
        </div>
        <button onclick="handleDeleteTodo(${item.id})" class="px-3 py-2 rounded-md bg-red-500 text-white font-medium hover:bg-red-600 transition" type="button">
            Delete
        </button>
        <button onclick="handleUpdateTodo(${item.id})" class="px-3 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 transition" type="button">
            Update
        </button>
    </div>
</div>

        `
        elTodolist.append(elTodoItem)

    })
}

function handleDeleteTodo(id) {
    todos = todos.filter(item => item.id != id)
    renderTodos(todos)
}
function handleCompletedClick(id) {
    const findedObj = todos.find(item => item.id == id);
    findedObj.isCompleted = !findedObj.isCompleted;
    renderTodos(todos);
}

elTodolist.addEventListener("click", function (e) {

})

function handleUpdateTodo(id) {
    const todoTextElement = document.getElementById(`todo-text-${id}`);
    const currentTodoValue = todoTextElement.textContent;
    const newTodoValue = prompt("Update your to-do:", currentTodoValue);
    if (newTodoValue && newTodoValue.trim() !== "") {
        todoTextElement.textContent = newTodoValue;
        const todoIndex = todos.findIndex(todo => todo.id === id);
        if (todoIndex > -1) {
            todos[todoIndex].todoValue = newTodoValue;
        }
    }
}   