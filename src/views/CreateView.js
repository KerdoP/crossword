import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { data, crossword } from '../storage';
import NavigationBar from '../components/NavigationBar';
import createCrossword from '../components/CrosswordLogic';
import Button from "../components/Button";
import TextBox from "../components/TextBox";
import TextArea from "../components/TextArea";

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
            <TextBox
              name="Title"
              value={title}
              onChange={handleTitleChange}
            />
            <br />
            <TextArea
              name="Description"
              value={description}
              onChange={handleDescriptionChange}
            />
            <br />
            {answerClue.map((answerClue, index) => (
              <div key={index} style={styles.containerItem}>
                <TextBox
                  name="Answer"
                  value={answerClue.answer}
                  onChange={(event) => handleAnswerClueChange(index, 'answer', event.target.value)}
                />
                <TextBox
                  name="Clue"
                  value={answerClue.clue}
                  onChange={(event) => handleAnswerClueChange(index, 'clue', event.target.value)}
                />
              </div>
            ))}
            <br />
            <Button
              name="Add Answer and Clue"
              action={handleAddAnswerClue}
              type="button"
            />
            <br />
            <Button
              name="Delete Answer and Clue"
              action={handleDeleteAnswerClue}
              type="button"
            />
            <br />
            <Button
              name="Submit"
              type="submit"
            />
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
  containerItem: {
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
  },
};

export { CreateView, data };
