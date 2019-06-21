import React, { useState, useEffect } from 'react';
import { TodoModel } from './models/TodoModel'
import { Todo } from "./components/todo";

import "./App.css"

type FormElem = React.FormEvent<HTMLFormElement>

const dueDateMath = 5 * 5;

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
    <div className="App" >
      <link href="https://fonts.googleapis.com/css?family=PT+Sans+Narrow|Righteous|Roboto|Open+Sans+Condensed&display=swap" rel="stylesheet" />
      <h1>TaskList</h1>
      <form className="titlebox"onSubmit={handleSubmit}>
        <input
          type='text'
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        
      </form>
      <form className="textbox" onSubmit={handleSubmit}>
        <input
          type='text'
          value={value}
          onChange={e => setValue(e.target.value)}
          required
        />
        
      <button className="submit" type='submit'>Add Task</button>
      </form>
      <section className="tasks">
        {todos.map((todo: TodoModel, index: number) => (
          <Todo todo={todo} key={index} onComplete={() => completeTodo(index)} onRemove={() => removeTodo(index)} />
        ))}
      </section>
    </div>
  );
};

export { App };