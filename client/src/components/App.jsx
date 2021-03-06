import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

class App extends React.Component {

  render() {
    return (
      <div>
        <Navbar />
        {
          this.props.children
        }
        <div className="clearfix" />
        <Footer />
      </div>
    );
  }

}

export default App;
