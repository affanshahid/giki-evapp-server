import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import moment from 'moment';

class Announcement extends React.Component{

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  getTimestamp() {
    const time = moment(this.props.announcement.get('createdAt'));
    return time.format('ddd hh:mm A');
  }

  randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return {
      r, g, b
    };
  }

  render() {
    const { r, g, b } = this.randomColor();
    const style = {
      borderBottom: `2px solid rgb(${r},${g},${b})`
    };
    return (
      <li className="announcement" style={style}>
        <div>
          <h4>{this.props.announcement.get('title')}</h4>
          <p className="date">{this.getTimestamp()}</p>
        </div>
        <p>{this.props.announcement.get('description')}</p>
      </li>
    );
  }
}

export default Announcement;
