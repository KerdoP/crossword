import React from "react";
import TitleDescriptionBox from "../components/TitleDescriptionBox";
import PictureBox from "../components/PictureBox";
import { data } from "../storage";
import NavigationBar from "../components/NavigationBar";
import { useNavigate } from "react-router-dom";
import Crossword from '@jaredreisinger/react-crossword';
import CrosswordLogic from '../components/CrosswordLogic';


const DetailsView = () => {
  const navigate = useNavigate();
  const id = window.location.pathname.split("/").pop();

  const dummyData = {
    across: {
      1: {
        clue: "one plus one",
        answer: "TWO",
        row: 0,
        col: 0,
      },
      2: {
        clue: "three minus two",
        answer: "ONE",
        row: 0,
        col: 1,
      }
    },
    down: {
      1: {
        clue: "six divided by two",
        answer: "THREE",
        row: 0,
        col: 0,
      },
      2: {
        clue: "six times three",
        answer: "EIGHTEEN",
        row: 0,
        col: 3,
      }
    }
  };

  function handleDelete() {
    const updatedData = data.filter((item) => item.id !== id);
    localStorage.setItem("data", JSON.stringify(updatedData));
    navigate(`/`);
  }
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
                <div>
                  <button>
                    <a href={`/Edit/${item.id}`}>Edit</a>
                  </button>
                  <button>
                    <a onClick={handleDelete}>Delete</a>
                  </button>
                </div>
                <div>
                  <h3>Answers:</h3>
                  <ol>
                    {item.answer.map((answer) => (
                      <li>{answer}</li>
                    ))}
                  </ol>
                  <h3>Hints:</h3>
                  <ol>
                    {item.hint.map((hint) => (
                      <li>{hint}</li>
                    ))}
                  </ol>
                  </div>
                  </div>
                  <div style={styles.pictureBox}>
                    <PictureBox imageUrl={item.imageUrl} />
                  </div>
              <div>
                <Crossword data={dummyData} />
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
