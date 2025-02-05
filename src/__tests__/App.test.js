/*import React from "react";
import "whatwg-fetch";
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { server } from "../mocks/server";

import App from "../components/App";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("displays question prompts after fetching", async () => {
  render(<App />);

  fireEvent.click(screen.queryByText(/View Questions/));

  expect(await screen.findByText(/lorem testum 1/g)).toBeInTheDocument();
  expect(await screen.findByText(/lorem testum 2/g)).toBeInTheDocument();
});

test("creates a new question when the form is submitted", async () => {
  render(<App />);

  // wait for first render of list (otherwise we get a React state warning)
  await screen.findByText(/lorem testum 1/g);

  // click form page
  fireEvent.click(screen.queryByText("New Question"));

  // fill out form
  fireEvent.change(screen.queryByLabelText(/Prompt/), {
    target: { value: "Test Prompt" },
  });
  fireEvent.change(screen.queryByLabelText(/Answer 1/), {
    target: { value: "Test Answer 1" },
  });
  fireEvent.change(screen.queryByLabelText(/Answer 2/), {
    target: { value: "Test Answer 2" },
  });
  fireEvent.change(screen.queryByLabelText(/Correct Answer/), {
    target: { value: "1" },
  });

  // submit form
  fireEvent.submit(screen.queryByText(/Add Question/));

  // view questions
  fireEvent.click(screen.queryByText(/View Questions/));

  expect(await screen.findByText(/Test Prompt/g)).toBeInTheDocument();
  expect(await screen.findByText(/lorem testum 1/g)).toBeInTheDocument();
});

test("deletes the question when the delete button is clicked", async () => {
  const { rerender } = render(<App />);

  fireEvent.click(screen.queryByText(/View Questions/));

  await screen.findByText(/lorem testum 1/g);

  fireEvent.click(screen.queryAllByText("Delete Question")[0]);

  await waitForElementToBeRemoved(() => screen.queryByText(/lorem testum 1/g));

  rerender(<App />);

  await screen.findByText(/lorem testum 2/g);

  expect(screen.queryByText(/lorem testum 1/g)).not.toBeInTheDocument();
});

test("updates the answer when the dropdown is changed", async () => {
  const { rerender } = render(<App />);

  fireEvent.click(screen.queryByText(/View Questions/));

  await screen.findByText(/lorem testum 2/g);

  fireEvent.change(screen.queryAllByLabelText(/Correct Answer/)[0], {
    target: { value: "3" },
  });

  expect(screen.queryAllByLabelText(/Correct Answer/)[0].value).toBe("3");

  rerender(<App />);

  expect(screen.queryAllByLabelText(/Correct Answer/)[0].value).toBe("3");
});

*/



import React from "react";
import "whatwg-fetch";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { server } from "../mocks/server";
import App from "../components/App";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("displays question prompts after fetching", async () => {
  render(<App />);

  fireEvent.click(screen.getByText(/View Questions/i));

  expect(await screen.findByText(/lorem testum 1/i)).toBeInTheDocument();
  expect(await screen.findByText(/lorem testum 2/i)).toBeInTheDocument();
});

test("creates a new question when the form is submitted", async () => {
  render(<App />);

  // Wait for initial questions to load
  await screen.findByText(/lorem testum 1/i);

  // Switch to form view
  fireEvent.click(screen.getByText(/New Question/i));

  // Fill out form
  fireEvent.change(screen.getByLabelText(/Prompt/i), {
    target: { value: "Test Prompt" },
  });
  fireEvent.change(screen.getByLabelText(/Answer 1/i), {
    target: { value: "Test Answer 1" },
  });
  fireEvent.change(screen.getByLabelText(/Answer 2/i), {
    target: { value: "Test Answer 2" },
  });
  fireEvent.change(screen.getByLabelText(/Correct Answer/i), {
    target: { value: "1" },
  });

  // Submit form
  fireEvent.click(screen.getByRole('button', { name: /Add Question/i }));

  // Verify new question appears
  await waitFor(() => {
    expect(screen.getByText(/Test Prompt/i)).toBeInTheDocument();
  });
});

test("deletes the question when the delete button is clicked", async () => {
  render(<App />);

  // Wait for questions to load
  await screen.findByText(/lorem testum 1/i);
  
  // Click delete button
  const deleteButtons = await screen.findAllByText(/Delete Question/i);
  fireEvent.click(deleteButtons[0]);

  // Verify removal
  await waitFor(() => {
    expect(screen.queryByText(/lorem testum 1/i)).not.toBeInTheDocument();
  });
});

test("updates the answer when the dropdown is changed", async () => {
  render(<App />);

  // Wait for questions to load
  await screen.findByText(/lorem testum 2/i);
  
  // Find and update dropdown
  const dropdowns = await screen.findAllByLabelText(/Correct Answer/i);
  fireEvent.change(dropdowns[0], { target: { value: "3" } });

  // Verify update
  await waitFor(() => {
    expect(dropdowns[0].value).toBe("3");
  });
});