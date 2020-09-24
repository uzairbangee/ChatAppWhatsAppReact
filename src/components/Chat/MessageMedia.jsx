import React, {Fragment,useContext} from 'react'
import moment from 'moment';
import {ActionContext} from "./../../Context/GlobalState";

function MessageMedia({message}) {
    const {user} = useContext(ActionContext);
    return (
        <Fragment>
            {
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
            }
        </Fragment>
    )
}

export default MessageMedia
