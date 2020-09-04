import React, {useContext, useState, useEffect} from 'react';
import "./chat.css";
import icon from "./../../images/user.jpeg";
import UserItem from './UserItem.component';
import ChannelItem from './ChannelItem.component';
import {db} from "./../../services/firebase";
import {ActionContext} from "./../../Context/GlobalState";


const ChatSideBar = () => {

    const {dispatch, user, showUserList, showChannelList} = useContext(ActionContext);
    const [userLists, setUserList] = useState([]);
    const [ChannelLists, setChannelLists] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection('users').where('uid', "!=", user.uid).onSnapshot(snapshot => {

            const data = snapshot.docs.map((snaps) => {
                return {
                    id : snaps.id,
                    data : snaps.data()
                }
            })
            setUserList(data);
        })

        const getChannels = db.collection('channels').where('members', "array-contains", user.email).onSnapshot(snapshot => {
            const data = snapshot.docs.map(snap => {
                return {
                    id: snap.id,
                    user : snap.data().members.filter(member => member !== user.email),
                    data : snap.data()
                }
            });
            setChannelLists(data);
        })

        return () => {
            unsubscribe();
            getChannels();
        }
    }, [])
    
    const handleFocus = () => {
        dispatch({
            type: "SET_SHOW_USER_LIST"
        })
    }

    const hideUserList = () => {
        dispatch({
            type: "SET_SHOW_CHANNEL_LIST"
        })
    }

    return (
        <div className="side">
            <header className="head__sidebar">
                <div className="user__img">
                    <div className="users__icon">
                        <img src={icon} className="main__user__img" alt="User Icon"/>
                    </div>
                </div>
                <div className="user__icon"></div>
            </header>

            <div className="search__bar">
                {
                    showUserList &&
                    <span className="back__arrow" onClick={hideUserList}>
                        <i className="fas fa-arrow-left"></i>
                    </span>
                }
                <input className="input__box" onFocus={handleFocus} placeholder="Search or start new chat"/>
            </div>

            <div className="user__panel">
                <div className="user_panel_structure">
                    {
                        showUserList &&
                        userLists.map(user => (
                            <UserItem key={user.id} id={user.id} name={user.data.name} />
                        ))
                    }
                    {
                        showChannelList &&
                        ChannelLists.map(user => (
                            <ChannelItem key={user.id} id={user.id} name={user.user[0]} />
                        ))
                    }

                </div>
            </div>
        </div>
    );
}

export default ChatSideBar;