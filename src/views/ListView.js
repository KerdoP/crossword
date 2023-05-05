import React from 'react';
import TitleDescriptionBox from '../components/TitleDescriptionBox';
import PictureBox from '../components/PictureBox';
import { data } from '../storage';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';

const ListView = () => {
  const navigate = useNavigate();
  return (
    <div style={styles.container}>
      <NavigationBar />
      <div style={styles.listView}>
      {data.map((item) => {
        return (
          <div
            style={styles.item}
            key={item.id}
            onClick={() => {
              navigate(`/Details/${item.id}`);
            }}
          >
            <div style={styles.titleDescriptionBox}>
              <TitleDescriptionBox title={item.title} description={item.description} />
            </div>
            <div style={styles.pictureBox}>
              <PictureBox imageUrl={item.imageUrl} />
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
}

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
  listView: {
    marginTop: 50,
    marginLeft: 16,
    marginRight: 16,
  },
};

export default ListView;
