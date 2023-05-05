import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { data } from '../storage';

function EditView() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [answerHints, setAnswerHints] = useState([{ answer: '', hint: '' }]);
  const navigate = useNavigate();
  const { id } = useParams(); // get id from URL params

  useEffect(() => {
    // find item in data array with matching id and prefill form
    const itemToEdit = data.find((item) => item.id === id);
    setTitle(itemToEdit.title);
    setDescription(itemToEdit.description);
    setAnswerHints(
      itemToEdit.answer.map((answer, index) => ({
        answer,
        hint: itemToEdit.hint[index],
      }))
    );
  }, [id]);

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

    const updatedObject = {
      id: id,
      title: title,
      description: description,
      answer: answerHints.map(answerHint => answerHint.answer),
      hint: answerHints.map(answerHint => answerHint.hint),
      imageUrl: '' // assuming imageUrl doesn't change in edit view
    };

    const updatedData = data.map(item => item.id === id ? updatedObject : item);

    localStorage.setItem('data', JSON.stringify(updatedData));
    
    navigate(`/details/${id}`); // navigate back to details view
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

export default EditView;
