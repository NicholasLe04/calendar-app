import "./PopUp.css";

function EventInfoPopUp(props) {

    const { togglePopUp, deleteEventFunction, eventInfo } = props;

    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    async function deleteEvent() {
        deleteEventFunction();
        togglePopUp(false);
    }
    async function cancel() {
        togglePopUp(false);
    }

    return(
        <div className="popup">
            <div className="popup-content">
                <h1>{eventInfo.title}</h1>
                <h2>Date</h2>
                <p>{new Date(eventInfo.start).toDateString()}</p>
                <h2>When</h2>
                <p>{new Date(eventInfo.start).toLocaleTimeString("en-US").replace(/:\d{2}\s/, ' ')} to {new Date(new Date(eventInfo.start).getTime() + eventInfo.length * 1000 * 60).toLocaleTimeString("en-US").replace(/:\d{2}\s/, ' ')}</p>
                { eventInfo.repetitions.length > 0 && <h2>Repeats</h2> }
                <p>{
                    eventInfo.repetitions.map((day, index) => {
                        return(<span>{weekdays[day]}{ index !== eventInfo.repetitions.length-1 && <>, </>}</span>);
                    })
                }</p>
                { eventInfo.description && <h2>Description</h2> }
                <p>{eventInfo.description}</p>
            </div>
            <div className="popup-buttons">
                <button onClick={cancel}>Cancel</button>
                <button onClick={deleteEvent}>Delete Event</button>
            </div>
        </div>  
    );
}

export default EventInfoPopUp;
