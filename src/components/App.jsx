import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Note from './Note';
import CreateNote from './CreateNote';

function App() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = () => {
    fetch('/api/notes')
      .then((response) => response.json())
      .then((data) => setNotes(data))
      .catch((error) => console.error('Error fetching notes:', error)); // Handle fetch errors
  };

  useEffect(() => {
    fetchNotes();
  }, []);
  
  // Add a new note
  const addNote = (note) => {
    fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Note added:', data);
        setNotes((prevNotes) => [data.note, ...prevNotes]); // Add the new note with the returned ID
      })
      .catch((error) => console.error('Error adding note:', error)); // Handle add note errors
  };



  // Update a note
const updateNote = (id, updatedNote) => {
  fetch(`/api/notes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedNote),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Note updated:', data);
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === id ? data.note : note))
      ); // Update the note in the state
    })
    .catch((error) => console.error('Error updating note:', error)); // Handle update note errors
};


  // Delete a note
  const deleteNote = (id) => {
    console.log('Deleting note with id:', id); // Debug log
    fetch(`/api/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete note');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Delete success:', data);
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      })
      .catch((error) => console.error('Error deleting note:', error)); // Handle delete note errors
  };


  return (
    <div>
      <Header />
      <CreateNote onAdd={addNote} />
      {notes.map((note) => (
        <Note
          key={note.id} // Ensure each note has a unique key
          id={note.id} // Pass the correct id to the Note component
          title={note.title}
          content={note.content}
          onDelete={deleteNote}
          onUpdate={updateNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
