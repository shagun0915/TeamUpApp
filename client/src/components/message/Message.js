import React from 'react';
import "./message.css";
import {format} from "timeago.js";

function Message({message, own}) {
    return (
        <div>
        <div className={own ? "chat own" : "chat"}>
           
            <p className="msg"> {message.text}</p>
            <span className="time">{format(message.createdAt)}</span>        
        </div>
        </div>
       
    )
}

export default Message;


