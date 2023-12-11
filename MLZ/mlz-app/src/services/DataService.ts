import {Todo} from "../interfaces/Todo";

export const getTodos = async (): Promise<Todo[]> => {
    try {
        const response = await fetch('http://localhost:3001/entities');
        return await response.json();
    } catch (error) {
        console.error('Error fetching entities:', error);
        return [];
    }
};

export const getTodoById = async (id: number): Promise<Todo> => {
    try {
        const response = await fetch(`http://localhost:3001/entities/${id}`);

        if (!response.ok) {
            console.error('Todo not found')
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching entity by id:', error);
        throw error;
    }
};

export const updateTodo = async (id: number, todo: Todo): Promise<void> => {
    try {
        await fetch(`http://localhost:3001/entities/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        });
    } catch (error) {
        console.error('Error updating entity:', error);
    }
};

export const deleteTodo = async (id: number): Promise<void> => {
    try {
        await fetch(`http://localhost:3001/entities/${id}`, {
            method: 'DELETE',
        });
    } catch (error) {
        console.error('Error deleting entity:', error);
    }
};

const apiUrl = 'http://localhost:3001/entities';

export const createTodo = async (newTodo: Todo): Promise<Todo> => {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
    });

    if (!response.ok) {
        throw new Error('Failed to create todo');
    }

    return response.json();
};