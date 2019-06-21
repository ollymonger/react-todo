import React from "react";
import { TodoModel } from "../models/TodoModel";

interface TodoProps {
    todo: TodoModel;

    onComplete: () => void;
    onRemove: () => void;
}

const Todo: React.FunctionComponent<TodoProps> = ({ todo, onComplete, onRemove }) => {
    return (
        <div className="task1" style={{ textDecoration: todo.complete ? 'line-through' : '' }}>
            <p className="todoTitle">{todo.title}</p><p className="todoBody">{todo.text}</p> Due: <p className="date">{todo.due.toDateString()}</p>
            <button className="button" onClick={onComplete}>{todo.complete ? 'Incomplete' : 'Complete'}</button>
            <button className="button1" onClick={onRemove}>Delete</button>
        </div>
    );
};

export { Todo };