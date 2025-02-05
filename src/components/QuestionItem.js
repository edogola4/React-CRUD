/*import React from "react";

function QuestionItem({ question }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex}>{options}</select>
      </label>
      <button>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
*/



// src/components/QuestionItem.js
import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const handleCorrectAnswerChange = async (e) => {
    const newCorrectIndex = parseInt(e.target.value);
    const response = await fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    });
    const updatedQuestion = await response.json();
    onUpdateQuestion(updatedQuestion);
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>{prompt}</h5>
      <label>
        Correct Answer:
        <select 
          defaultValue={correctIndex}
          onChange={handleCorrectAnswerChange}
        >
          {answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button onClick={() => onDeleteQuestion(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;