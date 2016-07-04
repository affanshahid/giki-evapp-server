import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class Announcement extends React.Component{

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const style = {
      backgroundColor: `rgb(${r},${g},${b})`
    };
    return (
      <li className="announcement">
        <div className="dot" style={style}></div>
        <div>
          <h3>{this.props.announcement.get('title')}</h3>
          <p>{this.props.announcement.get('description')}</p>
        </div>
        <p className="date">{this.props.announcement.get('createdAt')}</p>
      </li>
    );
  }
}

export default Announcement;
