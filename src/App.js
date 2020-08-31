import React, {Fragment, useContext, useState, useEffect} from 'react';
import './App.css';
import Login from './components/Login/Login.component';
import Signup from './components/Signup/Signup.component';
import Chat from './components/Chat/Chat.component';
import Loading from './components/Loading/Loading.component';
import { BrowserRouter, Routes } from 'react-router-dom';
import {PublicRoute, PrivateRoute} from "./components/HOC/Route.component";
import {ActionContext} from "./Context/GlobalState";
import {auth} from "./services/firebase";

function App() {
  const {dispatch, authenticated} = useContext(ActionContext);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   const checkUser = async () => {
  //     await auth().onAuthStateChanged((user) => {
  //       console.log(user);
  //       if (user) {
  //         dispatch({
  //           type: "LOGIN",
  //           payload: user
  //         })
  //         setLoading(false);
  //       } else {
  //         dispatch({
  //           type: "NOT_LOGIN"
  //         })
  //         setLoading(false);
  //       }
  //     })
  //   }

  //   checkUser();

  // }, [])

  return (
    <Fragment>
      <BrowserRouter>
        <div className="App">
          <Chat/>
          {/* {
            loading
            ?
            <Loading type="spinner-border"/>
            :
            <Routes>
              <PrivateRoute path="/" authenticated={authenticated} component={Chat}></PrivateRoute>
              <PublicRoute path="/signup" authenticated={authenticated} component={Signup}></PublicRoute>
              <PublicRoute path="/login" authenticated={authenticated} component={Login}></PublicRoute>
            </Routes>
          } */}
        </div>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
