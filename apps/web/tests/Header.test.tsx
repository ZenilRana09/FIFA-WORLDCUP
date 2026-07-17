import { render, screen } from "@testing-library/react";
import Header from "../components/dashboard/Header";
import { describe, it, expect } from "vitest";

describe("Header", () => {
  it("renders correctly", () => {
    render(<Header />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByText(/FIFA SmartStadium AI/i)).toBeInTheDocument();
    expect(screen.getByText(/All Systems Operational/i)).toBeInTheDocument();
  });
});