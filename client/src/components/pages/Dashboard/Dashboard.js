import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "../../Calendar/Calendar";

import AddEventPopUp from "../../Calendar/Event/AddEventPopUp";
import EventInfoPopUp from "../../Calendar/Event/EventInfoPopUp";
import "./Dashboard.css";
import DimmedOverlay from "../../reusables/DimmedOverlay/DimmedOverlay";

const BASE_URL = "https://uniplan-api.vercel.app";

function Dashboard() {
    const navigate = useNavigate();
    const [ currentUser, setCurrentUser ] = useState({});
    const [ selectedEvent, setSelectedEvent ] = useState();
    const [ selectedDate, setSelectedDate ] = useState();
    const [ addPopUp, setAddPopUp ] = useState(false);
    const [ eventPopUp, setEventPopUp ] = useState(false);
    const [ events, setEvents ] = useState([]);

    const duringPopUp = (addPopUp || eventPopUp) ? " during-popup" : "";

    async function updateEvents() {
        let eventResponse = await axios.get(`https://uniplan-api.vercel.app/user/events?user_id=${currentUser._id}`, 
        {
            headers: {
                "jwt-auth-token": localStorage.getItem('token'),
            },
        });
        setEvents(eventResponse.data.events);
    }

    useEffect(() => {
        async function initializeUserData() {
            try {
                await axios.post(`${BASE_URL}/user/isloggedin`, {},
                {
                    headers: {
                        "jwt-auth-token": localStorage.getItem('token'),
                    },
                });
                let user = await axios.get(`${BASE_URL}/user/current`,
                {
                    headers: {
                        "jwt-auth-token": localStorage.getItem('token'),
                    },
                });
                setCurrentUser(user.data);

                let eventResponse = await axios.get(`https://uniplan-api.vercel.app/user/events?user_id=${user.data._id}`, 
                {
                    headers: {
                        "jwt-auth-token": localStorage.getItem('token'),
                    },
                });
                setEvents(eventResponse.data.events);
            } catch (err) {
                navigate('/login');
            }
        }
        initializeUserData();
    }, []);


    function getAddDate(date) {
        setSelectedDate(new Date(date).toISOString().substring(0,10));
        setAddPopUp(true);
    }

    function getEventInfo(event) {
        setSelectedEvent(event);
        setEventPopUp(true);
    }

    async function addEvent(title, time, length, description, repetitions) {
        await axios.post(`${BASE_URL}/event/add-event`, {
            user_id: currentUser._id,
            event: {
                title: title,
                description: description,
                start: `${selectedDate}T${time}`,
                length: length,
                repetitions: repetitions, 
            }
        },
        {
            headers: {
                "jwt-auth-token": localStorage.getItem('token'),
            },
        });
        setAddPopUp(false);

        updateEvents();
    }

    async function deleteEvent() {
        await axios.post(`${BASE_URL}/event/delete-event`, {
            user_id: currentUser._id,
            event_id: selectedEvent._id
        },
        {
            headers: {
                "jwt-auth-token": localStorage.getItem('token'),
            },
        });
        setEventPopUp(false);

        updateEvents();
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
                    <p className="title">UNIPLAN</p>
                    <p className="user">Welcome, {currentUser.username}!</p>
                    <button className="logout-button" onClick={logout}>Log Out</button>
                </div>
                <div className="calendar-div">
                    <Calendar events={events} toggleAddEvent={setAddPopUp} getAddDate={getAddDate} getEventInfo={getEventInfo}/>
                </div>
            </div>
            <div className="footer">
                Created by Nicholas Le
            </div>
        </>
    );
}

export default Dashboard;
