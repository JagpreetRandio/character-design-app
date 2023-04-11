import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Sidebar from './components/Sidebar';
import Header from "./components/Header";
// import CharacterForm from './components/CharacterForm';
// import CharacterDetails from './components/CharacterDetails';
// import BackstoryForm from './components/BackstoryForm';
// import SettingForm from './components/SettingForm';
// import CustomSectionForm from './components/CustomSectionForm';
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
import 'bootswatch/dist/sketchy/bootstrap.min.css'; // Added this :boom:
import './assets/css/bootstrap.css';



const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});



function App() {
  const isAuth = true; // replace with your authentication logic

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
                

                  {/* <Route path="/character-form" element={<CharacterForm />} /> */}

                <Route path={`/character-details/:CharacterId`} element={<CharacterDetails />} />

                  {/* <Route path="/backstory-form" element={<BackstoryForm />} /> */}

                  {/* <Route path="/setting-form" element={<SettingForm />} />*/}
                  {/* <Route path="/custom-section-form" element={<CustomSectionForm />} /> */}
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

export default App;
