import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { data } from '../storage';

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
        Answers and Hints:
      </label>
      {answerHints.map((answerHint, index) => (
        <div key={index}>
          <label>
            Answer:
            <input type="text" value={answerHint.answer} onChange={(event) => handleAnswerHintChange(index, 'answer', event.target.value)} />
          </label>
          <label>
            Hint:
            <input type="text" value={answerHint.hint} onChange={(event) => handleAnswerHintChange(index, 'hint', event.target.value)} />
          </label>
        </div>
      ))}
      <button type="button" onClick={handleAddAnswerHint}>
        Add Answer and Hint
      </button>
      <br />
      <button type="submit">
        Submit
      </button>
    </form>
  );
}

export { CreateView, data };

