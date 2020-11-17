import React, { Component } from 'react'
import { connect } from 'react-redux'
import { answerQuestionCreator } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class ViewQuestion extends Component {
    state = {
        answered: this.props.answered,
        answer: 'optionOne'
    }

    submitVote = () => {
        this.props.dispatch(answerQuestionCreator(this.props.authedUser, this.props.id, this.state.answer))
        this.setState({
            answered: true
        }
        )
    }

    render() {
        const { question, user, users } = this.props
        const optionTwoVotes = parseInt((question.optionTwo.votes.length / Object.keys(users).length) * 100, 10);
        const optionOneVotes = parseInt((question.optionOne.votes.length / Object.keys(users).length) * 100, 10);
        if (!question) {
            return <Redirect to="/error" />
        }
        else if (this.state.answered) {
            return (
                <div className='view-question'>
                    <div className='question-card-view'>
                        {console.log(this.props)}
                        <div className='avatar-card'>
                            <img alt="avatar" className="avatar" src={`${this.props.user.avatarURL}`} />
                        </div>
                        <div className='teaser-poll'>
                            <span style={{ fontWeight: 'bolder' }}>Asked by {user.name} .</span>
                            <br></br>
                            <span></span>
                            <br></br>
                            <div className='results'>
                                <div className='optionOne'>
                                    <span style={{ fontWeight: 'bold' }}>{question.optionOne.text}</span><br></br>
                                    {question.optionOne.votes.length} out of {Object.keys(users).length} voted in favour<br></br>
                                    {optionOneVotes}% votes
                                    <div className='load'>
                                        <div style={{ width: `${optionOneVotes}%`, height: '100%' }} className='water'></div>
                                        <div style={{ width: `${100 - optionOneVotes}%`, height: '100%' }}></div>
                                    </div>
                                </div>
                                <div className='optionTwo'>
                                    <span style={{ fontWeight: 'bold' }}>{question.optionTwo.text}</span><br></br>
                                    {question.optionTwo.votes.length} out of {Object.keys(users).length} voted in favour<br></br>
                                    {optionTwoVotes}% votes
                                    <div className='load'>
                                        <div style={{ width: `${optionTwoVotes}%`, height: '100%' }} className='water'></div>
                                        <div style={{ width: `${100 - optionTwoVotes}%`, height: '100%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className='view-question'>
                    <div className='question-card-view'>
                        {console.log(this.props)}
                        <div className='avatar-card'>
                            <img alt="avatar" className="avatar" src={`${this.props.user.avatarURL}`} />
                        </div>
                        <div className='teaser-poll'>
                            <span style={{ fontWeight: 'bolder' }}>{this.props.user.name} asks ..</span>
                            <br></br>
                            <br></br>
                            <span>Would you rather .. </span>
                            <br></br>
                            <div onChange={(event) => this.setState({ answered: false, answer: event.target.value })}>
                                <input type="radio" value='optionOne' name="option" defaultChecked /> {this.props.question.optionOne.text}
                                <br></br>
                                <input type="radio" value='optionTwo' name="option" /> {this.props.question.optionTwo.text}
                            </div>
                            <br></br>
                            <span style={{ width: '100%', display: 'flex', justifyContent: 'center' }}><button onClick={() => this.submitVote()}>Submit Vote</button></span>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = ({ authedUser, users, questions }, { match }) => {
    const { id } = match.params
    const question = questions[id]
    const answered = authedUser ? typeof (users[authedUser].answers[id]) !== 'undefined' : false
    const user = users[question.author]
    return { authedUser, id, answered, question, user, users }
}

export default connect(mapStateToProps)(ViewQuestion)