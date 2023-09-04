import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

import "./Login.css";

const BASE_URL = "https://uniplan-api.vercel.app";

function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        async function checkLogin() {
            if (localStorage.getItem('token') === undefined) {
                return;
            }
            
            try {
                await axios.post(`${BASE_URL}/user/isloggedin`, {},{
                    headers: {
                        "jwt-auth-token": localStorage.getItem('token'),
                    },
                });
                navigate('/dashboard');
            } catch (err) {
                return;
            }
        }

        checkLogin();
    }, []);


    async function login(e) {
        e.preventDefault();
        try {
            let user = await axios.post(`${BASE_URL}/user/login`, {
                username: document.getElementById("username").value,
                password: document.getElementById("password").value
            })
            localStorage.setItem("token", user.data.token);
            navigate('/dashboard');
        } catch(err){
            alert(err);
        }
    }

    async function signup(e) {

        e.preventDefault();
        try {
            let result = await axios.post(`${BASE_URL}/user/signup`, {
                username: document.getElementById("newUsername").value,
                password: document.getElementById("newPassword").value,
            });
            localStorage.setItem('token', result.data.token);
            navigate('/dashboard');
        } catch(err){
            alert(err);
        }
    }


    return (
        <div className="login-signup-container-container">
            <h1 style={{ fontWeight: "900", fontSize: "50px", margin: "0", position: "fixed", top: "3%", left: "3%" }}>UNIPLAN</h1>
            <div className="login-signup-container">
                <div className="Login">
                    <h1>LOG IN</h1>
                    <form onSubmit={login}> 
                        <input type="text" id="username" name="username" placeholder="USERNAME" defaultValue=""/><br/>
                        <input type="password" id="password" name="password" placeholder="PASSWORD" defaultValue=""/><br/>
                        <button type="submit">Log In</button>
                    </form>
                </div>
                <div className="Signup">
                    <h1>SIGN UP</h1>
                    <form onSubmit={signup}> 
                        <input type="text" id="newUsername" name="newUsername" placeholder="USERNAME" defaultValue=""/><br/>
                        <input type="password" id="newPassword" name="newPassword" placeholder="PASSWORD" defaultValue=""/><br/>
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;