import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';
import Zoom from '@mui/material/Zoom';

function CreateNote(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  const [isExpanded, setExpanded] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  function handleClick(event) {
    event.preventDefault();
    console.log('Sending data:', note);
    props.onAdd(note); // Call the onAdd function passed as a prop
    setNote({
      title: '',
      content: '',
    });
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form onSubmit={handleClick} id="form" className="create-note">
        {isExpanded ? (
          <input
            type="text"
            name="title"
            value={note.title}
            onChange={handleChange}
            placeholder="Title"
          />
        ) : null}
        <textarea
          name="content"
          value={note.content}
          onChange={handleChange}
          onClick={expand}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab color="primary" type="submit">
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateNote;
