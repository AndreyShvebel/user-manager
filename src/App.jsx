import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditUser from "./components/EditUser";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import UsersList from "./components/UsersList";
import CreateUser from './components/CreateUser';


function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route path='' element={<Header />} >
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/users-list' element={<UsersList />} />
          <Route path='/edit-user/:id' element={<EditUser />} />
          <Route path='/create-user/' element={<CreateUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
