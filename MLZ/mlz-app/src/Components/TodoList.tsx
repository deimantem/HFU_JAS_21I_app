import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {getTodos} from "../Services/DataService";
import {Todo} from "../Interfaces/Todo";

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

        fetchData().then(noop);
    }, []);

    return (
        <div>
            <h2>Todo-List</h2>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <Link to={`/entity/${todo.id}`}>{todo.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;