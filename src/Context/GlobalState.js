import React, {createContext, useReducer, useState} from 'react';
import Reducer from "./Reducer";

const initialState = {
    user : {},
    authenticated : false
}

export const ActionContext = createContext(initialState);

export const GlobalState = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    return (
        <ActionContext.Provider value={{
            user : state.user,
            authenticated : state.authenticated,
            dispatch
        }}
        >
            {children}
        </ActionContext.Provider>
    )
}