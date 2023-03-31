import React from 'react';

const TimeManagement = () => {
    const showModal = () => {

    }
    return (
        <main>
            <p>Выберите группу</p>
            <select className="form-select" aria-label="Пример выбора по умолчанию">
                <option selected>Группа:</option>
                <option value="3">ИСПб-011</option>
                <option value="1">ИСПб-012</option>
                <option value="2">ИСПб-013</option>
                <option value="3">ИСПб-014</option>
                <option value="3">ИСПк-015</option>
                <option value="1">ИСПк-016</option>
                <option value="2">ИСПк-017</option>
                <option value="3">ИСПк-018</option>
            </select>
            <button onClick={showModal}>Редактировать отработку</button>
        </main>
    );
};

export default TimeManagement;
