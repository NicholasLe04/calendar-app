import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "../../Calendar/Calendar";

import AddEventPopUp from "../../Calendar/Event/AddEventPopUp";
import EventInfoPopUp from "../../Calendar/Event/EventInfoPopUp";
import "./Dashboard.css";
import DimmedOverlay from "../../reusables/DimmedOverlay/DimmedOverlay";

function Dashboard() {
    const navigate = useNavigate();
    const [ currentUser, setCurrentUser ] = useState({});
    const [ selectedEvent, setSelectedEvent ] = useState();
    const [ selectedDate, setSelectedDate ] = useState();
    const [ addPopUp, setAddPopUp ] = useState(false);
    const [ eventPopUp, setEventPopUp ] = useState(false);

    const duringPopUp = (addPopUp || eventPopUp) ? " during-popup" : "";

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
                setCurrentUser(user.data);
            } catch (err) {
                navigate('/login')
            }
        }
        getUser();
    }, []);


    function getAddDate(date) {
        setSelectedDate(new Date(date).toISOString().substring(0,10));
        setAddPopUp(true);
    }

    function getEventInfo(event) {
        setSelectedEvent(event);
        setEventPopUp(true);
    }

    async function addEvent(title, time, length, description) {
        console.log(title + time + length);
        await axios.post("http://localhost:6969/event/add-event", {
            user_id: currentUser._id,
            event: {
                title: title,
                description: description,
                start: `${selectedDate}T${time}`,
                length: length,
                repetitions: [], 
            } 
        });
        setAddPopUp(false);
        window.location.reload();
    }

    async function deleteEvent() {
        await axios.post("http://localhost:6969/event/delete-event", {
            user_id: currentUser._id,
            event_id: selectedEvent._id
        });
        setEventPopUp(false);
        window.location.reload();
    }

    async function logout(e) {
        e.preventDefault();
        localStorage.setItem('token', undefined); 
        navigate('/login');
    }

    return (
        <>
            {eventPopUp && <EventInfoPopUp togglePopUp={setEventPopUp} deleteEventFunction={deleteEvent} eventInfo={selectedEvent}/>}
            {(addPopUp && !eventPopUp) && <AddEventPopUp togglePopUp={setAddPopUp} addEventFunction={addEvent}/>}
            {(addPopUp || eventPopUp) && <DimmedOverlay/>}
            <div className={"dashboard" + duringPopUp}>  
                <div className="header">
                    <p className="title">Calendar</p>
                    <p className="user">Welcome, {currentUser.username}!</p>
                    <button className="logout-button" onClick={logout}>Log Out</button>
                </div>
                <div className="calendar-div">
                    {currentUser._id && <Calendar loggedUserId={currentUser._id} toggleAddEvent={setAddPopUp} getAddDate={getAddDate} getEventInfo={getEventInfo}/>}
                </div>
            </div>
            <div className="footer">
                NICHOLAS LE
            </div>
        </>
    );
}

export default Dashboard;
