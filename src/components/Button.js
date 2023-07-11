import React, { useState } from 'react';

const Button = ({ name, link, action, type }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (event) => {
    event.preventDefault();
    action();
  };

  const buttonStyle = {
    alignItems: 'center',
    appearance: 'none',
    backgroundColor: '#FCFCFD',
    borderRadius: '4px',
    borderWidth: '0',
    boxShadow:
      'rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset',
    boxSizing: 'border-box',
    color: '#36395A',
    cursor: 'pointer',
    display: 'inline-flex',
    fontFamily: '"JetBrains Mono", monospace',
    height: '48px',
    justifyContent: 'center',
    lineHeight: '1',
    listStyle: 'none',
    overflow: 'hidden',
    paddingLeft: '16px',
    paddingRight: '16px',
    margin: '8px',
    position: 'relative',
    textAlign: 'center',
    textDecoration: 'none',
    transition: 'box-shadow .15s, transform .15s',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    touchAction: 'manipulation',
    whiteSpace: 'nowrap',
    willChange: 'box-shadow, transform',
    fontSize: '18px',
    boxShadow: isHovered
      ? 'rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset'
      : 'rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset',
    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
  };

  const buttonStyleResponsive = {
    ...buttonStyle,
    height: '40px',
    fontSize: '16px',
  };

  return (
    <a href={link}>
      <button
        onClick={action}
        style={buttonStyle}
        type={type}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {name}
      </button>
    </a>
  );
};

export default Button;
