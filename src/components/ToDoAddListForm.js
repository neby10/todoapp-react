import React, { useState } from "react";

function ToDoAddListForm(props) {
    const { addList } = props;
    const [name, setName] = useState("");

    function handleChange(event) {
        setName(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        // if name is not empty
        if (name) {
            addList(name);
        }
        setName("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <p>Add To Do List</p>
            <label>Name</label>
            <input type="text" name="name" value={name} onChange={handleChange} />
            <br></br>
            <button type="submit">Add List</button>
            <br></br>
        </form>
    )
}

export default ToDoAddListForm;