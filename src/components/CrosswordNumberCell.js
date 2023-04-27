import React from 'react';

const CrosswordNumberCell = ({ value, onChange, number }) => {
  return (
    <div style={styles.container}>
      <span style={styles.number}>{number}</span>
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
    position: 'relative',
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
  number: {
    position: 'absolute',
    top: 2,
    left: 2,
    color: '#aaa',
    fontSize: 12,
    fontWeight: 'bold',
  },
};

export default CrosswordNumberCell;
