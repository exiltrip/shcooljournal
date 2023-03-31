import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoggedUsersProtect from "./routing/loggedUsersProtect";
import {useState} from "react";
import {Navigate} from "react-router";

import Header from "./components/header/header";
import Main from "./components/main/main";
import Login from "./components/login/login";
import Schedule from "./components/schedule/schedule";
import ScheduleEdit from "./components/schedule/scheduleEdit/scheduleEdit";
import AccessProtected from './routing/accessProtected'
import Denied from "./routing/denied";
import SearchSchedule from "./components/searchSchedule/searchSchedule";
import AddUser from "./components/lk-admin/addUser/addUser";
import ScheduleTeacher from "./components/schedule/scheduleTeacher";

function App() {

    const [isLoggedIn, setisLoggedIn] = useState(localStorage.getItem('isLoggedIn'));
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin'));

    const admin = () => {
        setIsAdmin(true);
        localStorage.setItem('isAdmin', true);
        setIsAdmin( true);
    };


    const removeAdmin = () => {
        setIsAdmin(false);
        localStorage.removeItem('isAdmin');
        <Navigate to="/main" replace />;
    };

    const logIn = () => {
        setisLoggedIn(true);
        localStorage.setItem('isLoggedIn', true);
    };
    const logOut = () => {
        setisLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('isAdmin');
        <Navigate to="/login" replace />;
    };

  return (
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} isAdmin={isAdmin} removeAdmin={removeAdmin} setisLoggedIn={setisLoggedIn} logOut={logOut}/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/denied" element={<Denied admin={admin}/>}/>
          <Route path="/profile" element={<LoggedUsersProtect isLoggedIn={isLoggedIn}> <Main /> </LoggedUsersProtect>}/>
          <Route path="/authorization" element={<Main isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} logIn={logIn} />}/>
          <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} logIn={logIn} />}/>
          <Route path="/schedule" element={<Schedule isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} logIn={logIn} />}/>
          <Route path="/scheduleTeacher" element={<ScheduleTeacher isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} logIn={logIn} />}/>
          <Route path="/searchSchedule" element={<SearchSchedule isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} logIn={logIn} />}/>
          <Route path="/scheduleEdit" element={<AccessProtected isAdmin={isAdmin}><ScheduleEdit isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} logIn={logIn} /></AccessProtected>}/>
          <Route path="/scheduleEdit" element={<AccessProtected isAdmin={isAdmin}><ScheduleEdit isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} logIn={logIn} /></AccessProtected>}/>
          <Route path="/adduser" element={<AccessProtected isAdmin={isAdmin}><AddUser isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} logIn={logIn} /></AccessProtected>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
