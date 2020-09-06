import React, {useContext, useState, useEffect} from 'react';
import "./chat.css";
import icon from "./../../images/user.jpeg";
import { db } from '../../services/firebase';
import {ActionContext} from "./../../Context/GlobalState";
import moment from 'moment';
import VideocamIcon from '@material-ui/icons/Videocam';
import ImageIcon from '@material-ui/icons/Image';

const ChannelItem = ({id, name}) => {

    const {dispatch} = useContext(ActionContext);
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState("");

    useEffect(() => {

        const loadName = db.collection('users').where('email', "==", name).onSnapshot(snapshot => {
            setUsername(snapshot.docs[0].data().name);
        });

        const loadMessages = db.collection('channels').doc(id).collection('messages')
                                .orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            const messages = snapshot.docs.map(snap => {
                return {
                    id: snap.id,
                    data: snap.data()
                }
            })
            setMessages(messages);
        })

        return () => {
            loadName();
            loadMessages();
        }
    }, [])

    const startChart = (id) => {
        dispatch({
            type: "SELECT_CHANNEL",
            payload: id
        })
    }

    return (
        <div className="user_item_box" onClick={() => startChart(id)} >
            <div className="user__item">
                <div className="image__box">
                    <div className="image__rounded">
                        <img src={icon} className="image_user" alt="User Icon"/>
                    </div>
                </div>
                <div className="user_info_box">
                    <div className="user__first_block">
                        <div className="user_name_block">
                            <span className="user__name">{username}</span>
                        </div>
                        <div className="lastTime">{messages[0]?.data.timestamp && moment(new Date(messages[0]?.data.timestamp?.toDate()).toUTCString()).local().format('hh:mm a')}</div>
                    </div>
                    <div className="last_message_block">
                        {
                            messages[0]?.data.type === "media"
                            ?
                                messages[0].data.contentType === "video/mp4"
                                ?
                                <div className="last_message"> <VideocamIcon/> Video</div>
                                :
                                <div className="last_message"> <ImageIcon/> Photo</div>
                            :
                            <div className="last_message">{messages[0]?.data.body}</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChannelItem;