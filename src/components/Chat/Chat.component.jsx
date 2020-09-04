import React from 'react';
import "./chat.css";
import ChatSideBar from "./ChatSideBar.component";
import ChatArea from './ChatArea.component';

const Chat = () => {
    return (
        <div className="chat__app">
            <ChatSideBar/>
            <ChatArea/>
        </div>
    )
}

export default Chat;