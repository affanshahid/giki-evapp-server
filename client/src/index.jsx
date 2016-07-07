import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import NavbarItem from './components/NavbarItem';
import Navbar from './components/Navbar';
import { Router, Route, hashHistory } from 'react-router';

const app = (
    <Navbar>
      <NavbarItem href="/" title="Home" />
      <NavbarItem href="/about" title="Log in" />
      <NavbarItem href="/about" title="Dashboard" />
      <NavbarItem href="/about" title="Contact" />
      <NavbarItem href="/about" title="About" />
    </Navbar>
);

ReactDOM.render(
  app,
  document.getElementById('app')
);
