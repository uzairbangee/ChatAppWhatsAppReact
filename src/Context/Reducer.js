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
        default:
            return {
                ...state
            }
    }
}

export default Reducer;