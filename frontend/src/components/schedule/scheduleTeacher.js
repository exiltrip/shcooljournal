import React, {useEffect, useState} from 'react';
import './schedule.sass'
import ScheduleTable from "./table/table";
import axios from "axios";
const ScheduleTeacher = () => {
    const url = new URL(document.location.href);
    let id = (url.searchParams.get('search'));
    const [scheduleData, setScheduleData] = useState([])
    const [isDataLoaded, setIsDataLoaded] = useState(false)

    const getSchedule= () => {
        axios.get(`http://185.130.44.124:8000/pair/all?search=${id}`)
            .then(res => {
                setScheduleData(res.data.results)
                console.log(res.data.results)
                setIsDataLoaded(true)
            })

    }
    useEffect(() =>{
        getSchedule()
    }, [])

    return (
        <main className="schedule">
            <h3>Расписание <span className="text-group">{isDataLoaded ? `${scheduleData[0].teacher_id.first_name} ${scheduleData[0].teacher_id.last_name}` : "Загрузка"}</span></h3>
            <ScheduleTable id={id}/>
        </main>
    );
};

export default ScheduleTeacher;
