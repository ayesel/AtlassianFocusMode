import React from 'react';
import './Tags.css';

const Tags = ({ icon, text, variant = 'default' }) => {
  return (
    <div className={`tag tag-${variant}`}>
      {icon && <i className={icon}></i>}
      <span>{text}</span>
    </div>
  );
};

export default Tags;