import React from "react";
import TitleDescriptionBox from "../components/TitleDescriptionBox";
import { data, crossword } from "../storage";
import NavigationBar from "../components/NavigationBar";
import { useNavigate } from "react-router-dom";
import Crossword from '@jaredreisinger/react-crossword';
import Button from "../components/Button";

const DetailsView = () => {
    const navigate = useNavigate();
    const id = window.location.pathname.split("/").pop();

    function handleDelete() {
        console.log("oioi");
        const updatedData = data.filter((item) => item.id !== id);
        const updatedCrossword = crossword.filter((item) => item.id !== id);
        localStorage.setItem("data", JSON.stringify(updatedData));
        localStorage.setItem("crosswordData", JSON.stringify(updatedCrossword));
        navigate(`/`);
    }

    let crosswordData = {};

    crossword.map((item) => {
        if (item.id === window.location.pathname.split("/").pop()) {
            //save the crossword object to crosswordData variable without the id
            crosswordData = {
                across: item.across,
                down: item.down,
            };
        }
    });

    const crosswordTheme = {
        gridBackground: '#fafcfe', // Customize the background color of the crossword grid here
        cellBackground: '#eef1f7',
        cellBorder: '#000000',
        focusBackground: '#b1b5be',
        highlightBackground: '#c3c7d0',
    };

    return (
        <div style={styles.container}>
            <NavigationBar />
            <div style={styles.content}>
                {data.map((item) => {
                    if (item.id === window.location.pathname.split("/").pop()) {
                        return (
                            <div style={styles.item} key={item.id}>
                                <div style={styles.titleDescriptionBox}>
                                    <TitleDescriptionBox
                                        title={item.title}
                                        description={item.description}
                                    />
                                    <div style={styles.buttonsContainer}>
                                        <Button
                                            name="Edit"
                                            link={`/Edit/${item.id}`}
                                            type="button"
                                        />
                                        <Button
                                            name="Delete"
                                            action={handleDelete}
                                            type="button"
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    }
                    return null; // Add a return statement for the map function
                })}
                <div className="crossword-container" style={styles.crosswordContainer}>
                    <Crossword className="crossword-grid" data={crosswordData} theme={crosswordTheme} />
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#fafcfe',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    content: {
        maxWidth: '600px',
        padding: '30px',
        width: '100%',
    },
    item: {
        display: "flex",
        flexDirection: "row",
        marginVertical: 10,
    },
    titleDescriptionBox: {
        flex: 1,
    },
    buttonsContainer: {
        display: 'flex',
        marginTop: '10px',
    },
    crosswordContainer: {
        display: 'flex',
        justifyContent: 'center',
        margin: '30px 0',
    },
};

export default DetailsView;
