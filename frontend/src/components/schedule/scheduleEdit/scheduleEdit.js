import React from 'react';
import '../schedule.sass'
import ScheduleTable from "../table/table";
import {useEffect, useState} from "react";
import axios from "axios";
const ScheduleEdit = () => {
    const [scheduleData, setScheduleData] = useState([])
    const [isDataLoaded, setIsDataLoaded] = useState(false)
    const [groupList, setGroupList] = useState({})
    const [teacherList, setTeacherList] = useState({})
    const [AudienceList, setAudienceList] = useState({})
    const [group, setGroup] = useState("")
    const [teacher, setTeacher] = useState("")
    const [Audience, setAudience] = useState("")
    const [dateStart, setDateStart] = useState("")
    const [dateEnd, setDateEnd] = useState("")
    const [isLoaded, setIsLoaded] = useState(false)
    const [isLoadedTeacher, setIsLoadedTeacher] = useState(false)
    const [isLoadedAudience, setIsLoadedAudience] = useState(false)

    const changeGroup = event => {
        setGroup(event.target.value);
    };
    const  changeAudience = event => {
        setAudience(event.target.value);
    };
    const changeDateEnd = event => {
        setDateEnd(event.target.value);
    };
    const changeDateStart = event => {
        setDateStart(event.target.value);
    };
    const changeTeacher = event => {
        setTeacher(event.target.value);
    };
    const getGroupList = () => {
        axios.get('http://185.130.44.124:8000/group')
            .then( res => {
                    setGroupList(res.data.results)
                    setIsLoaded(true)
                    console.log(groupList)
                }
            )
    }
    const getTeacherList = () => {
        axios.get('http://185.130.44.124:8000/user/teacher')
            .then( res => {
                    setTeacherList(res.data)
                    setIsLoadedTeacher(true)
                    console.log(teacherList)
                })
    }
    const getAudienceList = () => {
        axios.get('http://185.130.44.124:8000/audience')
            .then( res => {
                    setAudienceList(res.data.results)
                    setIsLoadedAudience(true)
                    console.log(AudienceList)
                }
            )
    }
    useEffect(()=>{
        getGroupList()
        getTeacherList()
        getAudienceList()
    }, [])

    const getSchedule= () => {
        axios.get(`http://185.130.44.124:8000/pair/all`)
            .then(res => {
                setScheduleData(res.data.results)
                console.log(res.data.results)
                setIsDataLoaded(true)
            })

    }
    const createPair= () => {
        axios.post(`http://185.130.44.124:8000/pair/create`,
            {
                "start_time": dateStart,
                "end_time": dateEnd,
                "teacher_id": teacher,
                "group_id": group,
                "audit_id": Audience
            })
            .then(res => {
                console.log(res.data)
                getSchedule()
            })

    }
    useEffect(() =>{
        getSchedule()
    }, [])

    return (
        <main className="schedule">
            <h3>Расписание</h3>
            <ScheduleTable id={""}/>
            <button data-bs-toggle="modal" data-bs-target="#exampleModal">добавить </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Добавить пару</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Закрыть"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Предмет</label>
                                    <select className="form-select" aria-label="Пример выбора по умолчанию">
                                        <option selected>Предмет:</option>
                                        <option value="1">История</option>
                                        <option value="2">ОБЖ</option>
                                        <option value="3">Физкультура</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <select onChange={changeGroup} value={group} id="search" className="form-select" aria-label="Пример выбора по умолчанию">
                                        <option selected>Группа:</option>
                                        {isLoaded ? groupList.map(list => <option value={list.id}>{list.name}</option>) : ""}
                                    </select>


                                </div>
                                <div className="mb-3">
                                    <span>начало пары</span>
                                    <input type="datetime-local" className="form-select" value={dateStart} onChange={changeDateStart}/>
                                </div>
                                <div className="mb-3">
                                    <span>конец пары</span>
                                    <input type="datetime-local" className="form-select" value={dateEnd} onChange={changeDateEnd}/>
                                </div>
                                <div className="mb-3">
                                    <select onChange={changeTeacher} value={teacher} id="search" className="form-select" aria-label="Пример выбора по умолчанию">
                                        <option selected>преподаватель:</option>
                                        {isLoadedTeacher ? teacherList.map(list => <option value={list.id}>{list.first_name} {list.last_name}</option>) : ""}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <select onChange={changeAudience} value={Audience} id="search" className="form-select" aria-label="Пример выбора по умолчанию">
                                        <option selected>аудитория:</option>
                                        {isLoadedAudience ? AudienceList.map(mdata => <option value={mdata.id}>{mdata.name}</option>) : ""}
                                    </select>
                                </div>
                                <button type="button" onClick={createPair} className="btn btn-primary">Отправить</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    );
};

export default ScheduleEdit;
