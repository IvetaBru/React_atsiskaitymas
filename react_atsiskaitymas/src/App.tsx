import { Route, Routes } from "react-router";
import MainOutlet from "./components/outlets/MainOutlet";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import UserPage from "./components/pages/UserPage";



const App = () => {
  
  return (
    <>
      <Routes>
        <Route path="" element={<MainOutlet/>}>
          <Route index element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/user" element={<UserPage />}/>
        </Route>
      </Routes>
    </>
  )
}

export default App;
