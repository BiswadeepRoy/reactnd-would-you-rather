import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import handleInitialData from '../actions/shared';
import Login from './Login'
import Dashboard from './Dashboard'
import ViewQuestion from './ViewQuestion'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Nav from './Nav'
import AddQuestion from './AddQuestion'
import Leaderboard from './Leaderboard'
import Error from './Error'
import { LoadingBar } from 'react-redux-loading'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <LoadingBar></LoadingBar>
        <Nav />
        <Fragment>
          <div>
            <Switch>
              <Route exact path='/login' component={Login}></Route>
              <Route exact path='/' component={Dashboard}></Route>
              <Route exact path='/question/:id' component={ViewQuestion}></Route>
              <Route exact path='/add' component={AddQuestion}></Route>
              <Route exact path='/leaderboard' component={Leaderboard}></Route>
              <Route exact path='/error' component={Error}></Route>
            </Switch>
          </div>
        </Fragment>
      </Router>
    );
  }
}


export default connect()(App);
