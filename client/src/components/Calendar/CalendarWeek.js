import "./CalendarDays.css";

function CalendarWeek(props) {
    const { events, timeframe, changeTimeframe } = props;

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let currentDay = new Date(timeframe);
    let weekdayOfFirstDay = currentDay.getDay();
    let currentDays = [];

    if (events === []) {
        return (<h1>Loading</h1>);
    }

    function nextWeek() {
        changeTimeframe(new Date(timeframe.getFullYear(), timeframe.getMonth(), timeframe.getDate() + 7));
    }

    function previousWeek() {
        changeTimeframe(new Date(timeframe.getFullYear(), timeframe.getMonth(), timeframe.getDate() - 7));
    }

    for (let day = 0; day < 7; day++) {
        if (day === 0) {
            currentDay.setDate(currentDay.getDate() - weekdayOfFirstDay);
        }
        else {
            currentDay.setDate(currentDay.getDate() + 1);
        }

        let eventsToday = events.filter(function(event){
            return ( 
                new Date(event["start"]).toDateString().substring(0,15) === new Date(currentDay).toDateString().substring(0,15) ||
                event["repetitions"].includes(currentDay.getDay())
                );
        });

        // Sort events by time
        eventsToday.sort(function(a,b){
            if (new Date(a.start).getHours() - new Date(b.start).getHours() === 0) {
                return (new Date(a.start).getMinutes() - new Date(b.start).getMinutes());
            }
            return  (new Date(a.start).getHours() - new Date(b.start).getHours()) 
        })
        // Add the current day to the day array
        currentDays.push({
            currentMonth: (currentDay.getMonth() === timeframe.getMonth()),
            date: (new Date(currentDay)),
            month: currentDay.getMonth(),
            number: currentDay.getDate(),
            selected: (currentDay.toDateString() === (new Date()).toDateString()),
            year: currentDay.getFullYear(),
            events: eventsToday
        });
    }

    return(
        <>
            <div className="calendar-header">
                <button className="time-select" onClick={previousWeek}> &lt; </button>
                <h2 className="displayed-week"> 
                    {new Date(timeframe.getFullYear(), timeframe.getMonth(), timeframe.getDate()-weekdayOfFirstDay).getMonth() + 1}/
                    {new Date(timeframe.getFullYear(), timeframe.getMonth(), timeframe.getDate()-weekdayOfFirstDay).getDate()} - {new Date(timeframe.getFullYear(), timeframe.getMonth(), timeframe.getDate()+(6-weekdayOfFirstDay)).getMonth() + 1}/
                    {new Date(timeframe.getFullYear(), timeframe.getMonth(), timeframe.getDate()+(6-weekdayOfFirstDay)).getDate()}
                </h2>
                <button className="time-select" onClick={nextWeek}> &gt; </button>
            </div>
            <div className="table-header">
                {
                    weekdays.map((weekday) => {
                        return <div className="weekday"><p>{weekday}</p></div>
                    })
                }
            </div>
            <div className="table-content">
                {
                    currentDays.map((day) => {
                        return (
                            <div className={"calendar-day week" + (day.currentMonth ? " current" : "") + (day.selected ? " selected" : "")} onClick={() => {}} key={day.date}>
                                <p>{day.number}</p>
                                <div className="events">
                                    {
                                        day.events.map((event) => {
                                            return(
                                                <div className="event" key={event._id} onClick={(e) => {
                                                    e.stopPropagation();
                                                }}
                                                style={{ position: "absolute", top: `${((new Date(event.start).getHours() * 60 + new Date(event.start).getMinutes()) / 2) + 49}px`, height: `${event.length / 2}px`}}
                                                >{event.title} - {new Date(event.start).toLocaleTimeString("en-US").replace(/:\d{2}\s/, ' ')}</div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
}

export default CalendarWeek;