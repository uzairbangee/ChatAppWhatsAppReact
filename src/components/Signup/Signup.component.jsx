import React, {Fragment, useContext, useState, useEffect} from "react";
import './Signup.css'
import { Link } from "react-router-dom";
// import {ActionContext} from "./../../Context/GlobalState";
import {signUp} from "./../../Helper/auth";
import Alert from "../Alert/Alert.component";
import Loading from "../Loading/Loading.component";

const Signup = () => {

    // const {dispatch} = useContext(ActionContext);
    const [credential, setCred] = useState({
        email : "",
        password : "",
        confirm_password : ""
    });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = ({target}) => {
        setMessage('');
        setCred({...credential, [target.name] : target.value});

    }

    useEffect(() => {
        if(credential.password !== credential.confirm_password)
            setMessage("Password and Confirm Password have to be same");
        else
            setMessage('');
    }, [credential])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        if(credential && credential.password === credential.confirm_password){
            try {
                await signUp({email : credential.email, password : credential.password})
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
                <h2>Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <input type="email" name="email" className="form-control" placeholder="Email" autoComplete="false" onChange={handleChange} required/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <input type="password" name="password" placeholder="Enter your Password" className="form-control" autoComplete="false" onChange={handleChange} required/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <input type="password" name="confirm_password" placeholder="Confirm Password" className="form-control" autoComplete="false" onChange={handleChange} required/>
                        </div>
                            {message && <p className="message">{message}</p>}
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
                                <button type="submit" className="btn btn-block btn-login">Sign Up</button>
                            }
                        </div>
                    </div>
                    </form>
                <div className="row">
                    <div className="col-md-12">
                        Already have an Account ? <Link to="/login">Sign In</Link>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Signup;