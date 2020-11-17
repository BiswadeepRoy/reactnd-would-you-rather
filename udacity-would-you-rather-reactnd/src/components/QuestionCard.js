import { Component } from "react";
import { Redirect } from 'react-router-dom'

class QuestionCard extends Component {

    state = { viewQuestion: false }

    render() {
        if (this.state.viewQuestion) {
            return <Redirect to={{ pathname: '/question/' + this.props.question.id }} />
        }
        else {
            return (
                <div className='question-card'>
                    <div className='avatar-card'>
                        <img alt="avatar" className="avatar" src={`${this.props.user.avatarURL}`} />
                    </div>
                    <div className='teaser-poll'>
                        <span style={{ fontWeight: 'bolder' }}>{this.props.user.name} asks ..</span>
                        <br></br>
                        <span>Would you rather {this.props.question.optionOne.text} OR ...</span>
                        <br></br>
                        <span style={{ width: '100%', display: 'flex', justifyContent: 'center' }}><button className='poll' onClick={() => this.setState({ viewQuestion: true })}>View</button></span>
                    </div>
                </div>
            )
        }
    }
}

export default QuestionCard;
