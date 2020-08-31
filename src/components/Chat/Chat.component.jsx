import React from 'react';
import "./chat.css";
import icon from "./../../images/user.jpeg";

const Chat = () => {
    return (
        <div className="chat__app">
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
                    <input className="input__box" placeholder="Search or start new chat"/>
                </div>

                <div className="user__panel">
                    <div className="user_panel_structure">

                        <div className="user_item_box">
                            <div className="user__item">
                                <div className="image__box">
                                    <div className="image__rounded">
                                        <img src={icon} className="image_user" alt="User Icon"/>
                                    </div>
                                </div>
                                <div className="user_info_box">
                                    <div className="user__first_block">
                                        <div className="user_name_block">
                                            <span className="user__name">Ahmed</span>
                                        </div>
                                        <div className="lastTime">2:24pm</div>
                                    </div>
                                    <div className="last_message_block">
                                        <div className="last_message">Ok</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="main__chat__area">
                <div className="background"></div>
                <header className="chat_user_name">
                    <div className="user__img" style={{flexGrow: 0}}>
                        <div className="users__icon">
                            <img src={icon} className="main__user__img" alt="User Icon"/>
                        </div>
                    </div>
                    <div className="chat_user_info" style={{paddingLeft: '20px'}}>
                        <div className="user_name_block">
                            <span className="user__name" style={{paddingLeft: '6px'}}>Ahmed</span>
                        </div>
                        <div className="lastTime">Last seen at 2:24pm</div>
                    </div>
                </header>

                <div className="chat__area__start">
                    <div className="chat__area">
                        <div className="gap"></div>
                        <div class="message_list__area">
                            <div className="date__area">
                                <div className="date__box">
                                    <span className="date"> 25/07/2020 </span>
                                </div>
                            </div>

                            <div className="message__recieve_box">
                                <span></span>
                                <div className="message__recieve">
                                    Okay atay hain ayaar
                                    <div className="message_recieve_time">
                                        3:45pm
                                    </div>
                                </div>
                            </div>

                            <div className="message__sent_box">
                                <span></span>
                                <div className="message__sent">
                                    Okay atay hain ayaar
                                    <div className="message_sent_time">
                                        3:45pm
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="footer__box">
                    <div className="footer__inner">
                        <input className="message__input" placeholder="Type a message" />
                        <div className="button_box">
                            <button className="send_button"></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat;