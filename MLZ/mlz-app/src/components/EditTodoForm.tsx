import React, {useEffect, useState} from 'react';
import {getTodoById, updateTodo} from '../services/DataService';
import {Todo} from '../interfaces/Todo';
import '../styles/EditTodoForm.css';
import {Link, useNavigate, useParams} from 'react-router-dom';
import Switch from 'react-switch';

const EditTodoForm: React.FC = () => {
    const navigate = useNavigate();
    const {id} = useParams<{ id: string }>();
    const todoId = id ? parseInt(id, 10) : -1;

    const [editTodo, setEditTodo] = useState<Todo>({
        id: 0,
        title: '',
        description: '',
        dueDate: null,
        isCompleted: false,
        lengthInDays: 0,
    });

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const todoData = await getTodoById(todoId);
                if (todoData && todoId !== -1) {
                    // Convert the dueDate string obtained from the API into a Date object
                    if (todoData.dueDate !== null) {
                        todoData.dueDate = new Date(todoData.dueDate);
                    }
                    setEditTodo(todoData);
                } else {
                    console.error(`Todo with ID ${todoId} not found.`);
                }
            } catch (error) {
                console.error('Error fetching todo:', error);
            }
        };

        if (todoId !== -1) {
            fetchTodo().catch((reason) => console.error(reason));
        }
    }, [todoId]);

    const isCheckbox = (element: EventTarget): element is HTMLInputElement => {
        return (element as HTMLInputElement).type === 'checkbox';
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;

        if (name === 'dueDate') {
            // Convert the string representation of the date to a Date object
            setEditTodo((prevTodo) => ({
                ...prevTodo,
                [name]: new Date(value),
            }));
        } else {
            setEditTodo((prevTodo) => ({
                ...prevTodo,
                [name]: isCheckbox(e.target) ? (e.target as HTMLInputElement).checked : value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const updatedTodo: Todo = {
                ...editTodo,
            };

            await updateTodo(updatedTodo.id, updatedTodo);

            console.log('Todo updated:', updatedTodo);

            navigate('/');
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Edit Todo</h2>
            <Link to="/" className="back-link">
                Back to Todo List
            </Link>
            <form onSubmit={handleSubmit} className="todo-form">
                <label className="form-label">
                    Title:
                    <input type="text" name="title" value={editTodo.title} onChange={handleChange} required/>
                </label>
                <label className="form-label">
                    Description:
                    <textarea name="description" value={editTodo.description} onChange={handleChange}/>
                </label>
                <label className="form-label">
                    Due Date:
                    <input
                        type="date"
                        name="dueDate"
                        value={editTodo.dueDate?.toISOString().split('T')[0]}
                        onChange={handleChange}
                    />
                </label>
                <label className="form-label">
                    Is Completed:
                    <Switch
                        className={'completed-switch'}
                        checked={editTodo.isCompleted}
                        onChange={() => setEditTodo((prevTodo) => ({...prevTodo, isCompleted: !prevTodo.isCompleted}))}
                    />
                </label>
                <label className="form-label">
                    Length in Days:
                    <input type="number" name="lengthInDays" value={editTodo.lengthInDays} onChange={handleChange}/>
                </label>
                <button type="submit" className="submit-button">
                    Update Todo
                </button>
            </form>
        </div>
    );
};

export default EditTodoForm;