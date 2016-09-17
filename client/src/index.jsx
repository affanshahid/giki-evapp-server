import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './components/App';
import Home from './components/Home';


const router = (
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
    </Route>
  </Router>
);

ReactDOM.render(
  router,
  document.getElementById('app')
);
