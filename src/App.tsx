import React, { useState, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import iTodo from './models/iTodo'

type FormElem = React.FormEvent<HTMLFormElement>

export default function App() {
  const [value, setValue] = useState<string>('');
  const [todos, setTodos] = useState<iTodo[]>([]);
  const handleSubmit = (e: FormElem): void => {
    e.preventDefault();
    setValue("");
    addTodo(value);
    console.log(todos);
  }
  const addTodo = (text: string): void => {
    const newTodos: iTodo[] = [...todos, { text, complete: false }];
    setTodos(newTodos);
  };

  const completeTodo = (index: number): void => {
    const newTodos: iTodo[] = todos;
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  }

  const updateTodo = (index: number): void => {
    const newTodo: iTodo[] = todos;
    if(newTodo[index].complete === true){
      console.log("COMPLETE. NOW COMPLETE.")
    }
  }

  const removeTodo = (index: number): void => {
    const newTodos: iTodo[] = todos;
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }
  return (
    <div className="App">
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
        {todos.map((todo: iTodo, index:number) => 
          <div key={index} style={{ display: 'relative', textAlign:'center' }}>
              <div style={{textDecoration:todo.complete ? 'line-through' : ''}}>
                {todo.text} <button onClick={()=> completeTodo(index)}>{todo.complete ? 'Incomplete' : 'Complete'}</button>
                <button onClick={()=> removeTodo(index)}>X</button>
              </div>
          </div>
        )}
      </section>
      
    </div>
  );
}
