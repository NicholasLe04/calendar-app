import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Calendar from "../Calendar/Calendar";

function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        async function getUser() {
            let user = await axios.post("http://localhost:6969/user/current", {
                token: localStorage.getItem("token")
            });

            console.log(user.data);
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
            <h1>Calendar</h1>
            <Calendar/>
            <button onClick={logout}>Log Out</button>
        </>
    );
}

export default Dashboard;