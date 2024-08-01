
import { TODOS_STORAGE_KEY } from "./constants.js";
import { createTodosModel } from "./model.js";
import { createStorage } from "./storage.js";
import { createView } from "./view.js";

const inputNode = document.querySelector('.js-input');
const btnNode = document.querySelector('.js-btn');
const btnClearNode = document.querySelector('.js-clear-btn');

const initialTodos = [];
const model = createTodosModel(initialTodos);
const view = createView('.js-output', handleClickTodo);
const storage = createStorage(TODOS_STORAGE_KEY);

storage.pull().then((todos) => {                       //забираем из бэкенда список дел, 
   model.setTodos(todos);                              //обновляем их в модели
   view.renderTodos(model.getTodos());                // делаем отрисовку
});

btnNode.addEventListener('click', function() {
    const todoTitle = inputNode.value;
    const todo = model.addTodo({
        title: todoTitle
    });
    view.addTodo(todo);
    storage.push(todo);
});

btnClearNode.addEventListener('click', function() {
    storage.delete(model.getTodos());
    model.setTodos([]);
    view.clearTodos();
    
})


function handleClickTodo(id) {
  model.toggleTodo(id);

    storage.update(model.getTodo(id));
}