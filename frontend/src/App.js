import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoggedUsersProtect from "./routing/loggedUsersProtect";
import {useState} from "react";
import {Navigate} from "react-router";

import Header from "./components/header/header";
import Main from "./components/main/main";
import Login from "./components/login/login";
import Schedule from "./components/schedule/schedule";
import ScheduleEdit from "./components/schedule/scheduleEdit/scheduleEdit";


function App() {

    const [isLoggedIn, setisLoggedIn] = useState(null);

    const logIn = () => {
        setisLoggedIn(true);
        localStorage.setItem('isLoggedIn', true);
    };
    const logOut = () => {
        setisLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        <Navigate to="/login" replace />;
    };

  return (
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} logOut={logOut}/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/profile" element={<LoggedUsersProtect isLoggedIn={isLoggedIn}> <Main /> </LoggedUsersProtect>}/>
          <Route path="/authorization" element={<Main isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} logIn={logIn} />}/>
          <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} logIn={logIn} />}/>
          <Route path="/schedule" element={<Schedule isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} logIn={logIn} />}/>
          <Route path="/scheduleEdit" element={<ScheduleEdit isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} logIn={logIn} />}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
