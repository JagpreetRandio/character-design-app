import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Sidebar from './components/Sidebar';
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

const client = new ApolloClient({
  // link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div className="App">
      <div className="main">
      <ApolloProvider client={client}>
        <BrowserRouter>
          {/* {isAuth ? */}

          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
          {/* // } */}
        </BrowserRouter>
        </ApolloProvider>
      </div>
    </div>
  );
}

// const App = () =>{
//   let userId = 0
//   const [isAuth, setIsAuth] = useState(false);
//   useEffect( () => {
//       getUserInfoApi();
//   }, [])

//   function getUserInfoApi() {
//       fetch('/api/auth/', {
//         method: 'get',
//         headers: {
//           'Content-Type': 'application/json'
//         }

//       })
//         .then(res => {
//           if (!res.ok) {
//             throw Error(res.statusText);
//           }
//           return res.json();
//         })
//         .then(data => {
//           setAuth(data.isAuth)
//           userId = data.id
//           console.log(userId)
//         })
//         .catch(error => {
//           console.error('Error:', error);
//         });
//   }
//   const setAuth = (val) => {
//     console.log(val)
//     setIsAuth(val)
//   }

//       console.log(isAuth)


export default App;

{
  /* <CharacterForm />
        <CharacterDetails />
        <BackstoryForm />
        <SettingForm />
        <CustomSectionForm /> */
}
