import { getQuestions, getUsers } from '../utils/helpers'
import { receiveQuestionsCreator } from './questions'
import { receiveUsersCreator } from './users'

export default function handleInitialData() {
    return (dispatch) => {
        Promise.all([getQuestions(), getUsers()]).then(([questions, users ]) => {
            dispatch(receiveQuestionsCreator(questions))
            dispatch(receiveUsersCreator(users))
        }
        )
    }
}
