export interface Todo {
    id: number;
    title: string;
    description: string;
    dueDate: Date | null;
    isCompleted: boolean;
    lengthInDays: number;
}