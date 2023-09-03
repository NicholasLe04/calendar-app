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

        let repetitions = [];
        for (let i = 0; i < 7; i++) {
            if (document.getElementById(`repetition-${i}`).checked) {
                repetitions.push(i);
            }
        }

        addEventFunction(   
                            document.getElementById("event-title").value, 
                            dateString, 
                            document.getElementById("event-length").value, 
                            document.getElementById("event-description").value,
                            repetitions
                        );
        repetitions = [];
    }
    
    async function cancel() {
        togglePopUp(false);
    }

    const handleSelectChange = (event) => {
        setEventType(event.target.value);
    };

    return(
        <div className="popup nes-container">
            <div className="popup-content">
                <h1>ADD EVENT</h1>
                <select id="event-type" onChange={handleSelectChange}>
                    <option value="class">Class</option>
                    <option value="club">Club</option>
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                </select>
                <p>Course</p><input type="text" id="event-title"/><br/>
                <p>Course Start Time</p><input type="time" id="event-start"/><br/>
                <p>Course length</p><input type="number" id="event-length"/><br/>
                <li style={{float: "left", display: "flex"}}>
                    <ul style={{padding: 0}}>Sun<input type="checkbox" name="Sunday" id="repetition-0"/></ul>
                    <ul style={{padding: 0}}>Mon<input type="checkbox" name="Monday" id="repetition-1"/></ul>
                    <ul style={{padding: 0}}>Tue<input type="checkbox" name="Tuesday" id="repetition-2"/></ul>
                    <ul style={{padding: 0}}>Wed<input type="checkbox" name="Wednesday" id="repetition-3"/></ul>
                    <ul style={{padding: 0}}>Thu<input type="checkbox" name="Thursday" id="repetition-4"/></ul>
                    <ul style={{padding: 0}}>Fri<input type="checkbox" name="Friday" id="repetition-5"/></ul>
                    <ul style={{padding: 0}}>Sun<input type="checkbox" name="Saturday" id="repetition-6"/></ul>
                </li>
                <p>Description:</p><textarea id="event-description" style={{resize: "none", width: "80%", height: "100px"}}/>
            </div>
            <div className="popup-buttons">
                <button onClick={addEvent}>Add Event</button>
                <button onClick={cancel}>Cancel</button>
            </div>
        </div>  
    );
}

export default AddEventPopUp;
