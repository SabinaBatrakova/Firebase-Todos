import { v4 as uuidv4 } from 'uuid';

/*const todosIds = [id1, id2, id3]
const todosById = {
    id1: {},
    id2: {},
    id3: {},
}*/

export function createTodosModel(todos) {
    return {
        todosIds: [],
        todosById: {},

        addTodo: function({title}) {
            const todo = {
                title,
                done:false,
                id: uuidv4()
             };
        
             this.todosIds.push(todo.id);
             this.todosById[todo.id] = todo;
             return todo;
        },

        setTodos: function(todos) {
            this.todosIds = [];
            this.todosById = {};
            todos.forEach(todo => {
                this.todosIds.push(todo.id),
                this.todosById[todo.id] = todo;
            })
        },
        
        getTodos: function() {
            return {
                todosById: this.todosById,
                todosIds: this.todosIds,
            }
        },
       
        toggleTodo: function(id) {
           this.todosById[id].done = !this.todosById[id].done
        },

        getTodo: function(id) {
            return this.todosById[id];
        }
    };
}