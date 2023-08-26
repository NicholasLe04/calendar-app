import "./Calendar.css";

function Calendar() {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let today = new Date();

    return (
        <>
            <div className="calendar">
                <div className="calendar-header">
                    <h2>{months[today.getMonth()]} {today.getFullYear()}</h2>
                </div>
                <div className="calendar-body">
                    <div className="table-header">
                        {
                            weekdays.map((weekday) => {
                                return <div className="weekday"><p>{weekday}</p></div>
                            })
                        }
                    </div>
                    <div className="table">
                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default Calendar;