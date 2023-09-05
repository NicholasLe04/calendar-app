import { useState } from "react";

import "./Calendar.css";
import CalendarMonth from "./CalendarMonth";
import CalendarWeek from "./CalendarWeek";

function Calendar(props) {
    const { events, getAddDate, getEventInfo } = props;


    let today = new Date();
    const [ timescale, setTimescale ] = useState("month");
    const [ currentMonth, setCurrentMonth ] = useState(new Date(today.getFullYear(), today.getMonth()));
    const [ currentWeek, setCurrentWeek ] = useState(new Date(today.getFullYear(), today.getMonth(), today.getDate()));

    return (
        <>
            <div className="calendar">
                <div className="timeframe-scale-container">
                    <div className="timeframe-selection">
                        <button className={`timeframe-select ${ timescale === "month" ? "selected-timeframe" : ""}`} onClick={() => setTimescale("month")}>Month</button>
                        <button className={`timeframe-select ${ timescale === "week" ? "selected-timeframe" : ""}`} onClick={() => setTimescale("week")}>Week</button>
                        <button className={`timeframe-select ${ timescale === "day" ? "selected-timeframe" : ""}`} onClick={() => setTimescale("day")}>Day</button>
                    </div>
                </div>
                <div className="calendar-body">
                    <div className="table">
                        { timescale === "month" && <CalendarMonth events={events} timeframe={currentMonth} changeTimeframe={setCurrentMonth} getAddDate={getAddDate} getEventInfo={getEventInfo} /> }
                        { timescale === "week" && <CalendarWeek events={events} timeframe={currentWeek} changeTimeframe={setCurrentWeek} getAddDate={getAddDate} getEventInfo={getEventInfo}/>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Calendar;