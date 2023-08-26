import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "../../Calendar/Calendar";

import "./Dashboard.css";

function Dashboard() {
    const navigate = useNavigate();

    const [ currentUser, setCurrentUser ] = useState("");

    useEffect(() => {
        async function getUser() {
            try {
                await axios.post("http://localhost:6969/user/isloggedin", {},{
                        headers: {
                            "x-access-token": localStorage.getItem('token'),
                        },
                    });
                let user = await axios.post("http://localhost:6969/user/current", {
                    token: localStorage.getItem("token")
                });
                setCurrentUser(user.data.username);
            } catch (err) {
                
                navigate('/login')
            }
        }
        getUser();
    }, []);

    async function logout(e) {
        e.preventDefault();
        localStorage.setItem('token', undefined); 
        navigate('/login');
    }

    return (
        <>  
            <div className="header">
                <p className="title">Calendar</p>
                <p className="user">Welcome, {currentUser}!</p>
                <button className="logout-button" onClick={logout}>Log Out</button>
            </div>
            <div className="calendar-div">
                <Calendar/>
            </div>
        </>
    );
}

export default Dashboard;