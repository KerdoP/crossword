import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { data, crossword } from '../storage';
import NavigationBar from '../components/NavigationBar';
import createCrossword from '../components/CrosswordLogic';

function EditView() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [answerClue, setAnswerClue] = useState([{ answer: '', clue: '' }]);
    const navigate = useNavigate();
    const { id } = useParams(); // get id from URL params

    useEffect(() => {
        // find item in data array with matching id and prefill form
        const itemToEdit = data.find((item) => item.id === id);
        setTitle(itemToEdit.title);
        setDescription(itemToEdit.description);
        setAnswerClue(
            itemToEdit.answer.map((answer, index) => ({
                answer,
                clue: itemToEdit.clue[index],
            }))
        );
    }, [id]);

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
    
        const updatedObject = {
            id: id,
            title: title,
            description: description,
            answer: answerClue.map(answerClue => answerClue.answer),
            clue: answerClue.map(answerClue => answerClue.clue),
        };
    
        const updatedData = data.map(item => item.id === id ? updatedObject : item);
    
        // Update the crossword array with the new crossword object
        const updatedCrossword = createCrossword(updatedObject);
        
        const updatedCrosswordArray = crossword.map((item, index) => index === id - 1 ? updatedCrossword : item);
    
        localStorage.setItem('data', JSON.stringify(updatedData));
        localStorage.setItem('crosswordData', JSON.stringify(updatedCrosswordArray));
    
        navigate(`/details/${id}`); // navigate back to details view
    }
    
    

    return (
        <body style={styles.b1}>
            <div style={styles.mainContainer}>
                <div style={styles.secondContainer}>
                    <NavigationBar />
                    <form onSubmit={handleSubmit}>
                        <label>
                            Title:
                            <input type="text" value={title} onChange={handleTitleChange} />
                        </label>
                        <br />
                        <label>
                            Description:
                            <textarea value={description} onChange={handleDescriptionChange} />
                        </label>
                        <br />
                        <label>
                            Answers and Clues:
                        </label>
                        {answerClue.map((answerClue, index) => (
                            <div key={index}>
                                <label>
                                    Answer:
                                    <input type="text" value={answerClue.answer} onChange={(event) => handleAnswerClueChange(index, 'answer', event.target.value)} />
                                </label>
                                <label>
                                    Clue:
                                    <input type="text" value={answerClue.clue} onChange={(event) => handleAnswerClueChange(index, 'clue', event.target.value)} />
                                </label>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddAnswerClue}>
                            Add Answer and Clue
                        </button>
                        <br />
                        <button type="button" onClick={handleDeleteAnswerClue}>
                            Delete Answer and Clue
                        </button>
                        <br />
                        <button type="submit">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </body>
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
};

export default EditView;
