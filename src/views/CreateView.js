import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { data } from '../storage';
import NavigationBar from '../components/NavigationBar';

function CreateView() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [answerHints, setAnswerHints] = useState([{ answer: '', hint: '' }]);
  const navigate = useNavigate();

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleAnswerHintChange(index, field, value) {
    const newAnswerHints = [...answerHints];
    newAnswerHints[index][field] = value;
    setAnswerHints(newAnswerHints);
  }

  function handleAddAnswerHint() {
    setAnswerHints([...answerHints, { answer: '', hint: '' }]);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newObject = {
      id: (data.length + 1).toString(),
      title: title,
      description: description,
      answer: answerHints.map(answerHint => answerHint.answer),
      hint: answerHints.map(answerHint => answerHint.hint)
    };
    data.push(newObject);

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
              Answers and Hints:
            </label>
            {answerHints.map((answerHint, index) => (
              <div key={index}>
                <label style={styles.containerItem}>
                  Answer:
                  <input type="text" value={answerHint.answer} onChange={(event) => handleAnswerHintChange(index, 'answer', event.target.value)} />
                </label>
                <label style={styles.containerItem}>
                  Hint:
                  <input type="text" value={answerHint.hint} onChange={(event) => handleAnswerHintChange(index, 'hint', event.target.value)} />
                </label>
              </div>
            ))}
            <button type="button" onClick={handleAddAnswerHint} style={styles.containerItem}>
              Add Answer and Hint
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

