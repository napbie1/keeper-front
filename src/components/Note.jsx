import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from 'react';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

function Note(props) {
  const [isEditable, setEditable] = useState(false);
  const [inputText, setInputText] = useState({
    title: props.title,
    content: props.content,
  });

  function deleteNote() {
    console.log('Deleting note with id:', props.id); // Debug log
    props.onDelete(props.id); // Ensure correct id is passed
  }

  function saveNote(event) {
    event.preventDefault();
    console.log('Updating note with id:', props.id); // Debug log
    props.onUpdate(props.id, inputText); // Call the onUpdate function passed as a prop
    setEditable(false);
  }

  function editText(event) {
    const { name, value } = event.target;
    setInputText((prevVal) => ({
      ...prevVal,
      [name]: value,
    }));
  }

  function editNote() {
    setEditable(true);
  }

  useEffect(() => {
    setInputText({ title: props.title, content: props.content });
  }, [props.title, props.content]);

  return (
    <>
      {isEditable ? (
        <form className="edit-note" onSubmit={saveNote}>
          <input onChange={editText} value={inputText.title} name="title" type="text" placeholder="Title" />
          <input onChange={editText} value={inputText.content} name="content" type="text" placeholder="Content" />
          <button type="submit">
            <SaveAltIcon />
          </button>
        </form>
      ) : (
        <div className="note">
          <h1>{props.title}</h1>
          <p>{props.content}</p>
          <button onClick={editNote}>
            <EditIcon />
          </button>
          <button onClick={deleteNote}>
            <DeleteIcon />
          </button>
        </div>
      )}
    </>
  );
}

export default Note;
