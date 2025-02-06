// src/components/App.js
import React, { useState, useEffect } from "react";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";
import AdminNavBar from "./AdminNavBar";

function App() {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then(setQuestions)
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  const handleAddQuestion = (newQuestion) => {
    setQuestions((prev) => [...prev, newQuestion]);
    setShowForm(false);
  };

  const handleDeleteQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleUpdateQuestion = (updatedQuestion) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
    );
  };

  return (
    <main>
      <AdminNavBar
        onNewQuestion={() => setShowForm(true)}
        onViewQuestions={() => setShowForm(false)}
        showForm={showForm}
      />
      <h1>Quiz Admin</h1>
      {showForm ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      )}
    </main>
  );
}

export default App;
