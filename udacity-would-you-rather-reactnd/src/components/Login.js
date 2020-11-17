import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUserCreator } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'

class Login extends Component {

    state = {
        userId: '',
        loggedIn: false
    }

    changeUser = (event) => {

        const userId = event.target.value;
        this.setState({ userId })
    }

    loginUser = (event) => {

        event.preventDefault()
        if (this.state.userId === '') {
            alert('Please choose user to login')
        }
        else {
            this.props.dispatch(loginUserCreator(this.state.userId))
            this.setState({
                loggedIn: true
            })
        }

    }

    render() {

        const users = this.props.users
        const userIds = Object.keys(users)
        if (!this.state.loggedIn) {
            return (
                <div className='form'>
                    <div className='title'>
                        LOGIN
                    </div>
                    <div className='user-select'>

                        <span>Select User : </span>
                        <select defaultValue='default' onChange={(event) => this.changeUser(event)}>
                            <option key='default' value='default' disabled>Please choose user to login..</option>
                            {userIds.map(id => <option key={id} value={id}>{users[id].name}</option>)}
                        </select>

                    </div>
                    <div className='login-button'>

                        <button onClick={(event) => this.loginUser(event)}>Login</button>

                    </div>
                </div>
            )
        }
        else {
            return <Redirect to={{ pathname: '/' }} />
        }

    }
}

const mapStateToProps = ({ users }) => {
    return { users }
}

export default connect(mapStateToProps)(Login)