/*import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm /> : <QuestionList />}
    </main>
  );
}

export default App;
*/


import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  const handleAddQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  const handleDeleteQuestion = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => {
      setQuestions(questions.filter((q) => q.id !== id));
    });
  };

  const handleUpdateQuestion = (updatedQuestion) => {
    setQuestions(questions.map((q) => 
      q.id === updatedQuestion.id ? updatedQuestion : q
    ));
  };

  const [page, setPage] = useState("List");


  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm /> : <QuestionList />}

      <h1>Quiz Admin</h1>
      <QuestionForm onAddQuestion={handleAddQuestion} />
      <QuestionList 
        questions={questions} 
        onDeleteQuestion={handleDeleteQuestion} 
        onUpdateQuestion={handleUpdateQuestion} 
      />
    </main>
  );
}

export default App;
