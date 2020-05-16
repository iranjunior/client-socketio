import React from 'react';
import io from 'socket.io-client';
import logo from './logo.svg';
import './App.css';

function App() {
  const socket = io('http://localhost:3333');
  
  socket.on('recivedMessage', (data) => {
    const messages = document.querySelector('#messages');
    console.log('data:', data)
    messages.innerHTML = `<span><strong>${data.author}: </strong>${data.message}</span>`;
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;
    console.log('entrouaqui', {name, message})
    socket.emit('sendMessage', {
      author: name,
      message,
    });
  };

  return (
    <div className="App">
    <div id="messages"></div>
    <form>
      <input id="name" placeholder="Digite seu nome" />
      <button type="submit" onClick={handleSubmit}>
        Enviar
      </button>
      <input id="message" placeholder="Digite sua message" multiple />
    </form>
    </div>
  );
}

export default App;
