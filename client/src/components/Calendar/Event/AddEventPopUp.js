import "./PopUp.css";
import { useState } from "react";

function AddEventPopUp(props) {

    const { togglePopUp, addEventFunction } = props;
    const [ eventType, setEventType ] = useState("class");
    const [ eventLengthHours, setEventLengthHours ] = useState(0);
    const [ eventLengthMinutes, setEventLengthMinutes ] = useState(0);

    async function addEvent() {
        if (!(  
                document.getElementById("event-title").value && 
                document.getElementById("event-start").value &&
                eventLengthHours + eventLengthMinutes !== 0  
            )) {
            alert("missing params");
            return;
        }
        const dateString = `${document.getElementById("event-start").value}:00.000-07:00`;

        const length = (eventLengthHours * 60) + (eventLengthMinutes * 1);


        let repetitions = [];
        for (let i = 0; i < 7; i++) {
            if (document.getElementById(`repetition-${i}`).checked) {
                repetitions.push(i);
            }
        }
        
        addEventFunction(   
                            document.getElementById("event-title").value, 
                            dateString, 
                            eventType,
                            length, 
                            document.getElementById("event-description").value,
                            repetitions
                        );
        repetitions = [];
    }
    
    async function cancel() {
        togglePopUp(false);
    }

    const handleEventTypeChange = (event) => {
        setEventType(event.target.value);
    };

    const handleEventLengthHoursChange = (event) => {
        setEventLengthHours(event.target.value);
    };
    
    const handleEventLengthMinutesChange = (event) => {
        setEventLengthMinutes(event.target.value);
    };

    return(
        <div className="popup nes-container">
            <div className="popup-content">
                <h1>ADD EVENT</h1>
                <select onChange={handleEventTypeChange}>
                    <option value="class">Class</option>
                    <option value="club">Club</option>
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                </select>
                <p className="event-info-title">{ eventType === "class" ? "Course" : "Event Title" }</p><input type="text" id="event-title"/><br/>
                <p className="event-info-title">Start Time</p><input type="time" id="event-start"/><br/>
                <p className="event-info-title">Length</p>
                <div className="event-length-select">
                    <label>Hours</label>
                    <input 
                        type="number" 
                        defaultValue="0"
                        min="0"
                        max="23" 
                        onChange={handleEventLengthHoursChange}
                    />
                    <label>Minutes</label>
                    <input 
                        type="number" 
                        defaultValue="0"
                        min="0"
                        max="59" 
                        onChange={handleEventLengthMinutesChange}
                    />
                </div>
                <p className="event-info-title">Days</p>
                <li style={{ display: "flex", justifyContent: "space-between" }}>
                    <ul style={{padding: 0}}><p>Sun</p><input type="checkbox" name="Sunday" id="repetition-0"/></ul>
                    <ul style={{padding: 0}}><p>Mon</p><input type="checkbox" name="Monday" id="repetition-1"/></ul>
                    <ul style={{padding: 0}}><p>Tue</p><input type="checkbox" name="Tuesday" id="repetition-2"/></ul>
                    <ul style={{padding: 0}}><p>Wed</p><input type="checkbox" name="Wednesday" id="repetition-3"/></ul>
                    <ul style={{padding: 0}}><p>Thu</p><input type="checkbox" name="Thursday" id="repetition-4"/></ul>
                    <ul style={{padding: 0}}><p>Fri</p><input type="checkbox" name="Friday" id="repetition-5"/></ul>
                    <ul style={{padding: 0}}><p>Sun</p><input type="checkbox" name="Saturday" id="repetition-6"/></ul>
                </li>
                <p className="event-info-title">Description:</p><textarea id="event-description" style={{resize: "none", width: "100%", height: "30px"}}/>
            </div>
            <div className="popup-buttons">
                <button onClick={cancel}>Cancel</button>
                <button style={{backgroundColor: "#d0cfec"}} onClick={addEvent}>Add Event</button>
            </div>
        </div>  
    );
}

export default AddEventPopUp;
