import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../utils/auth';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await signup(username, password);
      // Redirect user to home page upon successful signup
      history.push('/');
    } catch (err) {
      setError('Error creating account');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        {error && <div>{error}</div>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
