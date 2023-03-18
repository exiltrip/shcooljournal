import React from 'react';
import './header.sass';
import {NavLink} from "react-router-dom";


const Header = () => {
    return (
        <header>
            <nav className="navbar navbar-dark navbar-expand-lg bg-dark bg-body-tertiary"  data-bs-theme="dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/" >Logo</NavLink>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                            aria-label="Переключатель навигации">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/">Главная</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/schedule">Расписание</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/events">Мероприятия</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <NavLink className="nav-link dropdown-toggle" to="/profile" role="button" data-bs-toggle="dropdown"
                                   aria-expanded="false">
                                    Профиль
                                </NavLink>
                                <ul className="dropdown-menu dropdown-menu-dark">
                                    <li><NavLink className="dropdown-item" to="/profile">Личный кабинет</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/perfomance">Успеваемость</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/achievements">Личные достижения</NavLink></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
