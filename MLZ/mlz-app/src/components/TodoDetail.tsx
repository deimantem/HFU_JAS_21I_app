import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {Todo} from '../interfaces/Todo';
import {getTodoById} from '../services/DataService';
import '../styles/TodoDetail.css';

const TodoDetail: React.FC = () => {
    const {id} = useParams<{ id: string | undefined }>();
    const [todo, setTodo] = useState<Todo | undefined>(undefined);

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const todoData = await getTodoById(parseInt(id!, 10));
                setTodo(todoData);
            } catch (error) {
                console.error('Error fetching todo:', error);
            }
        };

        fetchTodo().catch((reason) => console.error(reason));
    }, [id]);

    if (!todo) {
        return <div>Loading...</div>;
    }

    const formattedDueDate = todo.dueDate
        ? new Date(todo.dueDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit', // adds leading zero if necessary
            day: '2-digit',   // adds leading zero if necessary
        }).replace(/\//g, '.') // replace slashes with dots
        : 'N/A';

    return (
        <div className="todo-detail-container">
            <h2 className="todo-detail-title">Todo-Detail</h2>
            <div className="todo-detail-item">
                <strong>Title:</strong> {todo.title}
            </div>
            <div className="todo-detail-item">
                <strong>Description:</strong> {todo.description}
            </div>
            <div className="todo-detail-item">
                <strong>Due Date:</strong> {formattedDueDate}
            </div>
            <div className="todo-detail-item">
                <strong>Status:</strong> {todo.isCompleted ? 'Completed' : 'Incomplete'}
            </div>
            <div className="todo-detail-item">
                <strong>Length in Days:</strong> {todo.lengthInDays}
            </div>
            <Link to="/" className="back-link">
                Back to Todo List
            </Link>
        </div>
    );
};

export default TodoDetail;