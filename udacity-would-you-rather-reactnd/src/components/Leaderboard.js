import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Leaderboard extends Component {

    state = {
        sortedUsers: this.props.usersScores.sort((user1, user2) => user2.score - user1.score)
    }

    render() {
        console.log(this.state.sortedUsers)
        const leaderColors = ['#f8de7e', '#dcdcdc', '#c2b280']

        
        if (this.props.authedUser === null) {
            return <Redirect to="/error" />
        }
        return (
            <div className='dashboard-content'>
                <div className='leader-list'>
                    {this.state.sortedUsers.map((user, index) => <div className='leader-cards' key={user.user.id}>
                        {user.user.name}
                        <div style={{ backgroundColor: leaderColors[index] }} className='question-card'>
                            <div className='avatar-card'>
                                <img alt="avatar" className="avatar" src={`${user.user.avatarURL}`} />
                            </div>
                            <div style={{ textAlign: 'center' }} className='teaser-poll'>
                                Score: <span style={{ fontWeight: 'bold' }}>{user.score}</span>
                                <br></br>
                                Polls created: {user.user.questions.length}
                                <br></br>
                                Questions Answered: {user.score - user.user.questions.length}
                            </div>
                        </div>
                    </div>)}
                </div>
            </div >
        )
    }
}

const mapStateToProps = ({ authedUser, users }) => {

    const usersScores = Object.values(users).map((user) => {
        const score = Object.keys(user.answers).length + user.questions.length
        return { user, score }
    })
    return { authedUser, usersScores }
}

export default connect(mapStateToProps)(Leaderboard)