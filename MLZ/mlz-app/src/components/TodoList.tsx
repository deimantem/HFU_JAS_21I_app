import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {createTodo, deleteAllTodos, deleteTodo, getTodos} from '../services/DataService';
import {Todo} from '../interfaces/Todo';
import '../styles/TodoList.css';

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

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

    const handleCreateTestData = async () => {
        // Create a new test todo
        const newTodo: Todo = {
            id: todos.length + 1,
            title: `Test Todo ${todos.length + 1}`,
            description: 'Test description',
            dueDate: new Date(),
            isCompleted: false,
            lengthInDays: 3,
        };

        try {
            await createTodo(newTodo);

            // Fetch updated todos after adding
            const updatedTodos = await getTodos();
            setTodos(updatedTodos);
        } catch (error) {
            console.error('Error creating test todo:', error);
        }
    };

    // Highlight the matched search term in the title
    const highlightSearchTerm = (title: string) => {
        if (!searchTerm) {
            return title;
        }

        const regex = new RegExp(searchTerm, 'gi');
        return title.replace(regex, (match) => `<mark>${match}</mark>`);
    };

    // Filter todos based on the title matching the search term
    const filteredTodos = todos.filter((todo) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDeleteAll = async () => {
        try {
            await deleteAllTodos();
            const updatedTodos = await getTodos();
            setTodos(updatedTodos);
        } catch (error) {
            console.error('Error deleting all todos:', error);
        }
    };

    return (
        <div className="todo-list-wrapper">
            <h2 className="todo-list-title">Todo-List</h2>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search todo by title"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="button-container">
                <Link to="/create" className="create-todo-button">
                    Create New Todo
                </Link>
                <Link className="" onClick={handleCreateTestData} to={''}>
                    Create Test Data
                </Link>
                <Link className="delete-all-todos-button" to={''} onClick={handleDeleteAll}>
                    Delete All Todos
                </Link>
            </div>
            <div className="card-container">
                {filteredTodos.map((todo) => (
                    <div key={todo.id} className="card">
                        <Link to={`/todo/${todo.id}`}>View Details</Link>
                        <div className="card-header">
                            <h3 dangerouslySetInnerHTML={{__html: highlightSearchTerm(todo.title)}}/>
                        </div>
                        <p>{todo.description}</p>
                        <div className="list-button-container">
                            <Link to={`/edit/${todo.id}`} className="edit-todo-button">
                                Edit
                            </Link>
                            <button className="delete-todo-button" onClick={() => handleDelete(todo.id)}>
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