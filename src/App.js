import { nanoid } from "nanoid";
import React, { useState, useEffect } from "react";
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import Header from "./components/Header";


const App = () => {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "This is my first note!",
      date: "15/08/2021",
    },
    {
      id: nanoid(),
      text: "This is my second note!",
      date: "15/08/2021",
    },
    {
      id: nanoid(),
      text: "This is my third note!",
      date: "15/08/2021",
    },
    {
      id: nanoid(),
      text: "This is my third note!",
      date: "15/08/2021",
    },
    {
      id: nanoid(),
      text: "This is my third note!",
      date: "15/08/202991",
    },
  ]);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("react-notes-app-data"));
    if (savedNotes) {
      setNotes(savedNotes);
    }

    return () => {
      localStorage.setItem("react-notes-app-data", JSON.stringify(notes));
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("react-notes-app-data", JSON.stringify(notes));
  }, [notes]);




  const [searchText, setSearchText] = useState("");

  const [darkMode, setDarkMode] = useState(false);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = [...notes];
    const index = newNotes.findIndex((note) => note.id === id);
    if(index <0 ) return;
    newNotes.splice(index, 1);
    setNotes(newNotes);

    // const newNotes = notes.filter((note) => note.id !== id);
    // setNotes(newNotes);
  };

  const [editingNote, setEditingNote] = useState(null);

  const editNote = (id) => {
    const noteToEdit = notes.find((note) => note.id === id);
    setEditingNote(noteToEdit);
  };

  const handleSaveNote = (id, updatedText) => {
    const newNotes = notes.map((note) =>
      note.id === id ? { ...note, text: updatedText } : note
    );
    setNotes(newNotes);
    setEditingNote(null);
  };

  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />

        {editingNote ? (
          <div className="editss">
            <input
              className="edit-note-input"
              type="text"
              value={editingNote.text}
              onChange={(e) =>
                setEditingNote({ ...editingNote, text: e.target.value })
              }
            />
            <button
              className="save-edit"
              onClick={() => handleSaveNote(editingNote.id, editingNote.text)}
            >
              Save
            </button>
            <button
              className="cancel-edit"
              onClick={() => setEditingNote(null)}
            >
              Cancel
            </button>
          </div>
        ) : null}
        <NotesList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
          handleEditNote={editNote}
        />
      </div>
    </div>
  );
};

export default App;
