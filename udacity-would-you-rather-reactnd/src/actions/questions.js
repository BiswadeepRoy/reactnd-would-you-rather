import { saveQuestion, saveQuestionAnswer, getQuestions, getUsers } from '../utils/helpers'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

export function receiveQuestionsCreator(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

export function addQuestionCreator(options, author) {
    return (dispatch) => {
        const { optionOne, optionTwo } = options
        saveQuestion({ optionOneText: optionOne, optionTwoText: optionTwo, author }).then(question =>
            getUsers().then((users) => {

                dispatch({
                    type: ADD_QUESTION,
                    question,
                    users
                })
            }))
    }
}

export function answerQuestionCreator(authedUser, questionid, answer) {
    return (dispatch) => {
        console.log({ authedUser, questionid, answer })
        saveQuestionAnswer({ authedUser, qid: questionid, answer }).then(getQuestions().then((questions) => getUsers()
            .then((users) => {
                dispatch({
                    type: ANSWER_QUESTION,
                    questions,
                    users
                })
            })))
    }
}