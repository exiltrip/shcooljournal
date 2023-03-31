import React from 'react';
import './addUser.sass'
const AddUser = () => {



    return (
        <main className="main">
            <span>логин</span>
            <input type="text" className="form-control" id="login" />
            <span>пароль</span>
            <input type="password" className="form-control" id="password" />
            <span>почта</span>
            <input type="email" className="form-control" id="email" />
            <span>имя</span>
            <input type="text" className="form-control" id="firstname" />
            <span>фамилия</span>
            <input type="text" className="form-control" id="lastname" />
            <span>группа</span>
            <select id="search" className="form-select" aria-label="группа:">
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
            <button type="submit" className="btn btn-primary btn-register">Зарегестрировать</button>
        </main>
    );
};

export default AddUser;
