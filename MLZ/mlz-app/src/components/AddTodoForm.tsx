import React, {useState} from 'react';
import {createTodo} from '../services/DataService';
import {Todo} from '../interfaces/Todo';
import '../styles/AddTodoForm.css';
import {Link, useNavigate} from 'react-router-dom';
import Switch from 'react-switch';

const AddTodoForm: React.FC = () => {
    const navigate = useNavigate();

    const [newTodo, setNewTodo] = useState<Todo>({
        id: 0,
        title: '',
        description: '',
        dueDate: null,
        isCompleted: false,
        lengthInDays: 0,
    });

    const isCheckbox = (element: EventTarget): element is HTMLInputElement => {
        return (element as HTMLInputElement).type === 'checkbox';
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const {name, value} = e.target;

        if (name === 'dueDate') {
            // Convert the string representation of the date to a Date object
            setNewTodo((prevTodo) => ({
                ...prevTodo,
                [name]: value ? new Date(value) : null,
            }));
        } else {
            setNewTodo((prevTodo) => ({
                ...prevTodo,
                [name]: isCheckbox(e.target) ? (e.target as HTMLInputElement).checked : value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const todoToAdd: Todo = {
                ...newTodo,
            };

            const createdTodo = await createTodo(todoToAdd);

            console.log('Todo created:', createdTodo);

            navigate('/');
        } catch (error) {
            console.error('Error creating todo:', error);
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Add new Todo</h2>
            <Link to="/" className="back-link">
                Back to Todo List
            </Link>
            <form onSubmit={handleSubmit} className="todo-form">
                <label className="form-label">
                    Title*:
                    <input type="text" name="title" value={newTodo.title} onChange={handleChange} required/>
                </label>
                <label className="form-label">
                    Description:
                    <textarea name="description" value={newTodo.description} onChange={handleChange} maxLength={150}/>
                </label>
                <label className="form-label">
                    Due Date:
                    <input
                        type="date"
                        name="dueDate"
                        value={newTodo.dueDate instanceof Date ? newTodo.dueDate.toISOString().split('T')[0] : ''}
                        onChange={handleChange}
                    />
                </label>
                <label className="form-label">
                    Is Completed:
                    <Switch
                        className={'completed-switch'}
                        checked={newTodo.isCompleted}
                        onChange={() =>
                            setNewTodo((prevTodo) => ({...prevTodo, isCompleted: !prevTodo.isCompleted}))
                        }
                    />
                </label>
                <label className="form-label">
                    Length in Days:
                    <input
                        type="number"
                        name="lengthInDays"
                        value={newTodo.lengthInDays}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit" className="submit-button">
                    Add Todo
                </button>
            </form>
        </div>
    );
};

export default AddTodoForm;