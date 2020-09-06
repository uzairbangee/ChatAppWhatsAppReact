import React, {useContext, useEffect, useRef, useState} from 'react';
import "./chat.css";
import icon from "./../../images/user.jpeg";
import { db, storageRef } from '../../services/firebase';
import {ActionContext} from "./../../Context/GlobalState";
import firebase from "firebase";
import moment from 'moment';
import AttachFileSharpIcon from '@material-ui/icons/AttachFileSharp';
import SendIcon from '@material-ui/icons/Send';
import ClearSharpIcon from '@material-ui/icons/ClearSharp';
import Loading from "./../Loading/Loading.component";

const ChatArea = () => {

    const fileInput = useRef();
    const scrollDiv = useRef(null);

    const {channel_id, user} = useContext(ActionContext);
    const [user_name, setName] = useState("");
    const [toggle, setToggle] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [file, setFile] = useState({});
    const [previewImage, setPreviewImage] = useState("");
    const [caption, setCaption] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);

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
                scrollDown();
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

    const scrollDown = () => {
        scrollDiv.current.scrollTop = scrollDiv.current.scrollHeight;
    }

    const cancelPreview = () => {
        setFile({});
        setPreviewImage("");
    }

    const handleSubmit = (e) => {
        if (e.keyCode === 13){
            sendMessage();
        }
    }

    const handleCaptionChange = (e) => {
        setCaption(e.target.value);
    }

    const clickInput = () => {
        fileInput.current.click();
    }

    const fileChange = (e) => {
        setToggle(false);
        setFile(e.target.files[0]);
        const reader = new FileReader();
        const url = reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
            setPreviewImage(reader.result)
        }
    }

    const sendMessage = () => {
        if(file?.type){
            setPreviewImage('');
            setButtonDisabled(true);
            const uploadTask = storageRef.child('photos/'+file.name).put(file, {
                contentType: file.type,
            });
            uploadTask.on('state_changed', (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            }, (error) => {
            // Handle unsuccessful uploads
            }, () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    cancelPreview();
                    setButtonDisabled(false);
                    db.collection('channels').doc(channel_id).collection('messages').add({
                        type: 'media',
                        author: user.email,
                        caption: caption,
                        mediaURL: downloadURL,
                        contentType : file.type,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    })
                });
            });
        }
        else{
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
        scrollDown();
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
                        <div className="button_ups">
                            <span onClick={() => setToggle(!toggle)}>
                                {/* <i class="fas fa-paperclip"></i> */}
                                <AttachFileSharpIcon/>
                            </span>
                            {
                                toggle &&
                                <span>
                                    <div className="uploading__area_block">
                                        <div className="uploading__area_horizon">
                                            <ul className="ul_list">
                                                <li className="upload_item">
                                                    <button className="upload_button" onClick={clickInput}>
                                                        <i className="fas fa-image"></i>
                                                    </button>
                                                    <input type="file" name="input_image" accept="image/*,video/mp4" ref={fileInput} onChange={fileChange} className="file_input"/>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </span>
                            }
                        </div>
                        <div className="button_ups">
                            <i className="fas fa-ellipsis-v"></i>
                        </div>
                    </div>
                </header>

                {
                    file?.type &&
                    <div className="preview_box_block">
                        <div className="preview__inner">
                            <div className="preview__back">
                                <header className="preview__header">
                                    <div className="preview__header_block">
                                        <button className="preview__cancel_button" onClick={cancelPreview}>
                                            <ClearSharpIcon/>
                                        </button>
                                        <div className="preview__heading">
                                            Preview
                                        </div>
                                    </div>
                                </header>
                                <div className="preview__body">
                                    <div className="first__portion">

                                        <div className="preview_first__block">
                                            <div className="preview__image_area__block">
                                                <div className="preview__image_area">
                                                    {
                                                        file?.type === "video/mp4"
                                                        ?
                                                            previewImage
                                                            ?
                                                                <video className="preview__image" controls>
                                                                    <source src={previewImage} type="video/mp4" />
                                                                    Your browser does not support the video tag.
                                                                </video>
                                                            :
                                                            <Loading type="spinner-border text-success"/>
                                                        :
                                                            previewImage
                                                            ?
                                                                <img src={previewImage} alt="" className="preview__image"/>
                                                            :
                                                            <Loading type="spinner-border text-success"/>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                <div className="chat__area__start">
                    <div className="chat__area" ref={scrollDiv}>
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
                                        {
                                            message.data.type === "media"
                                            ?
                                                message.data.contentType === "video/mp4"
                                                ?
                                                    <div className={message.data.author === user.email ? "image_box_block_send" : "image_box_block_recieve"}>
                                                        <div className={message.data.author === user.email ? "image_box_send" : "image_box_recieve"}>
                                                                <video className={message.data.author === user.email ? "image_send" : "image_recieve"} controls>
                                                                    <source src={message.data.mediaURL} type="video/mp4" />
                                                                    Your browser does not support the video tag.
                                                                </video>
                                                            <div className={message.data.author === user.email ? "caption_sent" : "caption_recieve"}>
                                                            {message.data?.caption && message.data.caption}
                                                                <div className={message.data.author === user.email ? "message_sent_time"  : "message_recieve_time"}>
                                                                {message.data.timestamp && moment(new Date(message.data.timestamp?.toDate()).toUTCString()).local().format('hh:mm a')}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                :
                                                    <div className={message.data.author === user.email ? "image_box_block_send" : "image_box_block_recieve"}>
                                                        <div className={message.data.author === user.email ? "image_box_send" : "image_box_recieve"}>
                                                            <img src={message.data.mediaURL} className={message.data.author === user.email ? "image_send" : "image_recieve"}/>
                                                            <div className={message.data.author === user.email ? "caption_sent" : "caption_recieve"}>
                                                            {message.data?.caption && message.data.caption}
                                                                <div className={message.data.author === user.email ? "message_sent_time"  : "message_recieve_time"}>
                                                                {message.data.timestamp && moment(new Date(message.data.timestamp?.toDate()).toUTCString()).local().format('hh:mm a')}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                            :
                                                <div className={message.data.author === user.email ? "message__sent_box"  : "message__recieve_box"} >
                                                    <span></span>
                                                    <div className={message.data.author === user.email ? "message__sent"  : "message__recieve"}>
                                                        {message.data.body}
                                                        <div className={message.data.author === user.email ? "message_sent_time"  : "message_recieve_time"}>
                                                            {message.data.timestamp && moment(new Date(message.data.timestamp?.toDate()).toUTCString()).local().format('hh:mm a')}
                                                        </div>
                                                    </div>
                                                </div>
                                        }
                                    </span>
                                ))
                            }
                            
                        </div>
                    </div>
                </div>

                <div className="footer__box">
                    <div className="footer__inner">
                        {
                            file?.type
                            ?
                            <input className="message__input" name="caption" value={caption} onKeyUp={handleSubmit} onChange={handleCaptionChange} placeholder="Add a caption..." />
                            :
                            <input className="message__input" name="message" value={newMessage} onKeyUp={handleSubmit} onChange={handleChange} placeholder="Type a message" />
                        }
                        {
                            (newMessage || file?.type) &&
                            <div className="button_box" onClick={sendMessage}>
                            <button disabled={buttonDisabled} className="send_button">
                                <SendIcon/>
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