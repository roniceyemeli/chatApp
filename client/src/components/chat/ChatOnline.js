import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./ChatOnline.css"

const ChatOnline = ({onlineUsers, currentId, setCurrentChat }) => {
    const [friends, setFriends] = useState([])
    const [onlineFriends, setOnlineFriends] = useState([])

    useEffect(() => {
        const getFriends = async() =>{
            const res = await axios.get("/user/friends/" + currentId);
            setFriends(res.data);
        };
        getFriends(); 
    }, [currentId])

    useEffect(() => {
        setOnlineFriends(friends.filter((friend) => onlineUsers.includes(friend._id)));
    }, [friends, onlineUsers]);

    const handleClick = async(user) =>{
        try {
            const res = await axios.get(
                `/conv/find/${currentId}/${user._id}`
            );
            setCurrentChat(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="chatOnline">
            {onlineFriends.map(of => (

                <div className="chatOnlineFriend" onClick={() => handleClick(of)}>
                <div className="chatOnlineImgContainer">
                    <div className="chatOnlineBadge"></div>
                </div>
            <span className="chatOnlineName">{of?.username}</span>
            </div>
            ))}
        </div>
    )
}

export default ChatOnline
