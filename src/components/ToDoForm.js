import React, { useState } from "react";
import "../styles/Form.css";
import "../styles/Buttons.css";

function ToDoForm(props) {
    const { listIndex, addTodo } = props;

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        importance: 0,
    })

    function handleChange(event) {
        const {name, value} = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        // if form name is not empty string
        if (formData.name) {
            addTodo(listIndex, {name: formData.name, description: formData.description, importance: formData.importance});
        }
        setFormData({
            name: "",
            description: "",
            importance: 0,
        })
    }

    return (
        <form 
            className="form"
            onSubmit={handleSubmit}>
            <p>Add To Do Item</p>
            <label>Name</label>
            <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} />
            <label>Description</label>
            <textarea type="text" name="description" value={formData.description} onChange={handleChange} />
            <br></br>
            <label>Importance</label>
            <input type="number" name="importance" value={formData.importance} onChange={handleChange} />
            <button 
                className="button-30"
                type="submit">
                    Add Item
            </button>
            <br></br>
        </form>
    )
}

export default ToDoForm;