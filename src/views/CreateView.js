import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { data, crossword } from '../storage';
import NavigationBar from '../components/NavigationBar';
import createCrossword from '../components/CrosswordLogic';

function CreateView() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [answerClue, setAnswerClue] = useState([{ answer: '', clue: '' }]);
    const navigate = useNavigate();

    function handleTitleChange(event) {
        setTitle(event.target.value);
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value);
    }

    function handleAnswerClueChange(index, field, value) {
        const newAnswerClue = [...answerClue];
        newAnswerClue[index][field] = value;
        setAnswerClue(newAnswerClue);
    }

    function handleAddAnswerClue() {
        setAnswerClue([...answerClue, { answer: '', clue: '' }]);
    }

    function handleDeleteAnswerClue() {
        const newAnswerClue = [...answerClue];
        if (newAnswerClue.length === 1) return; // Don't delete the last answer and clue
        newAnswerClue.pop(); // Remove the last element from the array
        setAnswerClue(newAnswerClue);
    }

    function handleSubmit(event) {
        event.preventDefault();

        const newObject = {
            id: (data.length + 1).toString(),
            title: title,
            description: description,
            answer: answerClue.map(answerClue => answerClue.answer),
            clue: answerClue.map(answerClue => answerClue.clue)
        };
        data.push(newObject);

        const newCrossword = createCrossword(newObject);

        const finalCrossword = {
            id: (crossword.length + 1).toString(),
            across: newCrossword.across,
            down: newCrossword.down
        }

        crossword.push(finalCrossword);

        localStorage.setItem('crosswordData', JSON.stringify(crossword));
        localStorage.setItem('data', JSON.stringify(data));

        navigate('/');
    }

    return (
        <body style={styles.b1}>
            <div style={styles.mainContainer}>
                <div style={styles.secondContainer}>
                    <NavigationBar />
                    <form onSubmit={handleSubmit}>
                        <label style={styles.containerItem}>
                            Title:
                            <input type="text" value={title} onChange={handleTitleChange} />
                        </label>
                        <br />
                        <label style={styles.containerItem}>
                            Description:
                            <textarea value={description} onChange={handleDescriptionChange} />
                        </label>
                        <br />
                        <label style={styles.containerItem}>
                            Answers and Clues:
                        </label>
                        {answerClue.map((answerClue, index) => (
                            <div key={index}>
                                <label style={styles.containerItem}>
                                    Answer:
                                    <input type="text" value={answerClue.answer} onChange={(event) => handleAnswerClueChange(index, 'answer', event.target.value)} />
                                </label>
                                <label style={styles.containerItem}>
                                    Clue:
                                    <input type="text" value={answerClue.clue} onChange={(event) => handleAnswerClueChange(index, 'clue', event.target.value)} />
                                </label>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddAnswerClue} style={styles.containerItem}>
                            Add Answer and Clue
                        </button>
                        <br />
                        <button type="button" onClick={handleDeleteAnswerClue} style={styles.containerItem}>
                            Delete Answer and Clue
                        </button>
                        <br />
                        <button type="submit" style={styles.containerItem}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </body >
    );
}

const styles = {
    b1: {
        height: '100%',
        width: '100%',
    },
    mainContainer: {
        backgroundColor: '#fafcfe',
        height: '100vh',
        paddingTop: 75,
    },
    secondContainer: {
        backgroundColor: '#eef1f7',
        marginLeft: 56,
        marginRight: 56,
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    containerItem: {
        marginTop: 10,
    },
};

export { CreateView, data };
