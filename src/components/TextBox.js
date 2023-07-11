import React, { useState } from 'react';

const TextBox = ({ name, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

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
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <label className={`textbox ${isFocused ? 'focused' : ''}`} htmlFor="inp">
      <input
        type="text"
        id="inp"
        placeholder="&nbsp;"
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <span style={labelStyle}>{name}</span>
    </label>
  );
};

export default TextBox;

// CSS styles
const styles = `
.textbox {
  position: relative;
  margin: auto;
  width: 100%;
  max-width: 280px;
  border-radius: 3px;
  overflow: hidden;
}

.textbox input {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  border: 0;
  font-family: inherit;
  padding: 16px 12px 0 12px;
  height: 56px;
  font-size: 16px;
  font-weight: 400;
  background: rgba(0, 0, 0, 0.02);
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.3);
  color: rgba(0, 0, 0, 1);
  transition: all 0.15s ease;
  cursor: text;
}

.textbox.focused input,
.textbox:hover input {
  background: rgba(0, 0, 0, 0.2);
}

.textbox.focused span {
  color: rgba(0, 0, 0, 0.5);
  transform: translate3d(0, -12px, 0) scale(0.75);
}

.textbox span {
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
  .textbox {
    max-width: 100%;
  }
  
  .textbox input {
    font-size: 14px;
    height: 48px;
  }
  
  .textbox span {
    top: 16px;
    font-size: 14px;
  }
}
`;

// Inject CSS styles into the document
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);
