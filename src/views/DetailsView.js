import React from "react";
import TitleDescriptionBox from "../components/TitleDescriptionBox";
import PictureBox from "../components/PictureBox";
import data from "../data";
import NavigationBar from "../components/NavigationBar";

const DetailsView = () => {
  return (
    <body style={styles.b1}>
      <div style={styles.mainContainer}>
        <div style={styles.secondContainer}>
          <NavigationBar />
          <div style={styles.listView}>
          {data.map((item) => {
            if (item.id === window.location.pathname.split("/").pop()) {
              return (
                <div style={styles.item} key={item.id}>
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
            }
          })}
          </div>
        </div>
      </div>
    </body>
  );
};

const styles = {
  b1: {
    height: '100%',
    width: '100%',
  },
  mainContainer: {
    backgroundColor: '#fafcfe',
    height: '100vh',
    
  },
  secondContainer: {
    backgroundColor: '#eef1f7',
    marginLeft: 56,
    marginRight: 56,
    paddingBottom: 15,
    borderRadius: 20,
    
  },
  item: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 10
  },
  titleDescriptionBox: {
    flex: 1
  },
  pictureBox: {
    flex: 1
  },
  listView: {
    marginTop: 50,
    marginLeft: 16,
    marginRight: 16,
  },
};

export default DetailsView;
