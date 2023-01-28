import React from "react";
import { MdDeleteForever, MdEditNote } from "react-icons/md";

const Note = ({ id, text, date, handleDeleteNote, handleEditNote }) => {
  return (
    <div className="note">
      <span>{text}</span>
      <div className="icons-all">
        <small>{date}</small>
        <MdDeleteForever
          onClick={() => handleDeleteNote(id)}
          className="delete-icon"
          size="1.3em"
        />
        <MdEditNote
         onClick={() => handleEditNote(id )}
          className="edit-icon"
          size="1.3em"
        />
      </div>
    </div>
  );
};

export default Note;
