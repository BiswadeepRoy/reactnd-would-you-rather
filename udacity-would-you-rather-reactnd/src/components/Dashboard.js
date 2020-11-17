import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionCard from './QuestionCard'
import { Redirect } from 'react-router-dom'

class Dashboard extends Component {

    state = {
        unanswered: true,
    }

    changeState = (toggle) => {
        this.setState(() => {
            return {
                unanswered: toggle
            }
        })
    }

    render() {
        const questions = this.state.unanswered ? this.props.unansweredQuestions : this.props.answeredQuestions
        if (this.props.authedUser === null) {
            return <Redirect to="/login" />
        }
        return (
            <div className='dashboard-content'>
                <div className='tab-switcher'>
                    <button className='tab active' onClick={(event) => {
                        this.changeState(true)
                        event.target.className = 'tab active'
                        event.target.parentNode.children[1].className = 'tab'
                    }}>Unanswered</button>
                    <button className='tab' onClick={(event) => {
                        this.changeState(false)
                        event.target.className = 'tab active'
                        event.target.parentNode.children[0].className = 'tab'
                    }}>Answered</button>
                </div>
                <div className='question-list'>
                    {(questions.length > 0) && (
                        <div className='question-cards'>
                            {questions.map(question =>
                                <div style={{ width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} key={question.id}>
                                    <QuestionCard question={question} user={this.props.users[question.author]} />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        )
    }

}

const mapStateToProps = ({ authedUser, questions, users }) => {
    const answeredQuestions = authedUser === null ? [] : Object.keys(users[authedUser].answers).map(id => questions[id])
    const unansweredQuestions = authedUser === null ? [] : Object.keys(questions).filter((id) => !Object.keys(users[authedUser].answers).includes(id)).map((id) => questions[id])
    return {
        authedUser,
        answeredQuestions,
        unansweredQuestions,
        users
    }
}

export default connect(mapStateToProps)(Dashboard)