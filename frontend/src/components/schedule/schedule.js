import React from 'react';
import './schedule.sass'
import ScheduleTable from "./table/table";
const Schedule = () => {
    return (
        <main className="schedule">
        <h3>Расписание </h3>
            <ScheduleTable/>
        </main>
    );
};

export default Schedule;
