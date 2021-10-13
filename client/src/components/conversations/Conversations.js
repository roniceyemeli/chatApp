import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./Conversations.css"

const Conversations = ({conversation, currentUser}) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const friendId = conversation.members.find( co => co !== currentUser._id);

        const getUser = async() => {
            try {
                const res = await axios("/user?userId=" + friendId);
                setUser(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        getUser();
    }, [currentUser, conversation])

    return (
        <div className="conversations">
            <span className="conversationName">{user?.username}</span>
        </div>
    )
}

export default Conversations
