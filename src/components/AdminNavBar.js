/*import React from "react";

function AdminNavBar({ onChangePage }) {
  return (
    <nav>
      <button onClick={() => onChangePage("Form")}>New Question</button>
      <button onClick={() => onChangePage("List")}>View Questions</button>
    </nav>
  );
}

export default AdminNavBar;
*/

/*import React from "react";

function AdminNavBar({ onNewQuestion, onViewQuestions, showForm }) {
  return (
    <nav>
      <button 
        onClick={onNewQuestion}
        className={showForm ? "active" : ""}
      >
        New Question
      </button>
      <button 
        onClick={onViewQuestions}
        className={!showForm ? "active" : ""}
      >
        View Questions
      </button>
    </nav>
  );
}

export default AdminNavBar;
*/

/*
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
*/

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
