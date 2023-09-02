import { useState } from "react";
import "./Calendar.css";
import CalendarMonth from "./CalendarMonth";

function Calendar(props) {
    const { events, toggleAddEvent, getAddDate, getEventInfo } = props;
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


    let today = new Date();
    const [ timescale, setTimescale ] = useState("month");
    const [ currentMonth, setCurrentMonth ] = useState(new Date(today.getFullYear(), today.getMonth()));

    function nextMonth() {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth()+1));
    }

    function previousMonth() {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth()-1));
    }

    return (
        <>
            <div className="calendar">
                <div className="calendar-header">
                    <button className="month-select" onClick={previousMonth}> &lt; </button>
                    <h2 className="displayed-month">{months[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h2>
                    <button className="month-select" onClick={nextMonth}> &gt; </button>
                </div>
                <div className="timeframe-scale-container">
                    <select id="timeframe-scale" defaultValue="month" onChange={(e) => {setTimescale(e.target.value)}}>
                        <option value="month">Month</option>
                        <option value="week">Week</option>
                        <option value="day">Day</option>
                    </select>
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
                        { timescale === "month" && <CalendarMonth events={events} timeframe={currentMonth} toggleAddEvent={toggleAddEvent} getAddDate={getAddDate} getEventInfo={getEventInfo}/> }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Calendar;