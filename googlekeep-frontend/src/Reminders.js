// src/Reminders.js
import React, { useEffect, useState } from "react";
import { getReminders } from "./Api";

function Reminders() {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    getReminders()
      .then(setReminders)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>⏰ Reminders</h2>
      {reminders.length === 0 ? (
        <p>No reminders set.</p>
      ) : (
        <ul>
          {reminders.map((note) => (
            <li key={note.id}>
              <strong>{note.title}</strong>: {note.content} <br />
              <em>{new Date(note.reminder).toLocaleString()}</em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Reminders;
