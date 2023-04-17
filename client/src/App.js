// Import necessary modules
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Sidebar from './components/Sidebar';
import Header from "./components/Header";
import BackstoryForm from './components/BackstoryForm';
import Login from "./components/Login";
import Signup from "./components/Signup";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import CharacterDetails from "./components/CharacterDetails";

// Import styles
import 'bootswatch/dist/sketchy/bootstrap.min.css'; // Added this :boom:
import './assets/css/bootstrap.css';
import './assets/css/index.css'



// Create a HTTP link to the GraphQL server
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

// Create an auth link that adds the authorization token to the headers
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create a new Apollo client with the auth link and in-memory cache
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Define the main App component
function App() {
  // Check if the user is authenticated by checking for the presence of the token in local storage
  const isAuth = localStorage.getItem('id_token');
  // Render the app's UI

  return (
    <div className="App">
        <Header />
      <div className="main">
        <ApolloProvider client={client}>
          <BrowserRouter>
            {isAuth ? (
              <>
                <Sidebar />
                <Routes>
              
                  <Route path="/" element={<Homepage />} />
              
                <Route path={`/character-details/:CharacterId`} element={<CharacterDetails />} />

                  <Route path="/backstory-form" element={<BackstoryForm />} />
                </Routes>
              </>
            ) : (
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            )}
          </BrowserRouter>
        </ApolloProvider>
      </div>
    </div>
  );
}

// Export the App component as the default export
export default App;
