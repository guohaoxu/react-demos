import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, Link, browserHistory, RouterContext } from 'react-router'
import todoApp from './reducers'
import App from './components/App'

let store = createStore(todoApp)
let rootElement = document.getElementById('content')

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)