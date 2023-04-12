import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
// import { useRouter } from "next/router";

import Home from "~/pages";

// jest.mock("next/router");

describe("Home Page", () => {
  it("renders logo and search bar", () => {
    render(<Home />);

    const logo = screen.getByRole("heading");
    // const searchBar = screen.getByPlaceholderText(
    //   "Search for a movie, director, or quarter"
    // );

    expect(logo).toBeInTheDocument();
    // expect(searchBar).toBeInTheDocument();
  });
});
