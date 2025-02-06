// src/mocks/handlers.js
import { rest } from "msw";
import { data } from "./data"; // Importing initial quiz data


let questions = [...data]; // Create a mutable copy of the questions array



export const handlers = [
  // GET /questions
  rest.get("http://localhost:4000/questions", (req, res, ctx) => {
    return res(ctx.json(questions));
  }),
  // POST /questions
  rest.post("http://localhost:4000/questions", (req, res, ctx) => {
    const { prompt, answers, correctIndex } = req.body;
    const newQuestion = {
      id: questions.length + 1,
      prompt,
      answers,
      correctIndex,
    };
    questions.push(newQuestion);
    return res(ctx.status(201), ctx.json(newQuestion));
  }),
  // DELETE /questions/:id
  rest.delete("http://localhost:4000/questions/:id", (req, res, ctx) => {
    const { id } = req.params;
    questions = questions.filter((q) => q.id !== parseInt(id, 10));
    return res(ctx.status(200));
  }),
  // PATCH /questions/:id
  rest.patch("http://localhost:4000/questions/:id", (req, res, ctx) => {
    const { id } = req.params;
    const { correctIndex } = req.body;
    questions = questions.map((q) =>
      q.id === parseInt(id, 10) ? { ...q, correctIndex } : q
    );
    const updatedQuestion = questions.find((q) => q.id === parseInt(id, 10));
    return res(ctx.json(updatedQuestion));
  }),
];
