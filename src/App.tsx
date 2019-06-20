import React, { useState, useEffect } from 'react';
import './App.css';
import Todo from './models/Todo'

type FormElem = React.FormEvent<HTMLFormElement>

const siteName = "TaskSheet";

export default function App() {
  const [value, setValue] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]); //stateful value > can change like a var


  useEffect(() => { // runs ones as no dependancies, just logic for component (like a func)
    const loaded = localStorage.getItem("todos");

    if (loaded == null) {
      return;
    }

    const parsed = JSON.parse(loaded);

    setTodos(parsed);
  }, []);

  useEffect(() => { // runs whenever todo changes 
    document.title = siteName + ` | You have ${todos.length} tasks`;
    localStorage.setItem("todos", JSON.stringify(todos));

  }, [todos]);


  const handleSubmit = (e: FormElem): void => {
    e.preventDefault();
    setValue("");
    addTodo(value, 1);
    console.log(value);
  }

  const addTodo = (text: string, index: number): void => { //called when clicks
    const newTodos: Todo[] = [...todos, { text, date: new Date().toLocaleDateString(), complete: false }];
    setTodos(newTodos);
  };

  const completeTodo = (index: number): void => {
    const newTodos: Todo[] = [...todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  }

  const removeTodo = (index: number): void => {
    const newTodos: Todo[] = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }
  
  return (
    <div className="App" >
      <link href="https://fonts.googleapis.com/css?family=PT+Sans+Narrow|Righteous|Roboto&display=swap" rel="stylesheet" />
      <h1>TaskSheet List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={value}
          onChange={e => setValue(e.target.value)}
          required
        />
        <button className="submit" type='submit'>Add Task</button>
      </form>
      <section className="tasks">
        {todos.map((todo: Todo, index: number) => (
          <div className="task1" key={index} style={{ textDecoration: todo.complete ? 'line-through' : '' }}>
            <p>{todo.text}</p> <p className="date">{todo.date}</p>
            <button className="button" onClick={() => completeTodo(index)}>{todo.complete ? 'Incomplete' : 'Complete'}</button>
            <button className="button1" onClick={() => removeTodo(index)}>Delete</button>
          </div>
        ))}
      </section>

    </div>
  );
}
