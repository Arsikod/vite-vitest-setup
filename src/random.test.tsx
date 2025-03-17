import { render, screen } from "@testing-library/react";

import { Random } from "./random";

describe("Random", () => {
  test("random", () => {
    render(<Random />);

    screen.debug();

    const element = screen.getByText(/random/i);

    expect(element).toBeInTheDocument();
  });
});
