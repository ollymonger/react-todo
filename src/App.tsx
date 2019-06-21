import React, { useState, useEffect } from 'react';
import { TodoModel } from './models/TodoModel'
import { Todo } from "./components/todo";

import { Button, TextField, Container, AppBar, Toolbar, IconButton, Typography, InputBase } from "@material-ui/core"
import MenuIcon from '@material-ui/icons/Menu';
import { fade, makeStyles } from '@material-ui/core/styles';

import SearchIcon from '@material-ui/icons/Search';

import './blankcss.css';

type FormElem = React.FormEvent<HTMLFormElement>

const dueDateMath = 5;

export interface taskProps {
  taskList: TodoModel;
}

const App: React.FunctionComponent = props => {
  const [value, setValue] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [todos, setTodos] = useState<TodoModel[]>([]); //stateful value > can change like a var

  useEffect(() => { // runs ones as no dependancies, just logic for component (like a func)
    const loaded = localStorage.getItem("todos");

    if (loaded == null) {
      return;
    }

    const parsed: ({ title: string, text: string, complete: boolean, due: string, created: string })[] = JSON.parse(loaded);

    const datesTransformed: TodoModel[] = parsed.map(value => { //loads the data
      return {
        title: value.title,
        text: value.text,
        complete: value.complete,
        due: new Date(value.due),
        created: new Date(value.created),
      };
    });

    setTodos(datesTransformed);
  }, []);

  useEffect(() => { // runs whenever todo changes 
    document.title = `TaskList | You have ${todos.length} tasks`;

    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e: FormElem): void => {
    e.preventDefault();
    setValue("");
    setTitle("");
    addTodo(title, value, '');
    console.log(value);
  }

  const addTodo = (title: string, text: string, index: any): void => { //called when clicks
    const created = new Date();

    const due = new Date();
    due.setDate(created.getDate() + dueDateMath);

    const newTodos: TodoModel[] = [...todos, { title, text, due, complete: false, created }];

    setTodos(newTodos);
  };

  const completeTodo = (index: number): void => {
    const newTodos: TodoModel[] = [...todos];
    newTodos[index].complete = !newTodos[index].complete;

    setTodos(newTodos);
  }

  const removeTodo = (index: number): void => {
    const newTodos: TodoModel[] = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  return (
    <div>
      <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Material-UI
          </Typography>
          <div >
            <div >
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"          
              inputProps={{ 'aria-label': 'Search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
    <Container maxWidth="sm">
        <link href="https://fonts.googleapis.com/css?family=PT+Sans+Narrow|Righteous|Roboto|Open+Sans+Condensed|Material+Icons&display=swap" rel="stylesheet" />
        <h1 className="headericon">vertical_split</h1><h1>TaskList</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            required
            id="standard-required"
            label="Todo Title"
            helperText="Type your task title here."
            type='text'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <TextField
            required
            id="standard-required"
            label="Todo Body"
            helperText="Type your task title here."
            type='text'
            value={value}
            onChange={e => setValue(e.target.value)}

          />

          <Button type='submit' variant="outlined" color="secondary">Add Task</Button>
        </form>
        <section>
          {todos.map((todo: TodoModel, index: number) => (
            <Todo todo={todo} key={index} onComplete={() => completeTodo(index)} onRemove={() => removeTodo(index)} />
          ))}
        </section>
        </Container>
    </div>
  );
};

export { App };