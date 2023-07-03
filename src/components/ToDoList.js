import React from "react";
import ToDoItem from "./ToDoItem";
import ToDoForm from "./ToDoForm";

function ToDoList(props) {
    const { list, todos, deleteTodo, updateTodo } = props;
    
    return (
        <div>
            <h2>{list.name}</h2>
            
            {todos.map((todo) => 
                <ToDoItem 
                    key={todo.id}
                    todo={todo}
                    deleteTodo={deleteTodo}
                    updateTodo={updateTodo}
                    listId={list.id}
                />
            )}
        </div>
    )
}

export default ToDoList;