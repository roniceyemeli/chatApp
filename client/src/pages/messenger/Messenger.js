import axios from 'axios'
import React, { useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux"
import Conversations from '../../components/conversations/Conversations';
import Messages from '../../components/messages/Messages';
import {io} from "socket.io-client";
import "./Messenger.css";
import ChatOnline from '../../components/chat/ChatOnline';


const Messenger = () => {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [comingMessage, setComingMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const {user} = useSelector(state => state);
    const scrollMsg = useRef();
    const socket = useRef();
    
     //connect the socket server to the client
    useEffect(() => {
        socket.current = io("ws://localhost:9000");
        socket.current.on("getMessage", data =>{
            setComingMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        })
    }, [])
    

    useEffect(() => {
        comingMessage && currentChat?.members.includes(comingMessage.sender) &&
        setMessages((previous) => [...previous, comingMessage])
    }, [comingMessage, currentChat])
    
    // add and get users to/from  the server
    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", users =>{
            setOnlineUsers(user.followings.filter((f) => users.some((u) => u.userId === f)))
        })
    }, [user])


    //fetch conversation
    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get("/conv/" + user._id);
                setConversations(res.data);
            } catch (err) {
                console.log(err);
            }
            };
            getConversations();
        }, [user._id])

        //get messages
    useEffect(() => {
        const getMessages = async() => {
            try {
                const res = await axios.get("/mess/"+currentChat?._id)
                setMessages(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        getMessages()
    }, [currentChat])

    //submit new messages
    const handleSubmit = async(e) =>{
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id
        };

        const receiverId = currentChat.members.find(member => member !== user._id)

        socket.current.emit('sendMessage', {
            senderId: user._id,
            receiverId,
            text: newMessage,
        });

        try {
            const res = await axios.post("/mess", message)
            setMessages([...messages, res.data])
            setNewMessage("")
        } catch (error) {
            console.log(error)
        }
    }

    //scroll down automatically after a new message
    useEffect(() => {
        scrollMsg.current?.scrollIntoView({behavior: "smooth"})
    }, [messages])


return (
    <div className="messenger">
        <div className="chatMenu">
            <div className="chatMenuWrapper">
                <p className="headerMenu"> Friends of {user?.username}</p>
                {
                    conversations.map( (conv) => (
                        <div onClick={() => setCurrentChat(conv)}>
                        <Conversations conversation={conv}
                        currentUser ={user} key={conv._id}
                        />
                        </div>
                    ) )
                }
            </div>
        </div>
        <div className="chatBox">
            <div className="chatBoxWrapper">
                {
                    currentChat ? 
                    <>
                    <div className="chatBoxTop">
                        {
                            messages.map(msg =>
                                <div ref={scrollMsg}>
                                    <Messages message={msg}
                                        me={msg.sender === user._id} key={msg._id}/>
                                </div> )
                        }
                    </div>
                <div className="chatBoxBottom">
                    <textarea
                        className="chatMessageInput" 
                        placeholder=" type your text"
                        onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage}
                        ></textarea>
                    <button className="chatSubmitButton" onClick={handleSubmit}>send</button>
                </div>
                    </>
                : <span className="noConvText">click on user to start</span> }
            </div>
        </div>
        <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <ChatOnline onlineUsers={onlineUsers} 
                        currentId={user._id}
                        setCurrentChat={setCurrentChat}/>
                        
                </div>
            </div>
    </div>
)
}

export default Messenger
