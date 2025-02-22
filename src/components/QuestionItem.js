import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const handleDeleteClick = () => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          onDeleteQuestion(id);
        } else {
          console.error("Failed to delete question");
        }
      })
      .catch((error) => console.error("Delete error:", error));
  };

  const handleCorrectAnswerChange = (e) => {
    const newCorrectIndex = parseInt(e.target.value, 10);
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then((res) => res.json())
      .then((updatedQuestion) => {
        onUpdateQuestion(updatedQuestion);
      })
      .catch((error) => console.error("Update error:", error));
  };

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5 data-testid={`question-prompt-${id}`}>{prompt}</h5>
      <label>
        Correct Answer:
        <select 
          defaultValue={correctIndex} 
          onChange={handleCorrectAnswerChange}
          aria-label="Correct Answer"
        >
          {options}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;




