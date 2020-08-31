import {auth} from "./../services/firebase";


export const signIn = ({email, password}) => {
    return auth().signInWithEmailAndPassword(email, password);
}

export const signUp = ({email, password}) => {
    return auth().createUserWithEmailAndPassword(email, password);
}