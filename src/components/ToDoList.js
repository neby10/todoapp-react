import React from "react";
import ToDoItem from "./ToDoItem";
import "../styles/ToDoList.css";

function ToDoList(props) {
    const { list, todos, deleteTodo, updateTodo } = props;
    
    return (
        <div className="todoList">
            <h2 className="listTitle">{list.name}</h2>
            
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