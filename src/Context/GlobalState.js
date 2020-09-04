import React, {createContext, useReducer} from 'react';
import Reducer from "./Reducer";

const initialState = {
    name: "",
    user : {},
    authenticated : false,
    channel_id: "",
    showChannelList: true,
    showUserList: false
}

export const ActionContext = createContext(initialState);

export const GlobalState = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    return (
        <ActionContext.Provider value={{
            name : state.name,
            user : state.user,
            channel_id : state.channel_id,
            showUserList: state.showUserList,
            showChannelList: state.showChannelList,
            authenticated : state.authenticated,
            dispatch
        }}
        >
            {children}
        </ActionContext.Provider>
    )
}