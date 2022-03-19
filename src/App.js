import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {

  const [users, setUsers] = useState([]);
  const nameRef = useRef();
  const emailRef = useRef();


  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [])

console.log(users);
  const handleSubmit = e => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const newUser = {name: name, email: email}
    
    fetch('http://localhost:5000/users', {
      method: "post",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(newUser)
    })
    .then(res => res.json())
    .then(data => {
      const addedUser = data;
      const newUser = [...users, addedUser];
      setUsers(newUser);
    });
    nameRef.current.value = '';
    emailRef.current.value = '';
    
  }


  return (
    <div className="App">
      <h1>Total Users: {users.length}</h1>
      <form onSubmit={handleSubmit}>
        <input ref={nameRef} type="text" placeholder='Name' />
        <input ref={emailRef} type="email" placeholder='Email' />
        <input type="submit" value="Submit" />
      </form>
      <ul>
        {
          users.map(user => <li key={user.id}>{user.name} {user.email}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
