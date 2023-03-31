import React, {useEffect, useState} from 'react';
import "./searchSchedule.sass"
import axios from "axios";
import {Navigate, useNavigate} from "react-router";

const SearchSchedule = () => {
    const [groupList, setGroupList] = useState({})
    const [teacherList, setTeacherList] = useState({})
    const [group, setGroup] = useState("")
    const [teacher, setTeacher] = useState("")
    const [isLoaded, setIsLoaded] = useState(false)
    const [isLoadedTeacher, setIsLoadedTeacher] = useState(false)

    const changeGroup = event => {
        setGroup(event.target.value);
    };
    const changeTeacher = event => {
        setTeacher(event.target.value);
    };
    const getGroupList = () => {
        axios.get('http://185.130.44.124:8000/group')
            .then(async res => {
                 setGroupList(res.data.results)
                 setIsLoaded(true)
                 console.log(groupList)
                }
            )
    }
    const getTeacherList = () => {
        axios.get('http://185.130.44.124:8000/user/teacher')
            .then(async res => {
                 setTeacherList(res.data)
                 setIsLoadedTeacher(true)
                 console.log(teacherList)
                }
            )
    }
    useEffect(()=>{
        getGroupList()
        getTeacherList()
    }, [])
    const navigate = useNavigate()
    const search = () => {
        axios.get(`http://185.130.44.124:8000/pair/all`)
            .then(res => {
                navigate(`../schedule?search=${group}`, { replace: true });
                }
            )
    }
    const searchTeacher = () => {
        axios.get(`http://185.130.44.124:8000/pair/all`)
            .then(res => {
                navigate(`../scheduleTeacher?search=${teacher}`, { replace: true });
                }
            )
    }

    return (
        <main className="search">
            <p>Выберите группу или преподавателя</p>
            <select onChange={changeGroup} value={group} id="search" className="form-select" aria-label="Пример выбора по умолчанию">
                <option selected>Группа:</option>
                {isLoaded ? groupList.map(list => <option value={list.id}>{list.name}</option>) : ""}
            </select>
            <button onClick={search} className="btn btn-primary fw">посмотреть расписание</button>
            <select onChange={changeTeacher} value={teacher} id="search" className="form-select" aria-label="Пример выбора по умолчанию">
                <option selected>преподаватель:</option>
                {isLoadedTeacher ? teacherList.map(list => <option value={list.id}>{list.first_name} {list.last_name}</option>) : ""}
            </select>
            <button onClick={searchTeacher} className="btn btn-primary fw">посмотреть расписание</button>
        </main>
    );
};

export default SearchSchedule;
