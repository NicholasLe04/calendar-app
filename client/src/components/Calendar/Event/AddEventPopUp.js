import "./PopUp.css";

function AddEventPopUp(props) {

    const { togglePopUp, addEventFunction } = props;

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

    return(
        <div className="popup">
            <div className="popup-content">
                <h1>ADD EVENT</h1>
                <p>Event Title</p><input type="text" id="event-title"/>
                <p>Event Start Time</p><input type="time" id="event-start"/>
                <p>Event Length</p><input type="number" id="event-length"/>
            </div>
            <div className="popup-buttons">
                <button onClick={addEvent}>Add Event</button>
                <button onClick={cancel}>Cancel</button>
            </div>
        </div>  
    );
}

export default AddEventPopUp;
