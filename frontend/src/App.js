import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoggedUsersProtect from "./routing/loggedUsersProtect";
import {useState} from "react";
import {Navigate} from "react-router";

import Header from "./components/header/header";
import Main from "./components/main/main";


function App() {

    const [isLoggedIn, setisLoggedIn] = useState(null);

    const logIn = () => {
        setisLoggedIn(true);
        localStorage.setItem('isLoggedIn', true);
    };
    const logOut = () => {
        setisLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        <Navigate to="/authorization" replace />;
    };

  return (
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} logOut={logOut}/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/profile" element={<LoggedUsersProtect isLoggedIn={isLoggedIn}> <Main /> </LoggedUsersProtect>}/>
          <Route path="/authorization" element={<Main isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} logIn={logIn} />}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
