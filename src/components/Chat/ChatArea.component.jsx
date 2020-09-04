import React, {useContext, useEffect, useState} from 'react';
import "./chat.css";
import icon from "./../../images/user.jpeg";
import { db } from '../../services/firebase';
import {ActionContext} from "./../../Context/GlobalState";
import firebase from "firebase";
import moment from 'moment';

const ChatArea = () => {

    const {channel_id, user} = useContext(ActionContext);
    const [user_name, setName] = useState("");
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        if(channel_id){
            const channelLoad = db.collection('channels').doc(channel_id).onSnapshot(snapshot => {
                const otherUser = snapshot.data().members.filter(member => member !== user.email);
                db.collection('users').where('email', "==", otherUser[0]).onSnapshot(snapshot => {
                    setName(snapshot.docs[0].data().name);
                })
            })

            const loadMessages = db.collection('channels').doc(channel_id).collection('messages')
                                    .orderBy('timestamp', 'asc').onSnapshot(snapshot => {
                const messages = snapshot.docs.map(snap => {
                    return {
                        id: snap.id,
                        data: snap.data()
                    }
                })
                setMessages(messages);
            })
        
            return () => {
                channelLoad();
                loadMessages();
            }
        }
    }, [channel_id])

    const handleChange = (e) => {
            setNewMessage(e.target.value);
    }

    const handleSubmit = (e) => {
        if (e.keyCode === 13){
            sendMessage();
        }
    }

    const sendMessage = () => {
        if(newMessage){
            db.collection('channels').doc(channel_id).collection('messages').add({
                type: 'text',
                author: user.email,
                body: newMessage,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            setNewMessage("");
        }
    }

    return (
        <div className="main__chat__area">
            <div className="background"></div>
            {
                channel_id &&
                <>
                <header className="chat_user_name">
                    <div className="user__img" style={{flexGrow: 0}}>
                        <div className="users__icon">
                            <img src={icon} className="main__user__img" alt="User Icon"/>
                        </div>
                    </div>
                    <div className="chat_user_info" style={{paddingLeft: '20px'}}>
                        <div className="user_name_block">
                            <span className="user__name" style={{paddingLeft: '6px'}}>{user_name}</span>
                        </div>
                        <div className="lastTime">{messages[messages.length - 1]?.data.timestamp && `Last seen at ${moment(new Date(messages[messages.length - 1]?.data.timestamp?.toDate()).toUTCString()).local().format('hh:mm a')}`}</div>
                    </div>
                    <div className="chat_icon_bar">
                        <i className="fas fa-ellipsis-v"></i>
                    </div>
                </header>

                <div className="chat__area__start">
                    <div className="chat__area">
                        <div className="gap"></div>
                        <div className="message_list__area">

                            {
                                
                                messages.map((message, index) => (
                                    <span key={message.id}>
                                            {
                                                index !== 0 && moment(new Date(messages[index].data.timestamp?.toDate()).toUTCString()).local().format('DD/MM/YY') !== moment(new Date(messages[index - 1].data.timestamp?.toDate()).toUTCString()).local().format('DD/MM/YY')
                                                &&
                                                <div className="date__area">
                                                    <div className="date__box">
                                                        <span className="date"> {moment(new Date(message.data.timestamp?.toDate()).toUTCString()).local().format('DD/MM/YY')} </span>
                                                    </div>
                                                </div>
                                            }
                                            {
                                                index === 0
                                                &&
                                                <div className="date__area">
                                                    <div className="date__box">
                                                        <span className="date"> {moment(new Date(message.data.timestamp?.toDate()).toUTCString()).local().format('DD/MM/YY')} </span>
                                                    </div>
                                                </div>
                                            }
                                        
                                        <div className={message.data.author === user.email ? "message__sent_box"  : "message__recieve_box"} >
                                            <span></span>
                                            <div className={message.data.author === user.email ? "message__sent"  : "message__recieve"}>
                                                {message.data.body}
                                                <div className={message.data.author === user.email ? "message_sent_time"  : "message_recieve_time"}>
                                                    {message.data.timestamp && moment(new Date(message.data.timestamp?.toDate()).toUTCString()).local().format('hh:mm a')}
                                                </div>
                                            </div>
                                        </div>
                                    </span>
                                ))
                            }
                        </div>
                    </div>
                </div>

                <div className="footer__box">
                    <div className="footer__inner">
                        <input className="message__input" name="message" value={newMessage} onKeyUp={handleSubmit} onChange={handleChange} placeholder="Type a message" />
                        {
                            newMessage &&
                            <div className="button_box" onClick={sendMessage}>
                            <button className="send_button">
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </div>
                        }
                    </div>
                </div>
                </>
            }
        </div>
    );
}

export default ChatArea;