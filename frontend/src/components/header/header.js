import React from 'react';
import './header.sass';
import {NavLink} from "react-router-dom";
import logo from '../../assets/favicon.ico'

const Header = (props) => {
    return (
        <header>
            <nav className="navbar navbar-dark navbar-expand-lg bg-dark bg-body-tertiary"  data-bs-theme="dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/" ><img src={logo} alt="" className="logo"/></NavLink>

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
                                <NavLink className="nav-link" to="/searchSchedule">Расписание</NavLink>
                            </li>
                            <div className="d-flex navbar-nav account">
                            <li className="nav-item dropdown">
                                <NavLink className="nav-link dropdown-toggle" to="/profile" role="button" data-bs-toggle="dropdown"
                                   aria-expanded="false">
                                    Профиль
                                </NavLink>
                                {
                                    props.isLoggedIn ?
                                        (<ul className="dropdown-menu dropdown-menu-dark">
                                            <li><NavLink className="dropdown-item" to="/profile" onClick={props.logOut}>выйти</NavLink>
                                            </li>
                                            {
                                                props.isAdmin ?
                                                    (<>
                                                        <li><NavLink className="dropdown-item" to="/scheduleEdit">изменение расписания</NavLink></li>
                                                        <li><NavLink className="dropdown-item" to="/groupedit">изменение групп</NavLink></li>
                                                     </>)
                                                    : ""
                                            }
                                        </ul>)
                                        : (<ul className="dropdown-menu dropdown-menu-dark">
                                            <li><NavLink className="dropdown-item" to="/login">Войти</NavLink></li>
                                        </ul>)
                                }
                            </li>
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
