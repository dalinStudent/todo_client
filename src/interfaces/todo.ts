export interface Todo {
    id?: string;
    todo: string;
    isCompleted: boolean;
    readonly createdDt: string;
}