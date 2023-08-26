import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        async function checkLogin() {
            if (localStorage.getItem('token') === undefined) {
                return;
            }
            
            try {
                await axios.post("http://localhost:6969/user/isloggedin", {},{
                    headers: {
                        "x-access-token": localStorage.getItem('token'),
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
            let user = await axios.post("http://localhost:6969/user/login", {
                username: document.getElementById("username").value,
                password: document.getElementById("password").value
            })
            localStorage.setItem("token", user.data.token);
            navigate('/dashboard');
        } catch(err){
            alert(err.response.data.message);
        }
    }

    async function signup(e) {

        e.preventDefault();
        try {
            let result = await axios.post("http://localhost:6969/user/signup", {
                username: document.getElementById("newUsername").value,
                password: document.getElementById("newPassword").value,
            });
            localStorage.setItem('token', result.data.token);
            navigate('/dashboard');
        } catch(err){
            alert(err.response.data.message);
        }
    }


    return (
        <>
            <div className="Login">
                <h1>Login</h1>
                <form onSubmit={login}> 
                <label for="username">Username:</label><br/>
                <input type="text" id="username" name="username"/><br/>
                <label for="password">Password:</label><br/>
                <input type="password" id="password" name="password"/><br/>
                <input type="submit"/>
                </form>
            </div>

            <div className="Signup">
                <h1>Signup</h1>
                <form onSubmit={signup}> 
                <label for="newUsername">Username:</label><br/>
                <input type="text" id="newUsername" name="newUsername"/><br/>
                <label for="newPassword">Password:</label><br/>
                <input type="password" id="newPassword" name="newPassword"/><br/>
                <input type="submit"/>
            </form>
        </div>
        </>
    );
}

export default Login;