export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'

export function loginUserCreator (id){
    return {
        type: LOGIN_USER,
        authedUser : id
    }
}

export function logoutUserCreator (){
    return {
        type: LOGOUT_USER,
        authedUser : null
    }
}