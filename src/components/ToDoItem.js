import React, { useState } from 'react';
import trashIcon from "../trash-icon.png";
import "../styles/ToDoItem.css";

function ToDoItem(props) {
    const { todo, deleteTodo, updateTodo, listId } = props;
    const [editing, setEditing] = useState("");
    const [state, setState] = useState("");

    function handleChange(event) {
        setState(event.target.value);
    }

    function handleBlur(listId, todoId, attribute, val) {
        setEditing("");
        updateTodo(listId, todoId, attribute, val)
    }

    return (
        <div className='itemWrapper'>
            { editing != "name" &&
            <span 
                className='itemTitle'
                onClick={() => setEditing("name")}>
                {todo.name}
            </span>}
            {editing == "name" &&
            <input 
                type='text'
                value={state}
                onChange={handleChange}
                onBlur={(event) => handleBlur(listId, todo.id, "name", event.target.value)}
            />}
            <div>
                <span 
                    className='itemId'>
                    Id: { todo.id }
                </span>
                <span>
                    Importance: { todo.importance }
                </span>
            </div>
            <span
                className='itemDescription'>
                Description: { todo.description }
            </span>
            <span 
                onClick={() => deleteTodo(listId, todo.id)}>
                <img 
                    src={trashIcon}
                    alt='trash icon'
                    width="12"
                    height="12"
                    className='trashIcon'
                />
            </span>
        </div>
    )
}

export default ToDoItem;