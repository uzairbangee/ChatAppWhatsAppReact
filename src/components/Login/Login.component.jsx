import React, {Fragment, useState} from "react";
import './Login.css'
import { Link } from "react-router-dom";
import {signIn} from "./../../Helper/auth";
import Alert from "../Alert/Alert.component";
import Loading from "../Loading/Loading.component";

const Login = () => {
    const [credential, setCred] = useState({
        email : "",
        password : ""
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = ({target}) => {
        setError('');
        setCred({...credential, [target.name] : target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        if(credential){
            try {
                await signIn(credential)
                setLoading(false);
            }
            catch(err){
                setError(err.message)
                setLoading(false);
            }
        }
    }

    return (
        <Fragment>
            <div className="simple-login-container">
                {
                    error &&  <Alert error={error}/>
                }
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-12 form-group">
                        <input type="email" className="form-control" name="email" onChange={handleChange} placeholder="Email" required/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <input type="password" placeholder="Enter your Password" name="password" onChange={handleChange} className="form-control" required/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 form-group">
                            {
                                loading
                                ?
                                <button type="submit" className="btn btn-block btn-login">
                                    <Loading type="spinner-border text-light"/>
                                </button>
                                :
                                <button type="submit" className="btn btn-block btn-login">Sign In</button>
                            }
                        </div>
                    </div>
                </form>
                <div className="row">
                    <div className="col-md-12">
                        New to Chat App ? <Link to="/signup">Sign Up</Link>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Login;