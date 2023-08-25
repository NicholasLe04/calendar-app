import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    async function logout(e) {
        e.preventDefault();
    
        localStorage.setItem('token', undefined); 
        navigate('/login');
    }

    return (
        <>
            <h1>dashboard</h1>
            <button onClick={logout}>Log Out</button>
        </>
    );
}

export default Dashboard;