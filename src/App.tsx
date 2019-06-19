import React, { useState, useEffect } from 'react';
import './App.css';
import iTodo from './models/iTodo'

type FormElem = React.FormEvent<HTMLFormElement>

export default function App() {
  const [value, setValue] = useState<string>('');
  const [todos, setTodos] = useState<iTodo[]>([]); //stateful value > can change like a var


  useEffect(() => { // runs ones as no dependancies, just logic for component (like a func)
    const loaded = localStorage.getItem("todos");

    if (loaded == null) {
      return;
    }

    const parsed = JSON.parse(loaded);

    setTodos(parsed);
  }, [])

  useEffect(() => { // runs whenever todo changes
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e: FormElem): void => {
    e.preventDefault();
    setValue("");
    addTodo(value);
    console.log(value);
  }

  const addTodo = (text: string): void => { //called when clicks
    const newTodos: iTodo[] = [...todos, { text, complete: false }];
    setTodos(newTodos);
  };

  const completeTodo = (index: number): void => {
    const newTodos: iTodo[] = [...todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  }

  const removeTodo = (index: number): void => {
    const newTodos: iTodo[] = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  return (
    <div className="App" >
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={value}
          onChange={e => setValue(e.target.value)}
          required
        />
        <button type='submit'>Add Todo</button>
      </form>
      <section>
        {todos.map((todo: iTodo, index: number) => (
          <div key={index} style={{ textDecoration: todo.complete ? 'line-through' : '' }}>
            {todo.text}
            <button onClick={() => completeTodo(index)}>{todo.complete ? 'Incomplete' : 'Complete'}</button>
            <button onClick={() => removeTodo(index)}>X</button>
          </div>
        ))}
      </section>

    </div>
  );
}
