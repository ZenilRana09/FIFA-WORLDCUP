import { render, screen } from "@testing-library/react";
import IncidentCard from "../components/dashboard/IncidentCard";
import { describe, it, expect } from "vitest";

describe("IncidentCard", () => {
  it("renders correctly", () => {
    render(
      <IncidentCard
        incident={{
          id: "1",
          title: "Crowd Surge",
          description: "Large crowd detected",
          location: "Gate B",
          severity: "HIGH",
          status: "OPEN",
          crowdDensity: 82,
          aiRisk: "HIGH",
          aiPriority: 1,
          aiSummary: "Potential congestion.",
          aiResolution: "5 min",
          createdAt: new Date().toISOString(),
        } as any}
      />
    );

    expect(screen.getByText("Crowd Surge")).toBeInTheDocument();
    expect(screen.getByText("Gate B")).toBeInTheDocument();
    expect(screen.getByText("Potential congestion.")).toBeInTheDocument();
  });
});