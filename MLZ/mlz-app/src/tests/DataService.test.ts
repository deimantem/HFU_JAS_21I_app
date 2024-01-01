import {createTodo, deleteTodo, getTodoById, getTodos, updateTodo} from "../services/DataService";
import {Todo} from "../interfaces/Todo";
import fetchMock from 'jest-fetch-mock';

describe('DataService', () => {
    const mockTodo: Todo = {
        id: 1,
        title: 'Test Todo',
        description: 'Test description',
        dueDate: new Date(Date.now()),
        isCompleted: false,
        lengthInDays: 3,
    };

    fetchMock.enableMocks();

    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('should fetch todos', async () => {
        fetchMock.mockResponseOnce(JSON.stringify([{...mockTodo, dueDate: mockTodo.dueDate?.toISOString()}]));

        const todos = await getTodos();

        expect(todos).toEqual([{...mockTodo, dueDate: mockTodo.dueDate?.toISOString()}]);
        expect(fetch).toHaveBeenCalledWith('http://localhost:3001/entities');
    });

    it('should fetch a todo by id', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({...mockTodo, dueDate: mockTodo.dueDate?.toISOString()}));

        const todo = await getTodoById(1);

        expect(todo).toEqual({...mockTodo, dueDate: mockTodo.dueDate?.toISOString()});
        expect(fetch).toHaveBeenCalledWith('http://localhost:3001/entities/1');
    });

    it('should update a todo', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({}));

        await updateTodo(1, mockTodo);

        expect(fetch).toHaveBeenCalledWith('http://localhost:3001/entities/1', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mockTodo),
        });
    });

    it('should delete a todo', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({}));

        await deleteTodo(1);

        expect(fetch).toHaveBeenCalledWith('http://localhost:3001/entities/1', {
            method: 'DELETE',
        });
    });

    it('should create a todo', async () => {
        const responseTodo = {...mockTodo, dueDate: mockTodo.dueDate?.toISOString()};
        fetchMock.mockResponseOnce(JSON.stringify(responseTodo));

        const newTodo = await createTodo(mockTodo);

        expect(newTodo).toEqual(responseTodo);
        expect(fetch).toHaveBeenCalledWith('http://localhost:3001/entities', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mockTodo),
        });
    });
});