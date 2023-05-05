import React from 'react';

const TitleDescriptionBox = ({ title, description }) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{title}</h1>
      <p style={styles.description}>{description}</p>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: 'transparent',
    marginTop: 20,
    marginLeft: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
  },
};

export default TitleDescriptionBox;
