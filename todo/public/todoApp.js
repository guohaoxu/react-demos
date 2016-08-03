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
// 
// render(
//   <Router history={browserHistory}>
//     <Route path="/" component={KanbanBoard}>
//       <Route path="about" component={About} />
//       <Route path="new" component={NewCard} />
//       <Route path="edit/:card_id" component={EditCard} />
//       <Route path="error" component={ServerError} />
//       <Route path="*" component={NoMatch} />
//     </Route>
//   </Router>,
//   document.getElementById('content')
// )