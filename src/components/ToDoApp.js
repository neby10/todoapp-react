import React, { useState } from 'react';
import ToDoList from './ToDoList';
import ToDoForm from './ToDoForm';
import ToDoAddListForm from './ToDoAddListForm';
import trashIcon from '../trash-icon.png'
import "../styles/ToDoApp.css";
import "../styles/Buttons.css";

function ToDoApp() {
    const [lists, setLists] = useState([
        {id: 0, name: "To Do List"},
        {id: 1, name: "Grocery List"},
        {id: 2, name: "Movie List"},
        {id: 3, name: "Video Game List"},
        {id: 4, name: "Book List"}
    ])
    const [todos, setTodos] = useState([
        [
            {id: 0, name: "Eat Breakfast", description: "5 eggs, 3 bacons", importance: 10},
            {id: 1, name: "Eat Lunch", description: "sammiches", importance: 10},
            {id: 2, name: "Eat Dinner", description: "Cheddar Beef Nachos", importance: 10},
        ],
        [
            {id: 0, name: "Lemons", description: "When life gives you lemons, make lemonade.", importance: 4},
            {id: 1, name: "Eggs", description: "12 dozen", importance: 7},
            {id: 2, name: "Chicken", description: "Remember to buy organic.", importance: 9},
        ],
        [
            {id: 0, name: "Outlaw King", description: "Robert the Bruce frees Scotland", importance: 7},
            {id: 1, name: "Trailer Park Boys", description: "Stupid dudes in a trailer park", importance: 6},
            {id: 2, name: "Hillbilly Elegy", description: "Kid makes it out of appalacia", importance: 4},
        ],
        [
            {id: 0, name: "Modern Warfare", description: "Great game", importance: 7},
            {id: 1, name: "Modern Warfare 2", description: "best game ever", importance: 6},
            {id: 2, name: "Modern Warfare 3", description: "Good game", importance: 6},
        ],
        [
            {id: 0, name: "Where the Red Fern Grows", description: "This is a book", importance: 7},
            {id: 1, name: "Old Yeller", description: "This is also a book", importance: 6},
            {id: 2, name: "Battle of Skandia", description: "This is a book as well", importance: 6},
        ]
    ])
    const [selected, setSelected] = useState(0);
    const [showItemForm, setShowItemForm] = useState(false);
    const [showListForm, setShowListForm] = useState(false);


    function deleteTodo(listIndex, todoIndex) {
        // reassign ids??
        setTodos((prevTodos) => {
            const updatedToDos = [...prevTodos];
            updatedToDos[listIndex] = updatedToDos[listIndex].filter((todo) => todo.id !== todoIndex);
            return updatedToDos;
        })
    }

    function addTodo(listIndex, newTodo) {
        // find an available id for the newTodo
        todos[listIndex].sort((a, b) => a.id - b.id);
        let newId = 0;
        for (let i = 0; i < todos[listIndex].length; i++) {
            if (newId == todos[listIndex][i].id) {
                newId += 1;
            } else {
                break;
            }
        }
        
        const todo = {...newTodo, id: newId}
        setTodos((prevTodos) => {
            const updatedToDos = [...prevTodos];
            updatedToDos[listIndex] = [...updatedToDos[listIndex], todo];
            return updatedToDos;
        })
    }

    function updateTodo(listId, todoId, attribute, val) {
        /* 
            @param: listId: desired list
            @param todoId: desired todo
            @param attribute: attribute to be updated
            @param val: new value for that attribute
        */
        setTodos((prevTodos) => {
            const updatedTodos = [...prevTodos];
            updatedTodos[listId][todoId][attribute] = val;
            return updatedTodos;
        });
    }

    function deleteList(listIndex) {
        // only remove list for list size greater than one
        if (lists.length > 1) {
            if (selected == listIndex) {
                selected > 0 ? setSelected(listIndex - 1) : setSelected(0);
            } else if (selected > listIndex) {
                setSelected(selected - 1);
            }
            setLists((prevLists) => {
                const updatedLists = prevLists.filter((list) => list.id !== listIndex).map((list, index) => ({ ...list, id: index }));
                return updatedLists;
            });
            setTodos((prevTodos) => {
                let updatedTodos = [...prevTodos]
                updatedTodos.splice(listIndex, 1);
                return updatedTodos;
            });
        }
    }

    function addList(listName) {
        setLists((prevLists) => {
            const newId = prevLists.length;
            const newList = {id: newId, name: listName};
            return [...prevLists, newList];
        });
        setTodos((prevTodos) => {
            return [...prevTodos, []];
        });
    }
    
    return (
        <div>
            <h1 className='appTitle'>TO DO APP</h1>
            <h2 className='listsTitle'>Your Lists</h2>
            <button 
                className='button-30'
                onClick={() => setShowListForm(!showListForm)}>
                { showListForm && <span>Close </span> }
                Add New List
            </button>
            {showListForm &&
            <ToDoAddListForm
                addList={addList}
            />}
            <ul className='selectList'>
                {lists.map((list) => 
                    <li 
                        key={list.id} 
                        className='selectListItem'
                    >
                        <span
                            onClick={() => setSelected(list.id)}
                        >
                            {list.name} {" "} {" "}
                        </span>
                        <span 
                            key={list.id}
                            onClick={() => deleteList(list.id)}
                        >
                            <img 
                                src={trashIcon} 
                                alt='trash icon'
                                width="12"
                                height="12"
                                className='trashIcon'

                            />
                        </span>
                    </li>
                )}
            </ul>
            <button 
                className='button-30'
                onClick={() => setShowItemForm(!showItemForm)}>
                { showItemForm && <span>Close </span> } Add New Item
            </button>
            {showItemForm && 
            <ToDoForm
                listIndex={selected}
                addTodo={addTodo}
            />}
            <ToDoList
                list={lists[selected]}
                todos={todos[selected]}
                deleteTodo={deleteTodo}
                updateTodo={updateTodo}
            />
        </div>
    )

}

export default ToDoApp;