import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addQuestionCreator } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class AddQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: ''
    }

    addQuestion = (event) => {
        event.preventDefault()
        this.props.dispatch(addQuestionCreator(this.state, this.props.authedUser))

        this.setState({
            optionOne: '',
            optionTwo: ''
        })
    }

    render() {
        console.log(this.state)
        if (this.props.authedUser === null) {
            return <Redirect to="/error" />
        }
        return (
            <div className='form'>
                <div className='title'>
                    ADD POLL
                    </div>
                <div>Would you rather ...</div>
                <div className='option-container'>

                    <input name='optionOne' value={this.state.optionOne}
                        placeholder='Enter Option One'
                        className='option-input'
                        onChange={(event) => this.setState({
                            optionOne: event.target.value
                        })}></input>

                    <span style={{ padding: '2%' }}>OR</span>

                    <input name='optionTwo' value={this.state.optionTwo}
                        placeholder='Enter Option Two'
                        className='option-input'
                        onChange={(event) => this.setState({
                            optionTwo: event.target.value
                        })}></input>
                </div>
                <div className='login-button'>
                    <button onClick={(event) => this.addQuestion(event)}>Submit Poll</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ authedUser }) => {
    return { authedUser }
}

export default connect(mapStateToProps)(AddQuestion)