import "./CalendarDays.css";
import { useEffect, useState } from "react";

function CalendarDay(props) {
    const { events, timeframe, changeTimeframe, getAddDate, getEventInfo  } = props;

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let currentDay = new Date(timeframe);
    const [ currentTime, setCurrentTime ] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    if (events === []) {
        return (<h1>Loading</h1>);
    }

    function nextDay() {
        changeTimeframe(new Date(timeframe.getFullYear(), timeframe.getMonth(), timeframe.getDate() + 1));
    }

    function previousDay() {
        changeTimeframe(new Date(timeframe.getFullYear(), timeframe.getMonth(), timeframe.getDate() - 1));
    }

    let eventsToday = events.filter(function(event){
        return ( 
            new Date(event["start"]).toDateString().substring(0,15) === new Date(currentDay).toDateString().substring(0,15) ||
            event["repetitions"].includes(currentDay.getDay())
            );
    });
    
    let todayInfo = {
        currentMonth: (currentDay.getMonth() === timeframe.getMonth()),
        date: (new Date(currentDay)),
        month: currentDay.getMonth(),
        number: currentDay.getDate(),
        selected: (currentDay.toDateString() === (new Date()).toDateString()),
        year: currentDay.getFullYear(),
        events: eventsToday
    };

    return(
        <>
            <div className="calendar-header">
                <button className="time-select" onClick={previousDay}> &lt; </button>
                <h2 className="displayed-week"> 
                    {months[currentDay.getMonth()]} {currentDay.getDate()}
                </h2>
                <button className="time-select" onClick={nextDay}> &gt; </button>
            </div>
            <div className="table-header">

            </div>
            <div className="table-content" style={{ justifyContent: "right" }}>
                {
                    <div className="calendar-day day current selected" onClick={() => getAddDate(todayInfo.date.toDateString())} key={todayInfo.date}>
                        <p>{todayInfo.number}</p>
                        { todayInfo.selected && 
                            <>
                                <p style={{ position: "absolute", top: `${((currentTime.getHours() * 60 + currentTime.getMinutes()) / 2) + 23}px`, color: "#121212", fontSize: "13px", fontWeight: "400" }}>
                                    {currentTime.toLocaleTimeString("en-US").replace(/:\d{2}\s/, ' ')}
                                </p>
                                <div style={{ position: "absolute", top: `${((currentTime.getHours() * 60 + currentTime.getMinutes()) / 2) + 49}px`, 
                                                left: "1%", width: "98%", height: "2px", backgroundColor: "red", 
                                                marginTop: "3px", marginBottom: "3px"}}>
                                </div>
                            </>
                        }
                        <div className="events">
                            {
                                todayInfo.events.map((event) => {
                                    return(
                                        <div className={`event ${event.eventType}`}  key={event._id} onClick={(e) => {
                                            e.stopPropagation();
                                            getEventInfo(event);
                                        }}
                                        style={{ position: "absolute", top: `${((new Date(event.start).getHours() * 60 + new Date(event.start).getMinutes()) / 2) + 49}px`, height: `${event.length / 2}px` }}
                                        >{event.title} - {new Date(event.start).toLocaleTimeString("en-US").replace(/:\d{2}\s/, ' ')}</div>
                                    )
                                })
                            }
                        </div>
                    </div>
                }
            </div>
        </>
    );
}

export default CalendarDay;