import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import BlogForm from "./BlogForm";

test("form calls event handler it received as props with the right details", async () => {
  const mockAddBlog = vi.fn();

  const { container } = render(<BlogForm createBlog={mockAddBlog} />);
  const user = userEvent.setup();
  const title = container.querySelector("#title");
  const author = container.querySelector("#author");
  const url = container.querySelector("#url");
  const sendButton = container.querySelector("#send");

  await user.type(title, "test title");
  await user.type(author, "test author");
  await user.type(url, "test url");
  await user.click(sendButton);
  console.log(mockAddBlog.mock.calls);

  expect(mockAddBlog.mock.calls[0][0].title).toBe("test title");
  expect(mockAddBlog.mock.calls[0][0].author).toBe("test author");
  expect(mockAddBlog.mock.calls[0][0].url).toBe("test url");
});
