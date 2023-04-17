import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import {LOGIN_USER} from '../utils/queries'

// Creating a functional component named Login with props as input parameter
function Login(props) {
  // Declaring state variables formState and login, and destructuring error from login
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  // Handling the form submit event and setting auth token if successful
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { email: formState.email, password: formState.password },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
  };

  // Handling the change in input fields and updating formState
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // JSX that will be rendered to the DOM
  return (
    <div className="container my-1">
      <Link to="/signup">← Go to Signup</Link>

      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email address:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

// Exporting the Login component as default
export default Login;
