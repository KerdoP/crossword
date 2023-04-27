import React from 'react';

const PictureBox = ({ imageUrl }) => {
  return (
    <div style={styles.container}>
      <img src={imageUrl} style={styles.image} alt="Image" />
    </div>
  );
};

const styles = {
  container: {
    width: '50%',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginRight: 20,
  },
  image: {
    objectFit: 'contain',
    maxHeight: 400,
    maxWidth: 400,
  },
};

export default PictureBox;
