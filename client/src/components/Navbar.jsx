import React from 'react';
import NavbarButton from './NavbarButton';
import NavbarItem from './NavbarItem';

class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    // TODO: Login
  }

  render() {
    return(
      <header>
        <div className="container clearfix">
          <div id="logo" className="alt">
            <h1>GIKI Evapp</h1>
          </div>
          <ul className="navbar-buttons">
            <NavbarButton className="primary" title="Log in" onClick={this.handleLogin} />
          </ul>
          <nav>
            <ul className="navbar-items">
              <NavbarItem href="/" title="Home" />
              <NavbarItem href="/about" title="Contact" />
              <NavbarItem href="/about" title="About" />
            </ul>
          </nav>
        </div>
      </header>
    );
  }

}

export default Navbar;
