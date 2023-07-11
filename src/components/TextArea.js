import React, { useState } from 'react';

const TextArea = ({ name, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const labelStyle = {
    position: 'absolute',
    top: '20px',
    left: '12px',
    fontSize: '16px',
    color: isFocused || value !== '' ? 'rgba(0,0,0,.5)' : 'rgba(0,0,0,.5)',
    fontWeight: '500',
    transformOrigin: '0 0',
    transform: isFocused || value !== '' ? 'translate3d(0,-12px,0) scale(.75)' : 'translate3d(0,0,0)',
    transition: 'all .2s ease',
    pointerEvents: 'none',
    zIndex: 1,
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const textareaStyle = {
    width: '100%',
    border: '0',
    fontFamily: 'inherit',
    padding: '16px 12px 0 12px',
    fontSize: '16px',
    fontWeight: '400',
    background: isFocused || isHovered ? 'rgba(0,0,0,.2)' : 'rgba(0,0,0,.02)',
    boxShadow: 'inset 0 -1px 0 rgba(0,0,0,.3)',
    color: 'rgba(0,0,0,1)',
    transition: 'all .15s ease',
    resize: 'vertical',
    minHeight: '56px',
    cursor: 'text',
  };

  return (
    <label
      className={`textarea ${isFocused ? 'focused' : ''} ${isHovered ? 'hovered' : ''}`}
      htmlFor="inp"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative' }}
    >
      <textarea
        id="inp"
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={textareaStyle}
      ></textarea>
      <span style={labelStyle}>{name}</span>
    </label>
  );
};

export default TextArea;

// CSS styles
const styles = `
.textarea {
  position: relative;
  width: 100%;
}

.textarea textarea {
  width: 100%;
  border: 0;
  font-family: inherit;
  padding: 16px 12px 0 12px;
  font-size: 16px;
  font-weight: 400;
  background: rgba(0, 0, 0, 0.02);
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.3);
  color: rgba(0, 0, 0, 1);
  transition: all 0.15s ease;
  resize: vertical;
  min-height: 56px;
  cursor: text;
}

.textarea.focused textarea,
.textarea:hover textarea {
  background: rgba(0, 0, 0, 0.2);
}

.textarea span {
  position: absolute;
  top: 20px;
  left: 12px;
  font-size: 16px;
  font-weight: 500;
  transform-origin: 0 0;
  transition: all 0.2s ease;
  pointer-events: none;
}

@media (max-width: 768px) {
  .textarea textarea {
    font-size: 14px;
    padding: 12px 8px 0 8px;
    min-height: 48px;
  }
  
  .textarea span {
    top: 16px;
    font-size: 14px;
  }
}
`;

// Inject CSS styles into the document
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);
