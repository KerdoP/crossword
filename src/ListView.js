import React from 'react';
import TitleDescriptionBox from './components/TitleDescriptionBox';
import PictureBox from './components/PictureBox';

const DATA = [
  {
    id: '1',
    title: 'Item 1',
    description: 'This is item 1',
    imageUrl: 'https://home.snu.edu/~hculbert/br1word.jpg',
  },
  {
    id: '2',
    title: 'Item 2',
    description: 'This is item 2',
    imageUrl: 'https://www.nasa.gov/sites/default/files/thumbnails/image/crossword3-60th.jpg',
  },
  {
    id: '3',
    title: 'Item 3',
    description: 'This is item 3',
    imageUrl: 'https://racismnoway.com.au/wp-content/uploads/2016/06/crossword-discrimination.gif',
  },
];

const ListItem = ({ item }) => {
  return (
    <div style={styles.item}>
      <div style={styles.titleDescriptionBox}>
        <TitleDescriptionBox
          title={item.title}
          description={item.description}
        />
      </div>
      <div style={styles.pictureBox}>
        <PictureBox imageUrl={item.imageUrl} />
      </div>
    </div>
  );
};

const ListView = () => {
  return (
    <div style={styles.container}>
      {DATA.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#fff',
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 10,
  },
  titleDescriptionBox: {
    flex: 1,
  },
  pictureBox: {
    flex: 1,
  },
  '@media (max-width: 600px)': {
    item: {
      flexDirection: 'column',
    },
  },
};

export default ListView;
