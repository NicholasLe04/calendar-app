import axios from "axios";
import "./PopUp.css";

function EventInfoPopUp(props) {

    const { togglePopUp, deleteEventFunction, eventInfo } = props;

    async function deleteEvent() {
        deleteEventFunction();
        togglePopUp(false);
        window.location.reload();
    }
    async function cancel() {
        togglePopUp(false);
    }

    return(
        <div className="popup">
            <div className="popup-content">
                <h1>{eventInfo.title}</h1>
                <h3>{new Date(eventInfo.start).toDateString()}</h3>
                <h3>{new Date(eventInfo.start).toTimeString()}</h3>
            </div>
            <div className="popup-buttons">
                <button onClick={deleteEvent}>Delete Event</button>
                <button onClick={cancel}>Cancel</button>
            </div>
        </div>  
    );
}

export default EventInfoPopUp;
