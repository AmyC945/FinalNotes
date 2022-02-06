import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import Split from './composition/Split';
import 'bootstrap/dist/css/bootstrap.min.css';
import produce from 'immer';
import { useState, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Trash from './trash';


function Todo({ todo, index, markTodo, removeTodo }) {
  return (
    <div
      className="todo"
    >

      <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}><b>Note Content</b><br /><hr />{todo.text}</span>
      <div><Button variant="outline-success" onClick={() => markTodo(index)}>Done</Button>{' '}
        <Button variant="outline-danger" onClick={() => removeTodo(index)}>Trash</Button>
      </div>
    </div>
  );
}

function FormTodo({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}>
    <Form.Group>
      <Form.Label><b>Add Note</b></Form.Label>
      <textarea id="noteinput" class="form-control" style={{ width: '80%' }} value={value} onChange={e => setValue(e.target.value)} type="text" placeholder="Enter a new note" />
    </Form.Group>
    <Button id="addNote" variant="primary mb-3" type="submit">
      Submit
    </Button>
  </Form>
  );
}

function App() {
  const [todos, setTodos] = React.useState([
    {
      text: "Watch live lecture",
      isDone: false
    }
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
    localStorage.setItem('data', JSON.stringify(newTodos));
  };

  const markTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
    localStorage.setItem('data', JSON.stringify(newTodos));
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    const arr = [...todos];
    newTodos.splice(index, 1);
    arr.splice(index-1, index);
    setTodos(newTodos);
    localStorage.setItem('data', JSON.stringify(newTodos));
    localStorage.setItem('trash', JSON.stringify(arr));
  };
  useEffect(() => {
      if (typeof window !== 'undefined') {
        const getData = localStorage.getItem('data');

        if (getData !== '' && getData !== null) {
          return setTodos(JSON.parse(getData));
        }
        return setTodos([]);
      }
    }, 0);
  return (
    <>


    <main className='App'>


    <Split className='left' >

      <nav class="navbar navbar-light bg-light">
 <div class="container-fluid">
 <a class="navbar-brand">My Notes</a>
 </div>

 </nav>
      </Split>

    <Split className='right' flexBasis={4}>
    <div className = "hor">
 <Split className='left' >
      <ul>
  <li><a class="active" href="/">Notes</a></li>
      <li><a href="/trash">Trash</a></li>
 </ul>
 </Split>
 <Split className='right' flexBasis={4}>
 <div class="container my-3" id="container">
   <div class="form-group">
   <FormTodo addTodo={addTodo} />
   <div>
     {todos.map((todo, index) => (
       <Card>
         <Card.Body>
           <Todo
           key={index}
           index={index}
           todo={todo}
           markTodo={markTodo}
           removeTodo={removeTodo}
           />
         </Card.Body>
       </Card>
     ))}

   </div>
   <BrowserRouter>
 <Routes>
            <Route path="/trash" element={<Trash/>} />
 </Routes>
 </BrowserRouter>
</div></div>
 </Split></div>
      </Split>

    </main>

    </>
  );
};


export default App;
