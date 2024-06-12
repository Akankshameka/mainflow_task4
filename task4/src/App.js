import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck} from '@fortawesome/free-solid-svg-icons';
import './App.css';

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);
  const [style, setStyle] = useState("dark");
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      const editTodo = todos.find((i) => i.id === editId);
      const updatedTodos = todos.map((t) =>
        t.id === editTodo.id
          ? (t = { id: t.id, todo })
          : { id: t.id, todo: t.todo }
      );
      setTodos(updatedTodos);
      setEditId(0);
      setTodo("");
      return;
    }

    if (todo !== "") {
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      setTodo("");
    }
  };

  const handleDelete = (id) => {
    const delTodo = todos.filter((to) => to.id !== id);
    setTodos([...delTodo]);
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };
  const changeStyle = () => {
    document.getElementById("task").style.textDecoration = "line-through"
};
  return (
   <div className='App'>
    <div className='container'>
      <h1>ToDo List App</h1>
      <form className='todoform' onSubmit={handleSubmit}>
        <input type="text" value={todo}
        onChange={(e)=>setTodo(e.target.value)}/>
        <button id="go"type="submit">{editId?"Edit" :"Add"}
        </button>
      </form>
      <ul className='allTodos'>
        {todos.map((t)=>(
        <li className='singleTodo' >
         <span className='todoText' id="task" key={t.id} >
          {t.todo}
         </span>
         <button onClick={changeStyle}><FontAwesomeIcon icon={faCheck} /></button>
         <button onClick={()=>handleEdit(t.id)}>Edit</button>
         <button onClick={()=>handleDelete(t.id)}>Delete</button>
        </li>
        ))}
      </ul>
    </div>
   </div>
  );
}

export default App;
