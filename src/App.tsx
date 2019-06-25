import React, { useState, useEffect } from 'react';
import { TodoModel } from './models/TodoModel'
import { Todo } from "./components/todo";
import { Button, TextField, Container } from "@material-ui/core"
import { MenuBar } from './components/MenuBar'

import 'first-input-delay';
import "firebase/performance";
import './blankcss.css';

type FormElem = React.FormEvent<HTMLFormElement>



export interface taskProps {
  taskList: TodoModel;
}

const App: React.FunctionComponent = props => {
  const [value, setValue] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [dueMath, setDueMath] = useState<string>('');
  const [todos, setTodos] = useState<TodoModel[]>([]); //stateful value > can change like a var

  useEffect(() => { // runs ones as no dependancies, just logic for component (like a func)
    const loaded = localStorage.getItem("todos");

    if (loaded == null) {
      return;
    }

    const parsed: ({ title: string, dueMath: string, text: string, complete: boolean, due: string, created: string })[] = JSON.parse(loaded);

    const datesTransformed: TodoModel[] = parsed.map(value => { //loads the data
      return {
        title: value.title,
        dueMath: value.dueMath,
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

  const handleSubmit = (e: FormElem): void => { //handleSubmit
    e.preventDefault();
    setValue("");
    setTitle("");
    addTodo(title, dueMath, value);
    console.log(value);
  }

  const addTodo = (title: string, dueMath: string, text: string): void => { //called when clicks
    const created = new Date();

    const due = new Date();
    const dueM = Number(dueMath);
    due.setDate(created.getDate() + dueM);

    const newTodos: TodoModel[] = [...todos, { title, dueMath, text, due, complete: false, created }];
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
      <MenuBar />
      <Container maxWidth="sm">
        <link href="https://fonts.googleapis.com/css?family=PT+Sans+Narrow|Righteous|Roboto|Open+Sans+Condensed|Material+Icons&display=swap" rel="stylesheet" />
        <h1 className="headericon">vertical_split</h1><h1>TaskList</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            required
            id="standard-required"
            label="Todo Title"
            helperText="Type your task title here."
            multiline
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
          <TextField
            className="daysText"
            required
            id="standard-required"
            label="Due In(Days)"
            helperText="Insert your due in days here."
            type='number'
            value={dueMath}
            onChange={e => setDueMath(e.target.value)}

          />
          <Button type='submit' variant="outlined" color="secondary">Add Task</Button>
        </form>
        <section>
          {todos.map((todo: TodoModel, index: number) => (
            
            <Todo todo={todo} key={index}  onComplete={() => completeTodo(index)} onRemove={() => removeTodo(index)} />
            
          ))}
                    
        </section>
      </Container>
    </div >
  );
};

export { App };