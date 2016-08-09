import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import BlogApp from './containers/BlogApp'
import Home from './components/Home'
import Tags from './components/Tags'
import Search from './components/Search'
import User from './components/User'
import Post from './components/Post'
import Setting from './components/Setting'
import Reg from './components/Reg'
import Login from './components/Login'
import NoMatch from './components/NoMatch'
import Error from './components/Error'

render(
  <Router history={browserHistory}>
    <Route path='/' component={BlogApp}>
      <IndexRoute component={Home} />
      <Route path='/tags' component={Tags} />
      <Route path='/tags/:tag' component={Tag} />
      <Route path='/search' component={Search} />
      <Route path='/u/:username' component={User} />
      <Route path='/post' component={Post} />
      <Route path='/reg' component={Reg} />
      <Route path='/login' component={Login} />
      <Route path='/setting' component={Setting} />
      <Route path='error' component={Error} />
      <Route path='*' component={NoMatch} />
    </Route>
  </Router>,
  document.getElementById('root')
)