import React from 'react';
import { Link } from 'react-router';

class NavbarItem extends React.Component {

  render() {
    return (
      <li className="navbar-item">
        <Link activeClassName="active" to={this.props.href}>
          {this.props.title}
        </Link>
      </li>
    );
  }

}

export default NavbarItem;
