import "./PopUp.css";
import { useState } from "react";

function AddEventPopUp(props) {

    const { togglePopUp, addEventFunction } = props;
    const [ eventType, setEventType ] = useState("class");

    async function addEvent() {
        if (!(  
                document.getElementById("event-title").value && 
                document.getElementById("event-start").value && 
                document.getElementById("event-length").value
            )) {
            alert("missing params");
            return;
        }
        const dateString = `${document.getElementById("event-start").value}:00.000-07:00`;
        console.log(dateString);
        addEventFunction(document.getElementById("event-title").value, dateString, document.getElementById("event-length").value);
    }
    
    async function cancel() {
        togglePopUp(false);
    }

    const handleSelectChange = (event) => {
        setEventType(event.target.value);
    };

    return(
        <div className="popup">
            <div className="popup-content">
                <h1>ADD EVENT</h1>
                <select id="event-type" onChange={handleSelectChange}>
                    <option value="class">Class</option>
                    <option value="club">Club</option>
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                </select>
                {
                    eventType === 'class' && (
                        <>
                            <p>Course</p><input type="text" id="event-title"/><br/>
                            <p>Course Start Time</p><input type="time" id="event-start"/><br/>
                            <p>Course length</p><input type="number" id="event-length"/><br/>
                            <li style={{float: "left", display: "flex"}}>
                                <ul style={{padding: 0}}>Sun<input type="checkbox" name="Sunday"/></ul>
                                <ul style={{padding: 0}}>Mon<input type="checkbox" name="Monday"/></ul>
                                <ul style={{padding: 0}}>Tue<input type="checkbox" name="Tuesday"/></ul>
                                <ul style={{padding: 0}}>Wed<input type="checkbox" name="Wednesday"/></ul>
                                <ul style={{padding: 0}}>Thu<input type="checkbox" name="Thursday"/></ul>
                                <ul style={{padding: 0}}>Fri<input type="checkbox" name="Friday"/></ul>
                                <ul style={{padding: 0}}>Sun<input type="checkbox" name="Sunday"/></ul>
                            </li>
                        </>
                    )
                }
                {
                    eventType === 'club' && (
                        <>
                            <p>Event Title</p><input type="text" id="event-title"/>
                            <p>Event Start Time</p><input type="time" id="event-start"/>
                            <p>Event Length</p><input type="number" id="event-length"/>
                        </>
                    )
                }
                {
                    eventType === 'work' && (
                        <>
                            <p>Event Title</p><input type="text" id="event-title"/>
                            <p>Event Start Time</p><input type="time" id="event-start"/>
                            <p>Event Length</p><input type="number" id="event-length"/>
                        </>
                    )
                }
                {
                    eventType === 'personal' && (
                        <>
                            <p>Event Title</p><input type="text" id="event-title"/>
                            <p>Event Start Time</p><input type="time" id="event-start"/>
                            <p>Event Length</p><input type="number" id="event-length"/>
                        </>
                    )
                }
            </div>
            <div className="popup-buttons">
                <button onClick={addEvent}>Add Event</button>
                <button onClick={cancel}>Cancel</button>
            </div>
        </div>  
    );
}

export default AddEventPopUp;
