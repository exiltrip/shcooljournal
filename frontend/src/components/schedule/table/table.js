import React, {useState} from 'react'
import styled from 'styled-components'
import axios from "axios";
import {useEffect} from "react";

const Styles = styled.div`

  table {
    width: 100%;
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`



function ScheduleTable(props) {

    const [data, setData] = useState([])
    const getData = () => {
        axios.get(`http://185.130.44.124:8000/pair/all?search=${props.id}`)
            .then(res => {
                setData(res.data.results)
            })
    }
    useEffect(() =>{
        getData()
    }, [])

    return (
        <Styles>
            <div className="schedule-container">

                <table className="scheduleTable" >
                    <thead>
                    <th>дата</th>
                    <th>предмет</th>
                    <th>аудитория</th>
                    <th>группа</th>
                    <th>преподаватель</th>
                    </thead>
                    {data.map(aud =>
                    <tbody>
                     <th>{aud.start_time} - {aud.end_time}</th>
                     <th>{aud.group_id.name}</th>
                     <th>{aud.audit_id.name}</th>
                     <th>{aud.group_id.name}</th>
                     <th>{aud.teacher_id.first_name} {aud.teacher_id.last_name}</th>
                    </tbody>
                     )}

                </table>
            </div>
        </Styles>
    )
}

export default ScheduleTable
