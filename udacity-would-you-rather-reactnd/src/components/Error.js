import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Error extends Component {
    render() {
        return (
            <div className='form'>
                <span style={{ fontSize: '1.5em', textAlign: 'center' }}>404 / Not Found 
                <br></br>
                Please Login</span>
                <Link exact to='/login'>Login Page</Link>
            </div>
        );
    }
}

export default Error