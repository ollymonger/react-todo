import React from "react";
import { TodoModel } from "../models/TodoModel";
import { makeStyles } from '@material-ui/core/styles';
import { Button, CardContent, CardActions, Grid } from "@material-ui/core"

interface TodoProps {
    todo: TodoModel;
    onComplete: () => void;
    onRemove: () => void;
}

const useStyles = makeStyles(theme => ({
    root: {
        background: '#f0f0f0',
        textShadow: '1px 1px blue'
    },
    root2: {
        background: '#f0f0f0',
        textShadow: '1px 1px red',

        marginRight: theme.spacing(2),
    },
    cards: {
        width: 200
    },
}));
const Todo: React.FunctionComponent<TodoProps> = ({ todo, onComplete, onRemove }) => {

    const classes = useStyles(1);
    return (
        <div >
            <Grid key={todo.title} item>
                <CardContent className={classes.cards} >
                    <p style={{ textDecoration: todo.complete ? 'line-through' : '' }}>{todo.title}</p>
                    <p style={{ textDecoration: todo.complete ? 'line-through' : '' }}>{todo.text}
                    </p> Due: <p>{todo.due.toDateString()}</p>
                </CardContent>
                <CardActions>
                    <Button className={classes.root} color="primary" onClick={onComplete}>{todo.complete ? 'Incomplete' : 'Complete'}</Button>
                    <Button className={classes.root2} color="secondary" onClick={onRemove}>Delete</Button>
                </CardActions>
            </Grid>
        </div>
    );
};

export { Todo };