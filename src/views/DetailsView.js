import React from "react";
import TitleDescriptionBox from "../components/TitleDescriptionBox";
import { data, crossword } from "../storage";
import NavigationBar from "../components/NavigationBar";
import { useNavigate } from "react-router-dom";
import Crossword from '@jaredreisinger/react-crossword';

const DetailsView = () => {
    const navigate = useNavigate();
    const id = window.location.pathname.split("/").pop();

    function handleDelete() {
        const updatedData = data.filter((item) => item.id !== id);
        localStorage.setItem("data", JSON.stringify(updatedData));
        navigate(`/`);
    }

    const crosswordData = JSON.parse(JSON.stringify(crossword[id - 1]));

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
                                        </div>
                                    </div>
                                );
                            }
                        })}
                        <div style={styles.epic}>
                            <Crossword data={crosswordData} />
                        </div>
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
    epic: {
        display: 'flex',
        justifyContent: 'center',
        height: '60%',
        width: '60%',
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
        marginVertical: 10,
    },
    titleDescriptionBox: {
        flex: 1,
    },
    listView: {
        marginTop: 50,
        marginLeft: 16,
        marginRight: 16,
    },
};

export default DetailsView;
