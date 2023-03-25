import React, {useEffect, useState} from 'react';
import './login.sass'
import axios from "axios";
import {useNavigate} from "react-router";
import {NavLink} from "react-router-dom";

const Login = (props) => {
    const [userData, setUserData] = useState([]);

    localStorage.clear();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [emailError, setEmailError] = useState('e-mail cannot be empty!');
    const [passwordError, setPasswordError] = useState('password cannot be empty!');

    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);

    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        if (emailError || passwordError ) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    },[emailError, passwordError])

    const blurHandler = (e) =>  {
        switch (e.target.name){
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
        }

    };

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('incorrect e-mail')
            if(!e.target.value){
                setEmailError('e-mail cannot be empty!')
            }
        }
        else{
            setEmailError("")
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if (e.target.value.length < 4) {
            setPasswordError('the password is too short!')
            if(!e.target.value){
                setPasswordError('password cannot be empty!')
            }
        }else{
            setPasswordError("")
        }
    };
    const handleChangeEmail = event => {
        setEmail(event.target.value);
    };
    const handleChangePassword = event => {
        setPassword(event.target.value);
    };

    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios({
            method: "post",
            url: "http://localhost:8080/api/token",
            data: {email, password},
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
                setEmail('');
                setPassword('');
                localStorage.setItem('token', res.data.access_token);
                navigate(`../schedule`, { replace: true });
                props.logIn()
                const userToken = localStorage.getItem('token');

                const requireUserData = () => axios.get(
                    `http://localhost:8080/api/users/me`,
                    {
                        headers: {"Authorization" : `Bearer ${userToken}`}
                    })
                    .then(res => {
                        console.log(res.data);
                        setUserData(res.data);
                        localStorage.setItem('userEmail', res.data.email);
                        localStorage.setItem('userName', res.data.name);
                        localStorage.setItem('userSurname', res.data.surname);
                    })
                requireUserData();

            })
            .catch(function (error) {
                let ErrorMessage = document.getElementById('FailedAuth');
                ErrorMessage.textContent = error.response.data.detail;
            });
    };

    return (
        <div className="main-container">
            <div className="main-login">
                <form className="px-4 py-3">
                    <div className="mb-3">
                        <label  className="form-label ">E-mail</label>
                        {(emailDirty && emailError) && <div className="error" style={{color: "red"}}>{emailError}</div>}
                        <input onChange={e => emailHandler(e) && handleChangeEmail} value={email} onBlur={e => blurHandler(e)} name="email" type="email" className="form-control form-control-lg" placeholder="email@example.com"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleDropdownFormPassword1" className="form-label">Password</label>
                        {(passwordDirty && passwordError) && <div className="error" style={{color: "red"}}>{passwordError}</div>}
                        <input type="password" className="form-control form-control-lg" onChange={e => passwordHandler(e) && handleChangePassword} value={password} onBlur={e => blurHandler(e)} name="password"
                               placeholder="Password"/>
                    </div>
                    <div className="mb-0">
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="dropdownCheck"/>
                            <label className="form-check-label " htmlFor="dropdownCheck">
                                Remember me
                            </label>
                        </div>
                    </div>
                    <button disabled={!formValid} onClick={handleSubmit} className="register-button">Log In</button>

                    <div id="FailedAuth"> </div>
                </form>
            </div>

        </div>
    );
};


export default Login;
