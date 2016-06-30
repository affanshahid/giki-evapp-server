import React, { PropTypes } from 'react';

export default function Announcement(props) {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const style = {
    backgroundColor: `rgb(${r},${g},${b})`
  };
  return (
    <article className="announcement">
      <div className="dot" style={style}></div>
      <div>
        <h3>{props.title}</h3>
        <p>{props.description}</p>
      </div>
    </article>
  );
}

Announcement.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};
