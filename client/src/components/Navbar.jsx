import React from 'react';

class Navbar extends React.Component {

  render() {
    return(
      <header>
        <div className="container clearfix">
          <div id="logo" className="alt">
            <h1>GIK Evapp</h1>
          </div>
          <nav>
            <ul>
              {
                this.props.children
              }
            </ul>
          </nav>
        </div>
      </header>
    );
  }

}

export default Navbar;
