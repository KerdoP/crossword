import React from 'react';

const CrosswordCell = ({ value, onChange }) => {
  return (
    <div style={styles.container}>
      <input
        style={styles.textInput}
        maxLength={1}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

const styles = {
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
  },
  textInput: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    width: '100%',
    height: '100%',
    border: 'none',
    outline: 'none',
  },
};

export default CrosswordCell;
