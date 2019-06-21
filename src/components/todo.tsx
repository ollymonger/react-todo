import React from "react";
import { TodoModel } from "../models/TodoModel";

import { Button, TextField, Container, Grid } from "@material-ui/core"

interface TodoProps {
    todo: TodoModel;

    onComplete: () => void;
    onRemove: () => void;
}

const Todo: React.FunctionComponent<TodoProps> = ({ todo, onComplete, onRemove }) => {
    return (
        <div style={{ textDecoration: todo.complete ? 'line-through' : '' }}>

            <p>{todo.title}</p><p>{todo.text}</p> Due: <p>{todo.due.toDateString()}</p>
            <Button color="primary" onClick={onComplete}>{todo.complete ? 'Incomplete' : 'Complete'}</Button>
            <Button color="secondary" onClick={onRemove}>Delete</Button>

        </div>
    );
};

export { Todo };