export const RECEIVE_USERS = 'RECEIVE_USERS'   

export function receiveUsersCreator(users){
    return{
        type: RECEIVE_USERS,
        users
    }
}