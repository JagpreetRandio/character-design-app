import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { MUTATION_ADD_USER } from '../utils/queries';

function Signup() {
const [formState, setFormState] = useState({ name: '',  email: '', password: '' });
const [addUser, { error }] = useMutation(MUTATION_ADD_USER);

const handleFormSubmit = async (event) => {
event.preventDefault();
try {
const { data } = await addUser({
variables: formState
});
Auth.login(data.addUser.token);
} catch (e) {
console.error(e);
}
};

const handleChange = (event) => {
const { name, value } = event.target;
setFormState({
...formState,
[name]: value,
});
};

return (
<div className="container my-1">
<Link to="/">← Go to Login</Link>

<h2>Signup</h2>
  <form onSubmit={handleFormSubmit}>
    <div className="flex-row space-between my-2">
      <label htmlFor="name">First Name:</label>
      <input
        placeholder="First"
        name="name"
        type="text"
        id="name"
        value={formState.name}
        onChange={handleChange}
      />
    </div>
    {/* <div className="flex-row space-between my-2">
      <label htmlFor="lastName">Last Name:</label>
      <input
        placeholder="Last"
        name="lastName"
        type="text"
        id="lastName"
        value={formState.lastName}
        onChange={handleChange}
      />
    </div> */}
    <div className="flex-row space-between my-2">
      <label htmlFor="email">Email:</label>
      <input
        placeholder="youremail@test.com"
        name="email"
        type="email"
        id="email"
        value={formState.email}
        onChange={handleChange}
      />
    </div>
    <div className="flex-row space-between my-2">
      <label htmlFor="password">Password:</label>
      <input
        placeholder="******"
        name="password"
        type="password"
        id="password"
        value={formState.password}
        onChange={handleChange}
      />
    </div>
    {
      error && (
        <div className="my-3 p-3 bg-danger text-white">
          {error.message}
        </div>
      )
    }
    <div className="flex-row flex-end">
      <button type="submit">Submit</button>
    </div>
  </form>
</div>
);
}

export default Signup;