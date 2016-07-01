import React from 'react';

function Announcement(props) {
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
        <h3>{props.title}</h3>
        <p>{props.description}</p>
      </div>
      <p className="date">{props.createdAt}</p>
    </li>
  );
}

export default Announcement;
