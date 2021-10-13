import React from 'react';
import "./Message.css"
import {format} from "timeago.js"

const Messages = ({message, me}) => {
    return (
        <div className={me ? "message own" : "message"}>
            <div className="messageTop">
                <p className="messageText">{message.text}.</p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    )
}

export default Messages
