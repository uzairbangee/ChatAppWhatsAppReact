const Reducer = (state, action) => {
    switch (action.type){
        case "LOGIN":
            return {
                ...state,
                authenticated : true,
                user : action.payload,
            }
        case "NOT_LOGIN":
            return {
                ...state,
                authenticated : false,
                user : {},
            }
        case "ADD_NAME":
            return {
                ...state,
                name : action.payload,
            }
        case "SELECT_CHANNEL":
            return {
                ...state,
                channel_id : action.payload
            }
        case "SET_SHOW_USER_LIST":
            return {
                ...state,
                showChannelList: false,
                showUserList : true,
            }
        case "SET_SHOW_CHANNEL_LIST":
            return {
                ...state,
                showUserList : false,
                showChannelList : true,
            }
        default:
            return {
                ...state
            }
    }
}

export default Reducer;