import React from 'react'
import { render } from 'react-dom'

import { Router, Route, Link } from 'react-router'

class App extends Component {
  render() {
    return (
      <div>
        <header>App</header>
        <menu>
          <ul>
            <li><link to='/about'>About</link></li>
            <li><link to='/repos'>Repos</link></li>
          </ul>
        </menu>
        {this.props.children}
      </div>
    )
  }
}
class About extends Component {
  render() {
    return (
      <div>
        This is about.
      </div>
    )
  }
}
class Repos extends Component {
  render() {
    return (
      <div>
        This is repos.
      </div>
    )
  }
}

let rootElement = document.getElementById('content')

render(
  <Router>
    <Route path='/' component={App}>
      <Route path='about' component={About} />
      <Route path='repos' component={Repos} />
    </Route>
  </Router>,
  rootElement
)