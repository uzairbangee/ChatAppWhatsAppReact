import React, {Fragment, useContext, useState, useEffect} from 'react';
import './App.css';
import Login from './components/Login/Login.component';
import Signup from './components/Signup/Signup.component';
import Chat from './components/Chat/Chat.component';
import Loading from './components/Loading/Loading.component';
import { BrowserRouter, Routes } from 'react-router-dom';
import {PublicRoute, PrivateRoute} from "./components/HOC/Route.component";
import {ActionContext} from "./Context/GlobalState";
import {auth, db} from "./services/firebase";

const App = () => {
  const {dispatch, authenticated} = useContext(ActionContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let unsubscribe = false;
    const checkUser = async () => {
      await auth().onAuthStateChanged((user) => {

        if (!unsubscribe && user) {
          const newname = user.email.split('@');

          db.collection("users").onSnapshot(async (snapshot) => {
            const user_exist = snapshot.docs.filter(snap => snap.data().email === user.email);
            if(user_exist.length === 0){
              console.log('pushed')
              await db.collection("users").add({
                email: user.email,
                name: newname[0],
                uid: user.uid,
              });
            }
          });

          dispatch({
            type: "LOGIN",
            payload: user
          })

          setLoading(false);

        } else {
          dispatch({
            type: "NOT_LOGIN"
          })
          setLoading(false);
        }
      })
    }
    
    checkUser();
    
    return () => {
      unsubscribe = true;
    }

  }, [])

  return (
    <Fragment>
      <BrowserRouter>
        <div className="App">
          {
            loading
            ?
            <div className="loader">
              <Loading type="spinner-border text-success"/>
            </div>
            :
            <Routes>
              <PrivateRoute path="/" authenticated={authenticated} component={Chat}></PrivateRoute>
              <PublicRoute path="/signup" authenticated={authenticated} component={Signup}></PublicRoute>
              <PublicRoute path="/login" authenticated={authenticated} component={Login}></PublicRoute>
            </Routes>
          }
        </div>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
