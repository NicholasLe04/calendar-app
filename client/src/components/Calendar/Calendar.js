import { useState } from "react";

import "./Calendar.css";
import CalendarMonth from "./CalendarMonth";
import CalendarWeek from "./CalendarWeek";

function Calendar(props) {
    const { events, toggleAddEvent, getAddDate, getEventInfo } = props;


    let today = new Date();
    const [ timescale, setTimescale ] = useState("month");
    const [ currentDate, setCurrentDate ] = useState(new Date(today.getFullYear(), today.getMonth(), today.getDate()));

    return (
        <>
            <div className="calendar">
                <div className="timeframe-scale-container">
                    <select id="timeframe-scale" defaultValue="month" onChange={(e) => {setTimescale(e.target.value)}}>
                        <option value="month">Month</option>
                        <option value="week">Week</option>
                        <option value="day">Day</option>
                    </select>
                </div>
                <div className="calendar-body">
                    <div className="table">
                        { timescale === "month" && <CalendarMonth events={events} timeframe={currentDate} changeTimeframe={setCurrentDate} toggleAddEvent={toggleAddEvent} getAddDate={getAddDate} getEventInfo={getEventInfo} /> }
                        { timescale === "week" && <CalendarWeek events={events} timeframe={currentDate} changeTimeframe={setCurrentDate}/>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Calendar;