import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUserCreator } from '../actions/authedUser'

class Nav extends Component {
    render() {
        if(this.props.authedUser === null)
        {
            return(<div></div>)
        }
        return (
            <nav className='nav-bar'>
                <div className='nav-left'>
                    <NavLink className='nav' exact to='/' activeClassName='active-nav'>Home</NavLink>
                    <NavLink className='nav' to='/add' activeClassName='active-nav'>Add Poll</NavLink>
                    <NavLink className='nav' to='/leaderboard' activeClassName='active-nav'>LeaderBoard</NavLink>
                </div>
                <div className='nav-right'>
                    Welcome ! {this.props.user ? this.props.user.name : ''} <NavLink className='nav' style={{ color: 'black', fontWeight: '500' }} onClick={() => this.props.dispatch(logoutUserCreator())} to='/'>Log out</NavLink>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = ({ authedUser, users }) => {
    return { authedUser,user: users[authedUser]}
}

export default connect(mapStateToProps)(Nav)