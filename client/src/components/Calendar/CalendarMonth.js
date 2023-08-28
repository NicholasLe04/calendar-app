import { useState, useEffect } from "react";
import axios from "axios";

function CalendarMonth(props) {
    const { timeframe, loggedUserId, getAddDate, getEventInfo } = props;

    let currentDay = new Date(timeframe);
    let weekdayOfFirstDay = currentDay.getDay();
    let currentDays = [];


    const [ events, setEvents ] = useState(undefined);

    useEffect(() => {
        async function getEvents(){
            let eventResponse = await axios.post("http://localhost:6969/user/events", {
                user_id: loggedUserId
            });
            setEvents(eventResponse.data.events);
        }
        getEvents();
    }, []);

    if (events === undefined){
        return(
            <h1>loading</h1>
        );  
    }


    for (let day = 0; day < 42; day++) {
        if (day === 0 && weekdayOfFirstDay === 0) {
            currentDay.setDate(currentDay.getDate()-7);
        } 
        else if (day === 0) {
            currentDay.setDate(currentDay.getDate() + (day - weekdayOfFirstDay));
        }
        else {
            currentDay.setDate(currentDay.getDate() + 1)
        }

        let eventsToday = events.filter(event => (new Date(event["start"]).toDateString().substring(0,15) === new Date(currentDay).toDateString().substring(0,15)));
        // Sort events by time
        eventsToday.sort(function(a,b){
            return new Date(a.start) - new Date(b.start);
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
      <div className="table-content">
        {
            currentDays.map((day) => {
                return (
                    <div className={"calendar-day" + (day.currentMonth ? " current" : "") + (day.selected ? " selected" : "")} onClick={() => getAddDate(day.date.toDateString())} key={day.date}>
                        <p>{day.number}</p>
                        <div className="events">
                            {
                                day.events.map((event) => {
                                    return(
                                        <div className="event" key={event._id} onClick={(e) => {
                                            e.stopPropagation();
                                            getEventInfo(event);
                                        }}>{event.title} - {new Date(event.start).toTimeString().substring(0,5)}</div>
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            })
        }
      </div>
    )
  }
  
  export default CalendarMonth;