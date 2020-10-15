import * as actionTypes from './actionTypes'
import axios from 'axios'
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token,userId) => {

    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => { 
        //returns milli seconds
        setTimeout(()=>{
            dispatch(logout());
        },expirationTime*1000);
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authFail = (error) => {
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email,password,isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmqeUQKd-Habd1P6QdhtcxH525Wy5hMrY'
        if(!isSignup){
            url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmqeUQKd-Habd1P6QdhtcxH525Wy5hMrY"
        }
        axios.post(url,authData)
            .then(res=>{
                console.log(res);
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expirationDate',expirationDate)
                localStorage.setItem('userId',res.data.localId)
                dispatch(authSuccess(res.data.idToken,res.data.localId))
                dispatch(checkAuthTimeout(res.data.expiresIn))
            })
            .catch(error=>{
                console.log(error)
                dispatch(authFail(error.response.data.error))
            })
    }
}

export const authCheckState = () => {
    return dispatch => {
        console.log("LOCAL STORAGE TOKENNNNNNNNNNNNNNNNNNNNNN"+localStorage.getItem('token'))
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            console.log(expirationDate+"EXPIRATION DATEEEEEEE");
            if(expirationDate <= new Date()){
                dispatch(logout())
               
               
                
            }else{
                
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token,userId))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
            }

        }

    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}