import React from 'react';
import '../schedule.sass'
import ScheduleTable from "../table/table";
const ScheduleEdit = () => {
    return (
        <main className="schedule">
        <h3>Расписание </h3>
            <ScheduleTable/>
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
                                    <label htmlFor="exampleInputEmail1" className="form-label">Начало</label>
                                    <select className="form-select" aria-label="Пример выбора по умолчанию">
                                        <option selected>время пары:</option>
                                        <option value="1">8:00 - 9: 30</option>
                                        <option value="2">9:40 - 11:10</option>
                                        <option value="3">11:20 - 12:50</option>
                                        <option value="3">13:20 - 14:50</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Аудитория</label>
                                    <select className="form-select" aria-label="Пример выбора по умолчанию">
                                        <option selected>Аудитория:</option>
                                        <option value="1">101</option>
                                        <option value="2">102</option>
                                        <option value="3">103</option>
                                        <option value="3">104</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Преподаватель</label>
                                    <select className="form-select" aria-label="Пример выбора по умолчанию">
                                        <option selected>Преподаватель:</option>
                                        <option value="1">Иванов И.И</option>
                                        <option value="2">Грибкова Н.З.</option>
                                        <option value="3">Муджахидова Ъ.Й.</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary">Отправить</button>
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
