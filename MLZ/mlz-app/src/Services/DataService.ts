export interface Todo {
    id: number;
    title: string;
    description: string;
    dueDate: Date;
    isCompleted: boolean;
}

export const getTodos = async (): Promise<Todo[]> => {
    try {
        const response = await fetch('http://localhost:3001/entities');
        return await response.json();
    } catch (error) {
        console.error('Error fetching entities:', error);
        return [];
    }
};