import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "~/pages";

jest.mock("next/router", () => require("next-router-mock"));

describe("Home Page", () => {
  it("renders logo and search bar", () => {
    render(<Home />);

    const logo = screen.getByRole("heading");
    const searchBar = screen.getByPlaceholderText(
      "Search for movies, directors, or quarters..."
    );

    expect(logo).toBeInTheDocument();
    expect(searchBar).toBeInTheDocument();
  });
});
