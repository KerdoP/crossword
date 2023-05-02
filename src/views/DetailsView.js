import React from "react";
import TitleDescriptionBox from "../components/TitleDescriptionBox";
import PictureBox from "../components/PictureBox";
import data from "../data";
import NavigationBar from "../components/NavigationBar";

const DetailsView = () => {
  return (
    <div style={styles.container}>
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
  );
};

const styles = {
  container: {
    backgroundColor: "#fff"
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
