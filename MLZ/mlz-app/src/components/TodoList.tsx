import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {deleteTodo, getTodos} from '../services/DataService';
import {Todo} from '../interfaces/Todo';
import '../styles/TodoList.css';

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTodos();
                setTodos(data);
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };

        fetchData().then(() => console.log('noop'));
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deleteTodo(id);
            // Fetch updated todos after deletion
            const updatedTodos = await getTodos();
            setTodos(updatedTodos);
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    return (
        <div className="todo-list-wrapper">
            <h2 className="todo-list-title">Todo-List</h2>
            <Link to="/create" className="create-todo-button">
                Create New Todo
            </Link>
            <div className="card-container">
                {todos.map((todo) => (
                    <div key={todo.id} className="card">
                        <Link to={`/todo/${todo.id}`}>View Details</Link>
                        <div className="card-header">
                            <h3>{todo.title}</h3>
                        </div>
                        <p>{todo.description}</p>
                        <div className="list-button-container">
                            <Link to={`/edit/${todo.id}`} className="edit-todo-button">
                                Edit
                            </Link>
                            <button
                                className="delete-todo-button"
                                onClick={() => handleDelete(todo.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TodoList;