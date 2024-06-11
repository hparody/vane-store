import App from "./App";
import { render, screen } from "@testing-library/react";

describe("App", () => {
  it("should render main app", () => {
    render(<App />);
    expect(screen.getByTestId("MAIN-APP")).toBeInTheDocument();
  });
});
