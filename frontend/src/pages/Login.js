import React, { useState } from 'react';
import './Login.css';
import logo from '../assets/logo.svg';

import api from '../services/api';

export default function Login({ history }) {
  const [username, setUsername] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await api.post('/developers', {
      username
    });

    const { _id } = response.data;

    history.push(`/developer/${_id}`);
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Tindev" />
        <input 
          type="text" 
          placeholder="Digite seu usuário do Github"
          value={username}
          onChange={event => setUsername(event.target.value)}
          />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}