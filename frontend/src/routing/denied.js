import React from 'react';
import './denied.sass'
const Denied = (props) => {
    return (
        <div className="denied">
            <h1 className="denied_title">oops!</h1>
            <h5 className="denied_subtitle">Доступ на страницу запрещен,приносим свои извинения</h5>
            <button onClick={props.admin}> стать админом</button>
        </div>
    );
};

export default Denied;
