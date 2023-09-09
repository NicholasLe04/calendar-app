import "./CalendarDays.css";
import { useEffect, useState } from "react";

function CalendarWeek(props) {
    const { events, timeframe, changeTimeframe, getAddDate, getEventInfo  } = props;

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

    let currentDay = new Date(timeframe);
    let weekdayOfFirstDay = currentDay.getDay();
    let currentDays = [];
    const [ currentTime, setCurrentTime ] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    
    if (events === undefined){
        return(<h1>loading</h1>);  
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
            selected: (currentDay.toDateString() === currentTime.toDateString()),
            year: currentDay.getFullYear(),
            events: eventsToday
        });
    }

    return(
        <>
            <div className="calendar-header">
                <button className="time-select" onClick={previousWeek}> &lt; </button>
                <h2 className="displayed-week"> 
                    {months[new Date(timeframe.getFullYear(), timeframe.getMonth(), timeframe.getDate()-weekdayOfFirstDay).getMonth()]} {new Date(timeframe.getFullYear(), timeframe.getMonth(), timeframe.getDate()-weekdayOfFirstDay).getDate()}
                    &emsp;&#8212;&emsp;
                    {months[new Date(timeframe.getFullYear(), timeframe.getMonth(), timeframe.getDate()+(6-weekdayOfFirstDay)).getMonth()]} {new Date(timeframe.getFullYear(), timeframe.getMonth(), timeframe.getDate()+(6-weekdayOfFirstDay)).getDate()}
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
                            <div className={"calendar-day week" + (day.currentMonth ? " current" : "") + (day.selected ? " selected" : "")} onClick={() => getAddDate(day.date.toDateString())} key={day.date}>
                                <p>{day.number}</p>
                                { day.selected && 
                                    <div style={{ position: "absolute", display: "flex", alignItems: "center", justifyContent: "space-between", 
                                                    top: `${((currentTime.getHours() * 60 + currentTime.getMinutes()) / 2) + 49}px`, width: "100%", zIndex: "3" }}>
                                        <label style={{ marginLeft: "1%", fontSize: "10px", fontWeight: "500" }}>{currentTime.toLocaleTimeString("en-US").replace(/:\d{2}\s/, ' ')}</label>
                                        <div style={{ marginRight: "1%", width: "80%", height: "2px", backgroundColor: "red", marginTop: "3px", marginBottom: "3px"}}/>
                                    </div>
                                }
                                <div className="events">
                                    {
                                        day.events.map((event) => {
                                            return(
                                                <div className={`event ${event.eventType}`}  key={event._id} onClick={(e) => {
                                                    e.stopPropagation();
                                                    getEventInfo(event);
                                                }}
                                                style={{ position: "absolute", top: `${((new Date(event.start).getHours() * 60 + new Date(event.start).getMinutes()) / 2) + 49}px`, height: `${event.length / 2}px`, lineHeight: `${event.length / 2}px` }}
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