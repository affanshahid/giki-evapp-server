import React from 'react';

export default class Announcement extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const style = {
      backgroundColor: `rgb(${r},${g},${b})`
    };
    console.log(style);
    return (
      <article className="announcement">
        <div className="dot" style={style}></div>
        <div>
          <h3>{this.props.title}</h3>
          <p>{this.props.description}</p>
        </div>
      </article>
    );
  }
}
