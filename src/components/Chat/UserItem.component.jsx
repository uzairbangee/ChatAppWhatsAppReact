import React, {useContext} from 'react';
import "./chat.css";
import icon from "./../../images/user.jpeg";
import { db } from '../../services/firebase';
import {ActionContext} from "./../../Context/GlobalState";

const UserItem = ({id, name}) => {

    const {dispatch, user} = useContext(ActionContext);

    const startChart = (id) => {
        db.collection('users').doc(id).onSnapshot(snapshot => {
            const email1 = snapshot.data().email+"-"+user.email;
            const email2 = user.email+"-"+snapshot.data().email;
            db.collection('channels').where('uniqueName', "in", [email1, email2])
                .onSnapshot(async (newsnapshot) => {
                if(newsnapshot.docs.length === 0){
                    await db.collection('channels').add({
                        uniqueName: user.email+"-"+snapshot.data().email,
                        members: [user.email, snapshot.data().email]
                    })
                    db.collection('channels').where('uniqueName', "==", user.email+"-"+snapshot.data().email).onSnapshot(newsnap => {
                        dispatch({
                            type: "SELECT_CHANNEL",
                            payload: newsnap.docs[0].id
                        })
                    })
                }
                else{
                    dispatch({
                        type: "SELECT_CHANNEL",
                        payload: newsnapshot.docs[0].id
                    })
                }
            })
        })

        dispatch({
            type: "SET_SHOW_CHANNEL_LIST"
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
                            <span className="user__name">{name}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserItem;