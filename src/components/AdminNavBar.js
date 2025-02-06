// src/components/AdminNavBar.js
import React from "react";

function AdminNavBar({ onNewQuestion, onViewQuestions, showForm }) {
  return (
    <nav>
      <button onClick={onNewQuestion} className={showForm ? "active" : ""}>
        New Question
      </button>
      <button onClick={onViewQuestions} className={!showForm ? "active" : ""}>
        View Questions
      </button>
    </nav>
  );
}

export default AdminNavBar;
