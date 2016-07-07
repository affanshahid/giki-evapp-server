import React from 'react';

class NavbarButton extends React.Component {

  render() {
    return (
      <li>
        <button className={this.props.className} type='button' onClick={this.props.onClick} >
          {
            this.props.title
          }
        </button>
      </li>
    );
  }

}

export default NavbarButton;
