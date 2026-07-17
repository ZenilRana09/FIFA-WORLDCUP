import { render, screen } from "@testing-library/react";
import StatCard from "../components/dashboard/StatCard";
import { describe, it, expect } from "vitest";

describe("StatCard", () => {
  it("renders correctly", () => {
    render(
      <StatCard
        title="Incidents"
        value="12"
        icon="🚨"
      />
    );

    expect(screen.getByText("Incidents")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("LIVE")).toBeInTheDocument();
  });
});