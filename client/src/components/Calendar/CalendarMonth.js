import { useEffect } from "react";
import "./CalendarDays.css";

function CalendarMonth(props) {
    const { events, timeframe, changeTimeframe, getAddDate, getEventInfo } = props;

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let currentDay = new Date(timeframe);
    let weekdayOfFirstDay = currentDay.getDay();
    let currentDays = [];

    if (events === []){
        return(<h1>loading</h1>);  
    }
    

    function nextMonth() {
        changeTimeframe(new Date(timeframe.getFullYear(), timeframe.getMonth()+1));
    }

    function previousMonth() {
        changeTimeframe(new Date(timeframe.getFullYear(), timeframe.getMonth()-1));
    }


    for (let day = 0; day < 42; day++) {
        if (day === 0 && weekdayOfFirstDay === 0) {
            currentDay.setDate(currentDay.getDate()-7);
        } 
        else if (day === 0) {
            currentDay.setDate(currentDay.getDate() + (day - weekdayOfFirstDay));
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

    return (
        <>
            <div className="calendar-header">
                <button className="time-select" onClick={previousMonth}> &lt; </button>
                <h2 className="displayed-month">{months[timeframe.getMonth()]} {timeframe.getFullYear()}</h2>
                <button className="time-select" onClick={nextMonth}> &gt; </button>
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
                            <div className={"calendar-day month" + (day.currentMonth ? " current" : "") + (day.selected ? " selected" : "")} onClick={() => getAddDate(day.date.toDateString())} key={day.date}>
                                <p>{day.number}</p>
                                <div className="events">
                                    {
                                        day.events.map((event) => {
                                            return(
                                                <div className={`event ${event.eventType}`} key={event._id} onClick={(e) => {
                                                    e.stopPropagation();
                                                    getEventInfo(event);
                                                }}>{event.title} - {new Date(event.start).toLocaleTimeString("en-US").replace(/:\d{2}\s/, ' ')}</div>
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
    )
  }
  
  export default CalendarMonth;