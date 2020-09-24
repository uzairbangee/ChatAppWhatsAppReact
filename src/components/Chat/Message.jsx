import React, {useContext} from 'react'
import moment from 'moment';
import {ActionContext} from "./../../Context/GlobalState";

function Message({message}) {

    const { user} = useContext(ActionContext);
    return (
        <div className={message.data.author === user.email ? "message__sent_box"  : "message__recieve_box"} >
            <span></span>
            <div className={message.data.author === user.email ? "message__sent"  : "message__recieve"}>
                {message.data.body}
                <div className={message.data.author === user.email ? "message_sent_time"  : "message_recieve_time"}>
                    {message.data.timestamp && moment(new Date(message.data.timestamp?.toDate()).toUTCString()).local().format('hh:mm a')}
                </div>
            </div>
        </div>
    )
}

export default Message
