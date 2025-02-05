/*import { rest } from "msw";
import { data } from "./data";

let questions = data;

export const handlers = [
  rest.get("http://localhost:4000/questions", (req, res, ctx) => {
    return res(ctx.json(questions));
  }),
  rest.post("http://localhost:4000/questions", (req, res, ctx) => {
    const id = questions[questions.length - 1]?.id + 1 || 1;
    const question = { id, ...req.body };
    questions.push(question);
    return res(ctx.json(question));
  }),
  rest.delete("http://localhost:4000/questions/:id", (req, res, ctx) => {
    const { id } = req.params;
    if (isNaN(parseInt(id))) {
      return res(ctx.status(404), ctx.json({ message: "Invalid ID" }));
    }
    questions = questions.filter((q) => q.id !== parseInt(id));
    return res(ctx.json({}));
  }),
  rest.patch("http://localhost:4000/questions/:id", (req, res, ctx) => {
    const { id } = req.params;
    const { correctIndex } = req.body;
    const question = questions.find((q) => q.id === parseInt(id));
    if (!question) {
      return res(ctx.status(404), ctx.json({ message: "Invalid ID" }));
    }
    question.correctIndex = correctIndex;
    return res(ctx.json(question));
  }),
];

*/




import { rest } from "msw";
import { data as initialData } from "./data";

// Create isolated data copy for safer manipulation
const createDataStore = () => {
  let questions = [...initialData];
  let nextId = questions.length > 0 
    ? Math.max(...questions.map(q => q.id)) + 1 
    : 1;

  return {
    getAll: () => [...questions],
    getById: (id) => questions.find(q => q.id === id),
    add: (question) => {
      const newQuestion = { ...question, id: nextId++ };
      questions.push(newQuestion);
      return newQuestion;
    },
    update: (id, updates) => {
      const index = questions.findIndex(q => q.id === id);
      if (index === -1) return null;
      questions[index] = { ...questions[index], ...updates };
      return questions[index];
    },
    delete: (id) => {
      questions = questions.filter(q => q.id !== id);
      return true;
    },
    reset: () => {
      questions = [...initialData];
      nextId = initialData.length > 0 
        ? Math.max(...initialData.map(q => q.id)) + 1 
        : 1;
    }
  };
};

const store = createDataStore();

export const handlers = [
  // GET /questions
  rest.get("http://localhost:4000/questions", (req, res, ctx) => {
    try {
      // Simulate network delay
      return res(
        ctx.delay(150),
        ctx.json(store.getAll())
      );
    } catch (error) {
      return res(
        ctx.status(500),
        ctx.json({ message: "Internal server error" })
      );
    }
  }),

  // POST /questions
  rest.post("http://localhost:4000/questions", (req, res, ctx) => {
    try {
      const { prompt, answers, correctIndex } = req.body;
      
      if (!prompt || !answers || correctIndex === undefined) {
        return res(
          ctx.status(400),
          ctx.json({ message: "Missing required fields" })
        );
      }

      if (answers.length < 4) {
        return res(
          ctx.status(400),
          ctx.json({ message: "Must provide 4 answers" })
        );
      }

      const newQuestion = store.add({
        ...req.body,
        correctIndex: Number(correctIndex)
      });

      return res(
        ctx.delay(100),
        ctx.status(201),
        ctx.json(newQuestion)
      );
    } catch (error) {
      return res(
        ctx.status(500),
        ctx.json({ message: "Failed to create question" })
      );
    }
  }),

  // DELETE /questions/:id
  rest.delete("http://localhost:4000/questions/:id", (req, res, ctx) => {
    try {
      const id = Number(req.params.id);
      
      if (isNaN(id)) {
        return res(
          ctx.status(400),
          ctx.json({ message: "Invalid ID format" })
        );
      }

      const exists = store.getById(id);
      if (!exists) {
        return res(
          ctx.status(404),
          ctx.json({ message: "Question not found" })
        );
      }

      store.delete(id);
      return res(
        ctx.delay(100),
        ctx.status(200),
        ctx.json({ message: "Question deleted" })
      );
    } catch (error) {
      return res(
        ctx.status(500),
        ctx.json({ message: "Failed to delete question" })
      );
    }
  }),

  // PATCH /questions/:id
  rest.patch("http://localhost:4000/questions/:id", (req, res, ctx) => {
    try {
      const id = Number(req.params.id);
      const { correctIndex } = req.body;

      if (isNaN(id)) {
        return res(
          ctx.status(400),
          ctx.json({ message: "Invalid ID format" })
        );
      }

      const question = store.getById(id);
      if (!question) {
        return res(
          ctx.status(404),
          ctx.json({ message: "Question not found" })
        );
      }

      if (correctIndex === undefined || isNaN(correctIndex)) {
        return res(
          ctx.status(400),
          ctx.json({ message: "Invalid correctIndex" })
        );
      }

      const updatedQuestion = store.update(id, {
        correctIndex: Number(correctIndex)
      });

      return res(
        ctx.delay(100),
        ctx.json(updatedQuestion)
      );
    } catch (error) {
      return res(
        ctx.status(500),
        ctx.json({ message: "Failed to update question" })
      );
    }
  }),

  // Add reset handler for testing cleanup
  rest.post("http://localhost:4000/reset", (req, res, ctx) => {
    store.reset();
    return res(
      ctx.status(200),
      ctx.json({ message: "Data reset successful" })
    );
  })
];
