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
                <h2>When</h2>
                <p>{new Date(eventInfo.start).toDateString()}</p>
                <p>{new Date(eventInfo.start).toTimeString()}</p>
                <h2>Description</h2>
                <p>{eventInfo.description}</p>
            </div>
            <div className="popup-buttons">
                <button onClick={deleteEvent}>Delete Event</button>
                <button onClick={cancel}>Cancel</button>
            </div>
        </div>  
    );
}

export default EventInfoPopUp;
